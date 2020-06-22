export default function getNavLinkTemplate(key) {
  const formattedKey = key.replace('-', ' ');
  return `
    <li class="navigation__item">
      <a class="navigation__link" data-name=${key} href="#${key}">${formattedKey.toUpperCase()}</a>
    </li>`;
}
