const CONST_MAIN_VIEW = {
  menuItems: [
    'main-page',
    'dictionary',
    'statistics',
    'games-1',
    'games-2',
    'games-3',
    'games-4',
    'promo-page',
    'about-team',
    'log-out',
  ],
  getModalTemplate: (key) => `
  <li class="navigation__item">
    <a class="navigation__link" data-name=${key} href="#${key}">${key
  .replace('-', ' ')
  .toUpperCase()}</a>
  </li>`,
};

export default CONST_MAIN_VIEW;
