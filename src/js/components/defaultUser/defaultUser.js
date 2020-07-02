export default class User {
  constructor(name, id, token, settings) {
    this.username = name;
    this.userId = id;
    this.token = token;
    this.cardsTotal = settings.cardsTotal;
    this.cardsNew = settings.cardsNew;
    this.currentGroup = settings.currentGroup;
    this.currentPage = settings.currentPage;
    this.currentWordNumber = 0;
    this.studyMode = settings.studyMode;
    this.learningWordsMode = settings.learningWordsMode;
    this.transcription = settings.transcription;
    this.translate = settings.translate;
    this.associativePicture = settings.associativePicture;
    this.wordPronunciation = settings.wordPronunciation;
    this.textPronunciation = settings.textPronunciation;
    this.automaticallyScroll = settings.automaticallyScroll;
    this.btnKnow = settings.btnKnow;
    this.btnDifficult = settings.btnDifficult;
    this.btnShowAnswer = settings.btnShowAnswer;
  }
}
