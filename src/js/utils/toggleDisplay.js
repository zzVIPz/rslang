export default function toggleDisplay(className, addClass = 'hidden') {
  const nodes = document.querySelectorAll(className);
  if (nodes.length) {
    nodes.forEach((node) => node.classList.toggle(addClass));
  }
}
