<<<<<<< HEAD
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
=======
const MENU_ITEMS_NAMES = [
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
];

const SETTING_MODAL_TEXT = {
  title: 'Welcome,',
  subtitle: 'Here you can set up your study profile',
  totalCards: 'Choose the total number of cards per day (5 - 100):',
  cardsPerDay: 'Choose the number of new words per day (5 - the total number of cards per day):',
  studyMode: 'Which study mode do you prefer?',
  studySelect: {
    newWords: 'NEW WORDS',
    repeat: 'REPEAT',
    mixed: 'MIXED',
  },
  textMode: 'How do you prefer to learn words?',
  textSelect: {
    word: 'WORD',
    textMeaning: 'TEXT MEANING',
    textExample: 'TEXT EXAMPLE',
    mixed: 'MIXED',
  },
  transcription: 'Show word transcription',
  associativePicture: 'Show associative picture',
  btnKnow: "Show button 'I know'",
  btnDifficult: "Show button 'Difficult'",
  wordPronunciation: 'Pronunciation of the studied word',
  meaningPronunciation: 'Pronunciation of the meaning text',
  examplePronunciation: 'Pronunciation of the example text',
  btnAccept: 'ACCEPT',
  btnCancel: 'CANCEL',
};

const MAIN_TEXT = {
  title: 'Dear,',
  subtitle: 'Your goals for today:',
  totalCards: 'Total cards:',
  newWords: 'Total cards:',
  studyMode: 'Study mode:',
  achievements: 'Your achievements:',
  learnedWords: 'Learned words:',
  repeatWord: 'Words to repeat:',
  btnStart: 'CONTINUE',
  btnShowGraph: 'SHOW GRAPH',
};

const SWIPER_TEMPLATE = `
  <div class="swiper-container">
    <div class="swiper-wrapper"></div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>`;

const DEFAULT_USER = {
  username: null,
  cardsTotal: 10,
  cardsNew: 5,
  currentGroup: 0,
  currentPage: 0,
  studyMode: 'mixed',
  learningWordsMode: 'mixed',
  transcription: true,
  associativePicture: true,
  wordPronunciation: true,
  meaningPronunciation: true,
  examplePronunciation: true,
  btnKnow: true,
  btnDifficult: true,
>>>>>>> 0332ece7c5527498565b6dcbc4b711ae332de021
};

export { MENU_ITEMS_NAMES, SETTING_MODAL_TEXT, MAIN_TEXT, SWIPER_TEMPLATE, DEFAULT_USER };
