const MENU_ITEMS_NAMES = {
  mainPage: 'main-page',
  dictionary: 'dictionary',
  statistics: 'statistics',
  speakit: 'speakit',
  englishPuzzle: 'english-puzzle',
  audiocall: 'audiocall',
  savannah: 'savannah',
  sprint: 'sprint',
  newGame: 'new-game',
  promoPage: 'promo-page',
  aboutTeam: 'about-team',
  logOut: 'log-out',
};

const DEFAULT_USER_SETTINGS = {
  cardsTotal: 10,
  cardsNew: 5,
  currentGroup: 0,
  currentPage: 0,
  studyMode: 'MIXED',
  learningWordsMode: 'MIXED',
  transcription: true,
  associativePicture: true,
  wordPronunciation: true,
  meaningPronunciation: true,
  examplePronunciation: true,
  btnKnow: true,
  btnDifficult: true,
};

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

export { MENU_ITEMS_NAMES, SETTING_MODAL_TEXT, MAIN_TEXT, SWIPER_TEMPLATE, DEFAULT_USER_SETTINGS };
