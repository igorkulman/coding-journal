(() => {
  "use strict";

  const container = document.querySelector("[data-webmentions]");
  if (!container) {
    return;
  }

  const groupsContainer = container.querySelector(".webmention-groups");
  const target = container.dataset.target;
  const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);
  const apiEndpoint = localHosts.has(window.location.hostname)
    ? "https://webmention.io/api/mentions.jf2"
    : container.dataset.api;

  if (!groupsContainer || !target || !apiEndpoint) {
    return;
  }

  const groupDefinitions = [
    {
      property: "like-of",
      icon: "♥",
      singular: "like",
      plural: "likes",
      action: "liked this post",
    },
    {
      property: "repost-of",
      icon: "↻",
      singular: "repost",
      plural: "reposts",
      action: "reposted this post",
    },
    {
      property: "in-reply-to",
      icon: "↩︎",
      singular: "reply",
      plural: "replies",
      action: "replied to this post",
    },
    {
      property: "mention-of",
      icon: "↗",
      singular: "mention",
      plural: "mentions",
      action: "mentioned this post",
    },
  ];

  function safeHttpUrl(value) {
    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:"
        ? url.href
        : null;
    } catch {
      return null;
    }
  }

  function createInitial(name) {
    const initial = document.createElement("span");
    initial.className = "webmention-initial";
    initial.setAttribute("aria-hidden", "true");
    initial.textContent = name.trim().charAt(0).toLocaleUpperCase() || "?";
    return initial;
  }

  function createAvatar(mention, definition) {
    const author = mention.author || {};
    const name = author.name?.trim() || "Someone";
    const interactionUrl = ["in-reply-to", "mention-of"].includes(
      definition.property,
    )
      ? safeHttpUrl(mention.url) ||
        safeHttpUrl(mention["wm-source"]) ||
        safeHttpUrl(author.url)
      : safeHttpUrl(author.url) ||
        safeHttpUrl(mention.url) ||
        safeHttpUrl(mention["wm-source"]);
    const photoUrl = safeHttpUrl(author.photo);

    const item = document.createElement("li");
    const avatar = interactionUrl
      ? document.createElement("a")
      : document.createElement("span");
    avatar.className = "webmention-avatar";
    avatar.setAttribute("aria-label", `${name} ${definition.action}`);
    avatar.title = `${name} ${definition.action}`;

    if (interactionUrl) {
      avatar.href = interactionUrl;
      avatar.target = "_blank";
      avatar.rel = "nofollow ugc noopener";
    }

    if (photoUrl) {
      const image = document.createElement("img");
      image.src = photoUrl;
      image.alt = "";
      image.width = 36;
      image.height = 36;
      image.loading = "lazy";
      image.decoding = "async";
      image.referrerPolicy = "no-referrer";
      image.addEventListener(
        "error",
        () => image.replaceWith(createInitial(name)),
        { once: true },
      );
      avatar.append(image);
    } else {
      avatar.append(createInitial(name));
    }

    item.append(avatar);
    return item;
  }

  function createGroup(definition, mentions) {
    const group = document.createElement("div");
    group.className = "webmention-group";

    const summary = document.createElement("div");
    summary.className = "webmention-summary";

    const icon = document.createElement("span");
    icon.className = "webmention-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = definition.icon;

    const label = document.createElement("span");
    const noun = mentions.length === 1 ? definition.singular : definition.plural;
    label.textContent = `${mentions.length} ${noun}`;

    summary.append(icon, label);

    const avatars = document.createElement("ul");
    avatars.className = "webmention-avatars";
    avatars.setAttribute(
      "aria-label",
      mentions
        .map((mention) => mention.author?.name?.trim() || "Someone")
        .join(", "),
    );

    for (const mention of mentions) {
      avatars.append(createAvatar(mention, definition));
    }

    group.append(summary, avatars);
    return group;
  }

  function uniquePublicMentions(mentions) {
    const seen = new Set();

    return mentions.filter((mention) => {
      if (!mention || mention["wm-private"] === true) {
        return false;
      }

      const key =
        mention["wm-id"] ||
        mention["wm-source"] ||
        `${mention["wm-property"] || "unknown"}:${mention.url || ""}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  async function loadWebmentions() {
    const targets = new Set([target]);
    if (target.endsWith("/")) {
      targets.add(target.slice(0, -1));
    } else {
      targets.add(`${target}/`);
    }

    const parameters = new URLSearchParams();
    for (const targetUrl of targets) {
      parameters.append("target[]", targetUrl);
    }
    parameters.set("per-page", "100");
    parameters.set("sort-by", "created");

    const response = await fetch(`${apiEndpoint}?${parameters}`, {
      headers: { Accept: "application/json" },
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      throw new Error(`Webmention request failed with HTTP ${response.status}`);
    }

    const payload = await response.json();
    const mentions = uniquePublicMentions(payload.children || []);
    let renderedGroups = 0;

    for (const definition of groupDefinitions) {
      const matchingMentions = mentions.filter(
        (mention) => mention["wm-property"] === definition.property,
      );
      if (matchingMentions.length === 0) {
        continue;
      }

      groupsContainer.append(createGroup(definition, matchingMentions));
      renderedGroups += 1;
    }

    if (renderedGroups > 0) {
      container.hidden = false;
    }
  }

  loadWebmentions().catch((error) => {
    console.warn("Unable to load Webmentions", error);
  });
})();
