---
title: Simple smooth scrolling with CSS
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
