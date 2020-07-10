export default function addStyle(el, style, newStyle) {
  if (el.classList.contains(style)) {
    el.classList.add(newStyle);
  }
}
