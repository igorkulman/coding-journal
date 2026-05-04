+++
title = "Running a Local LLM Coding Server on MacBook Pro M5 Pro 48 GB"
description = "An honest account of running a local coding AI on Apple Silicon — what crashed, what worked, and why I settled on Ollama with Qwen 3.6 MoE."
author = "Igor Kulman"
date = "2026-05-06T07:00:00+01:00"
tags = ["MacBook", "Apple Silicon", "Ollama", "LLM", "Local AI"]
url = "/running-local-llm-coding-server"
+++

I recently set up a local coding AI on my MacBook Pro M5 Pro with 48 GB of unified memory — no cloud, no external API, nothing leaving the machine unless I explicitly route it there. Here is an honest account of what I tried, what crashed, and what finally worked.

## The goal

I wanted to run a capable coding model locally — no cloud, no API costs, no code leaving my network. The M5 Pro with 48 GB seemed powerful enough. Exposing an OpenAI-compatible API endpoint lets me connect to it from anywhere I choose using [OpenCode](https://opencode.ai).

## Picking a model

After some research, **Qwen 3.6 27B** stood out as the best local coding model for the 48 GB tier in May 2026. It scores 77.2% on SWE-bench Verified — a benchmark that measures real bug fixing in existing repositories — which puts it in the same league as cloud frontier models from a year ago. For a model that runs entirely on your own hardware, that is remarkable.

The MoE (Mixture of Experts) variants — Qwen 3.6 35B-A3B — are also worth considering. Despite having 35B total parameters, they activate only about 3B per token, which means lower GPU memory pressure and faster generation than the 27B dense model.

## First attempt: mlx-lm server

The obvious starting point for Apple Silicon is [mlx-lm](https://github.com/ml-explore/mlx-lm), Apple's MLX-based inference library. MLX is 20–30% faster than llama.cpp on Apple Silicon and uses less memory than GGUF at equivalent quantization.

I installed the Unsloth distribution (which provides optimized dynamic quantization) and started the server:

```bash
mlx_lm.server \
  --model unsloth/Qwen3.6-27B-UD-MLX-4bit \
  --port 8080 \
  --host 0.0.0.0
```

It loaded fine, served a few responses — and then crashed:

```
libc++abi: terminating due to uncaught exception of type std::runtime_error:
[METAL] Command buffer execution failed: Insufficient Memory
(00000008:kIOGPUCommandBufferCallbackErrorOutOfMemory)
```

### Why mlx-lm server crashes

This is a known unfixed issue in `mlx_lm.server`. The KV cache grows unboundedly as the conversation gets longer. Metal GPU wires the memory (locks it in RAM), so macOS's Jetsam OOM killer cannot reclaim it. The system does not even detect memory pressure — it just crashes. The `--max-kv-size` flag exists for `mlx_lm.generate` but is not available in `mlx_lm.server` as of version 0.31.3.

I tried `--prompt-cache-size 0` and `--prompt-cache-bytes 0` to disable the prompt cache. It helped slightly but the server still crashed after a few exchanges.

I also tried the MoE variant (`mlx-community/Qwen3-30B-A3B-8bit`) hoping the lower per-token memory footprint would help. Same crash, just slightly later.

**mlx-lm server is not production-ready for long conversations as of May 2026.** It is fine for single-shot generation (`mlx_lm.generate`) but the server component has a fundamental memory management problem.

## Second attempt: Ollama

[Ollama](https://ollama.com) solves the crash problem by enforcing a fixed context size at startup. The KV cache stays within that bound. No unbounded growth, no crash.

```bash
brew install ollama
OLLAMA_HOST=0.0.0.0 OLLAMA_KEEP_ALIVE=24h ollama serve
```

`OLLAMA_HOST=0.0.0.0` makes it accept connections from the local network. `OLLAMA_KEEP_ALIVE=24h` keeps the model loaded between requests — without this, Ollama unloads the model after 5 minutes of inactivity and the next request waits ~2 minutes for it to reload.

I pulled the model and checked what was running:

```bash
ollama pull qwen3.6:27b
ollama ps
```

```
NAME           ID              SIZE     PROCESSOR    CONTEXT
qwen3.6:27b    a50eda8ed977    24 GB    100% GPU     32768
```

100% GPU, stable. No crashes. But the responses felt surprisingly weak.

### The GGUF problem

Running `ollama show qwen3.6:27b` revealed the issue:

```
quantization    Q4_K_M
presence_penalty    1.5
```

Ollama had pulled a GGUF Q4_K_M variant, not an MLX-optimized one. And `presence_penalty 1.5` is aggressively high — it penalizes the model for repeating tokens even when repetition is correct (variable names, keywords), which visibly degrades code quality.

## What actually works: qwen3.6:35b-a3b-mxfp8

The fix was pulling a model specifically optimized for Apple Silicon:

```bash
ollama pull qwen3.6:35b-a3b-mxfp8
```

The `mxfp8` quantization (8-bit floating point, Metal-optimized) is significantly higher quality than generic Q4_K_M. The MoE architecture means only ~3B parameters are active per token despite the 35B total size.

```
NAME                     SIZE     PROCESSOR    CONTEXT
qwen3.6:35b-a3b-mxfp8    37 GB    100% GPU     32768
```

37 GB out of 48 GB, 100% GPU, stable. The coding quality improvement over the generic GGUF was immediately noticeable.

I then created a Modelfile to fix the context and remove the aggressive presence penalty:

```bash
cat > Modelfile << 'EOF'
FROM qwen3.6:35b-a3b-mxfp8
PARAMETER num_ctx 16384
PARAMETER presence_penalty 0
PARAMETER temperature 0.7
EOF

ollama create qwen3.6-coding -f Modelfile
```

## Connecting via OpenCode

Either locally on the same machine, or remotely over the network — install [OpenCode](https://opencode.ai) and configure it to point at the Ollama endpoint:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (M5 Pro)",
      "options": {
        "baseURL": "http://192.168.1.X:11434/v1"
      },
      "models": {
        "qwen3.6-coding": {
          "name": "Qwen 3.6 35B (local)"
        }
      }
    }
  }
}
```

Replace `192.168.1.X` with your server's local IP (`ipconfig getifaddr en0`).

If you prefer an SSH tunnel instead of opening the port on your local network:

```bash
ssh -L 11434:localhost:11434 user@your-m5-pro
```

Then use `http://127.0.0.1:11434/v1` as the baseURL.

## What did not work and why

| Approach | Problem |
|---|---|
| mlx-lm server + 27B 8-bit | Metal OOM after a few messages — unbounded KV cache growth |
| mlx-lm server + MoE 8-bit | Same crash, slightly later |
| mlx-lm server + 4-bit | Still crashes — the bug is in the server, not the model size |
| Ollama + qwen3.6:27b generic | Works but GGUF Q4_K_M quality + broken presence_penalty |
| DeepSeek V4 Flash locally | Requires 96 GB+ — not possible on 48 GB |
| Kimi K2.6 locally | Requires 350 GB+ — not possible on any consumer Mac |

## Final setup

- **Server:** MacBook Pro M5 Pro, 48 GB unified memory
- **Runtime:** Ollama with `OLLAMA_HOST=0.0.0.0 OLLAMA_KEEP_ALIVE=24h`
- **Model:** `qwen3.6:35b-a3b-mxfp8` with custom Modelfile (no presence penalty, 16K context)
- **Client:** Second MacBook running OpenCode pointed at the server IP
- **Memory used:** 37 GB of 48 GB, 100% GPU, no crashes

The whole journey took longer than expected mostly because mlx-lm looked like the obvious choice and turned out to be broken for server use. Ollama is less exotic but significantly more reliable. For a coding assistant you actually want to use all day, reliability matters more than theoretical peak performance.
