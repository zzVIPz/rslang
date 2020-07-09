export default function removeStyle(el, style) {
  if (el.classList.contains(style)) {
    el.classList.remove(style);
  }
}
