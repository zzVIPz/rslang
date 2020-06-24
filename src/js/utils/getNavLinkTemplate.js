import { MENU_ITEMS_NAMES } from '../constants/constMainView';

export default function getNavLinkTemplate(key) {
  let tmpKey = `#${key}`;
  const formattedKey = key.replace('-', ' ');
  if (
    key === MENU_ITEMS_NAMES.promoPage
    || key === MENU_ITEMS_NAMES.aboutTeam
    || key === MENU_ITEMS_NAMES.mainPage
  ) {
    tmpKey = '';
  }
  return `
    <li class="navigation__item">
      <a class="navigation__link" data-name=${key} href="${tmpKey}">${formattedKey.toUpperCase()}</a>
    </li>`;
}
