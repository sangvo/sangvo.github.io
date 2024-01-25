---
title: Simple smooth scrolling with CSS
date: "2023-12-18T04:25:25.251Z"
tags:
  - javascript
  - css
---

```css
html {
  scroll-behavior: smooth;
  scroll-padding: var(--scroll-padding, 5rem);
}
```

Using JS to set `scroll-padding`

```js
const navigation = document.querySelector(".primary-navigation");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

```

Codepen: https://codepen.io/kevinpowell/pen/eYjRVmw
