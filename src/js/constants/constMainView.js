const MENU_ITEMS_NAMES = {
  mainPage: 'main-page',
  dictionary: 'dictionary',
  statistics: 'statistics',
  speakit: 'speakit',
  englishPuzzle: 'english-puzzle',
  audiocall: 'audiocall',
  savannah: 'savannah',
  sprint: 'sprint',
  wordSearch: 'word-search',
  promoPage: 'promo-page',
  aboutTeam: 'about-team',
  logOut: 'log-out',
};

const HASH_VALUES = {
  training: 'training',
  audiocall: 'audiocall',
  speakit: 'speakit',
  dictionary: 'dictionary',
  statistics: 'statistics',
  englishPuzzle: 'english-puzzle',
  savannah: 'savannah',
  sprint: 'sprint',
  wordSearch: 'word-search',
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
  additionalControl: true,
  dictionaryInfo: true,
  dictionaryControl: true,
  wordPronunciation: true,
  textPronunciation: true,
  automaticallyScroll: false,
  btnKnow: true,
  btnDifficult: true,
  btnShowAnswer: true,
};

const DEFAULT_USER_STATISTIC = {
  learnedWords: 0,
  optional: {
    games: {
      speakit: 0,
      englishPuzzle: 0,
      audiocall: 0,
      savannah: 0,
      sprint: 0,
      wordSearch: 0,
    },
  },
};

const SETTING_MODAL_TEXT = {
  title: 'Welcome,',
  subtitle: 'Here you can set up your study profile',
  textBasicSettings: 'Basic settings (available before training mode)',
  textAdditionalSettings: 'Advanced settings (available during training mode)',
  textDictionarySettings: 'Dictionary settings',
  totalCards: 'Choose the total number of cards per day (5 - 100):',
  cardsPerDay: 'Choose the number of new words per day (5 - the total number of cards per day):',
  studyMode: 'Which study mode do you prefer?',
  studySelect: {
    newWords: 'NEW WORDS',
    repeat: 'REPEAT',
    mixed: 'MIXED',
    difficult: 'DIFFICULT',
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
  btnAdditionalControl: 'Show additional control buttons',
  btnDictionaryInfo: 'Show information about words',
  btnDictionaryControl: 'Show dictionary control buttons',
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
  subtitle: 'Your goals for today :',
  totalCards: 'Total cards :',
  newWords: 'Total new words cards :',
  studyMode: 'Study mode :',
  achievements: 'Your achievements :',
  learnedWords: 'Learned words :',
  passedWords: 'Total words passed :',
  btnStart: 'START TRAINING',
  progress: 'Your progress :',
  amountCards: '3600',
};

const AMOUNT_WORDS_PER_PAGE = 19;

const AMOUNT_PAGES_PER_GROUP = 29;

const WORDS_PER_PAGE = 20;

const SWIPER_TEMPLATE = `
  <div class="swiper-container">
    <div class="swiper-wrapper"></div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>`;

const DELAY_NEXT_SLIDE_AUDIO_OFF = 1000;

const DELAY_NEXT_SLIDE_AUDIO_ON = 700;

const DELAY_HIDE_MENU = 170;

const DELAY_SET_FOCUS_ON_INPUT = 300;

const REPEAT_NUMBER = 3;

const WORDS_STATUS = {
  userWord: 'userWord.difficulty',
  easy: 'easy',
  difficult: 'difficult',
  repeat: 'repeat',
};

const WORD_COMPLEXITY = {
  easy: 'EASY',
  normal: 'NORMAL',
  difficult: 'DIFFICULT',
  repeat: 'REPEAT AGAIN',
};

const PAGES_LINKS = {
  promo: './promo.html',
  about: './about.html',
};

const SHORT_STATISTICS_TEXT = {
  targetTitle: 'Congratulations! Your goal has been achieved!',
  additionalTitle: 'Congratulations! You have completed your training!',
  targetPassedCards: 'Total passed cards : ',
  targetPercentage: 'Percentage of correct answers : ',
  targetNewWords: 'Learned new words : ',
  targetSuccessSeries: 'Longest series of correct answers : ',
  targetText:
    'You have {param} word(s) left to repeat. If you want to continue training, click "Continue" or click "Finish" to complete this training',
  btnContinue: 'CONTINUE',
  btnFinish: 'FINISH',
};

const CARD_TEXT = {
  newWord: 'New word',
  repeat: 'Repeat',
  btnBeFamiliar: 'I KNOW',
  btnToStudy: 'DIFFICULT WORD',
  btnShowAnswer: 'SHOW ANSWER',
  btnCheck: 'CHECK',
  btnListen: 'LISTEN PRONUNCIATION',
};

const NOTIFICATION_TEXT = {
  btnAccept: 'OK',
  repeat: 'to repeat',
  difficult: 'from the difficult category',
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
  PAGES_LINKS,
  REPEAT_NUMBER,
  AMOUNT_WORDS_PER_PAGE,
  AMOUNT_PAGES_PER_GROUP,
  WORDS_PER_PAGE,
  DELAY_HIDE_MENU,
  DELAY_SET_FOCUS_ON_INPUT,
  WORD_COMPLEXITY,
  SHORT_STATISTICS_TEXT,
  NOTIFICATION_TEXT,
  CARD_TEXT,
  DEFAULT_USER_STATISTIC,
};
