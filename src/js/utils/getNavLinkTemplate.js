export default function getNavLinkTemplate(key) {
  const formattedKey = key.replace('-', ' ').toUpperCase();
  return `
    <li class="navigation__item">
      <a class="navigation__link" data-name=${key} href="#${key}">${formattedKey}</a>
    </li>`;
}
