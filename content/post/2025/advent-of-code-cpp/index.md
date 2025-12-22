+++
Categories = ["Programming"]
Tags = ["Programming", "C++", "Advent of Code", "Tooling"]
Keywords = ["Advent of Code", "C++23", "Zed editor", "Modern C++"]
author = "Igor Kulman"
date = "2025-12-23T09:00:00+01:00"
title = "Advent of Code 2025: Modern C++ and Zed"
url = "advent-of-code-cpp"
+++

At a client I currently work for, we started a small **code club** a few months ago. The idea was simple: regularly try something outside our day-to-day stack.

I began doing the challenges with **Erlang**, then moved to **Elixir**. For December, instead of making up a new monthly challenge, we decided to just do **Advent of Code**. It fits well: small problems, no long-term commitment, and plenty of room to experiment.

This post is a short reflection on my setup and choices this year: **C++ (C++23)** and **Zed**.

## Why C++

I initially thought about using Elixir, since I had already been working with it in the code club. But in the end I decided to go with **C++**.

The main reason was curiosity.

The last time I used C++ seriously was at university. My final memory of it is writing a simple 2D game in my last bachelor year, around **2008**. Since then, C++ has been completely absent from my professional life.

Advent of Code felt like a good opportunity to see how C++ has evolved since then—without any pressure to build something “real”.

## Modern C++ feels very different

What surprised me most is how **comfortable** modern C++ is.

The standard library has grown significantly, and many things that used to require custom helpers are now readily available. String handling and container manipulation in particular felt much nicer than I remembered.

Reading a grid from input, which is a very common Advent of Code pattern, looks like this:

```cpp
std::vector<std::vector<char>> grid;
std::string line;

while (std::getline(file, line)) {
    grid.emplace_back(line.begin(), line.end());
}
```

This is straightforward, readable, and does exactly what it needs to do.

Lambdas and structured bindings also make everyday code much clearer. For example, sorting ranges stored as tuples:

```cpp
std::vector<std::tuple<long, long>> ranges;

std::sort(ranges.begin(), ranges.end(), [](const auto& a, const auto& b) {
    const auto& [a_start, a_end] = a;
    const auto& [b_start, b_end] = b;
    return a_start < b_start;
});
```

Compared to the C++ I remember from university, this feels like a different language.
`auto` alone removes a huge amount of visual noise, and in combination with better STL APIs, the code feels far more expressive.

## Why Zed

I also wanted to try **Zed** as my editor.

I like the idea of a fast, native editor that is not built on top of a browser runtime. Conceptually, Zed makes a lot of sense to me, and Advent of Code felt like a good place to try it for actual problem-solving, not just casual editing.

## Zed + C++: still rough around the edges

In practice, this part was more frustrating than I expected.

It might be a skill issue, but setting up a comfortable C++ workflow in Zed was **noticeably harder** than in VSCode. With VSCode, C++ support is almost trivial to get right. With Zed, I spent more time fighting tooling than I wanted to.

A few things that kept bothering me:

- C++ setup felt fragile and under-documented
- LSP integration was not as smooth as expected
- The built-in terminal had **weird scrolling behavior**, which became annoying during repeated runs

None of these are fatal problems, but together they break the flow. For Advent of Code, where fast iteration matters, that friction adds up.

I still like Zed’s direction, but it is **not there yet for me**.

## Takeaways

- Advent of Code works very well as a **code club activity**.
- **Modern C++ is in a much better place** than I remembered from 2008.
- The standard library and language features like lambdas, structured bindings, and `auto` make a big difference.
- **Zed is promising**, but today VS Code still wins due to tooling maturity.

Overall, Advent of Code turned out to be a nice excuse to revisit C++ and confirm that it has evolved into a language that is surprisingly pleasant to use in 2025.

You can find [my Advent of Code solutions on GitHub](https://github.com/igorkulman/AdventOfCode). I did not get through all days, but the repository reflects the approach and experiments described in this post.