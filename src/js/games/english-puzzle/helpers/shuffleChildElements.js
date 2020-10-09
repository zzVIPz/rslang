export default function shuffleChildElements(parent) {
  const childs = parent.children;
  const frag = document.createDocumentFragment();
  while (childs.length) {
    frag.appendChild(childs[Math.floor(Math.random() * childs.length)]);
  }
  parent.appendChild(frag);
}
