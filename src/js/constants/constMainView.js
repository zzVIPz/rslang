const CONST_MAIN_VIEW = {
  menuItems: [
    'main-page',
    'dictionary',
    'statistics',
    'speakit',
    'english-puzzle',
    'savannah',
    'audiocall',
    'sprint',
    'new-game',
    'promo-page',
    'about-team',
    'log-out',
  ],
  getModalTemplate: (key) => `
  <li class="navigation__item">
    <a class="navigation__link" data-name=${key} href="#${key}">${key.replace('-', ' ').toUpperCase()}</a>
  </li>`,
};

export default CONST_MAIN_VIEW;
