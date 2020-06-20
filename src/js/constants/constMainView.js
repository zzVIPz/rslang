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
};

const getModalTemplate = (key) => {
  const formattedKey = key.replace('-', ' ').toUpperCase();
  return `
    <li class="navigation__item">
      <a class="navigation__link" data-name=${key} href="#${key}">${formattedKey}</a>
    </li>`;
};

export { CONST_MAIN_VIEW, getModalTemplate };
