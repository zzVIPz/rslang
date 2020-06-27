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

const HASH_VALUES = {
  training: 'training',
};

const DEFAULT_USER_SETTINGS = {
  cardsTotal: 10,
  cardsNew: 5,
  currentGroup: 0,
  currentPage: 0,
  studyMode: 'MIXED',
  learningWordsMode: 'MIXED',
  translate: true,
  transcription: true,
  associativePicture: true,
  wordPronunciation: true,
  textPronunciation: true,
  automaticallyScroll: false,
  btnKnow: true,
  btnDifficult: true,
  btnShowAnswer: true,
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
  translate: 'Show translate',
  associativePicture: 'Show associative picture',
  btnKnow: "Show button 'I know'",
  btnDifficult: "Show button 'Difficult word'",
  btnShowAnswer: "Show button 'Show answer'",
  wordPronunciation: 'Pronounce study word',
  textPronunciation: 'Pronounce study text',
  automaticallyScroll: 'Automatic slide scrolling',
  btnAccept: 'ACCEPT',
  btnCancel: 'CANCEL',
};

const WORD_LEARNING_MODES = [
  SETTING_MODAL_TEXT.textSelect.word,
  SETTING_MODAL_TEXT.textSelect.textMeaning,
  SETTING_MODAL_TEXT.textSelect.textExample,
];

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

const DELAY_NEXT_SLIDE_AUDIO_OFF = 1000;

const DELAY_NEXT_SLIDE_AUDIO_ON = 700;

const WORDS_STATUS = {
  dictionary: 'dictionary',
};

export {
  MENU_ITEMS_NAMES,
  HASH_VALUES,
  SETTING_MODAL_TEXT,
  MAIN_TEXT,
  SWIPER_TEMPLATE,
  DEFAULT_USER_SETTINGS,
  WORD_LEARNING_MODES,
  DELAY_NEXT_SLIDE_AUDIO_OFF,
  DELAY_NEXT_SLIDE_AUDIO_ON,
  WORDS_STATUS,
};
