export default function addStyle(el, className, newClass) {
  if (el.classList.contains(className)) {
    el.classList.add(newClass);
  }
}
