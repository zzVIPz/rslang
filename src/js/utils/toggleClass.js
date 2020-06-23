export default function toggleClass(className) {
  const nodes = document.querySelectorAll(className);
  if (nodes.length) {
    nodes.forEach((node) => node.classList.toggle('hidden'));
  }
}
