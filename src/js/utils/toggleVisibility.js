export default function toggleVisibility(className, param) {
  if (param) {
    const textContainersNodes = document.querySelectorAll('.card__input-container');
    if (textContainersNodes.length) {
      textContainersNodes.forEach((node) => {
        if (!node.classList.contains('hidden')) {
          const nodesText = node.querySelectorAll(className);
          nodesText.forEach((el) => el.classList.toggle('hidden'));
        }
      });
    }
  } else {
    const nodes = document.querySelectorAll(className);
    if (nodes.length) {
      nodes.forEach((node) => node.classList.toggle('hidden'));
    }
  }
}
