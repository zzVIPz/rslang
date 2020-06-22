export default class User {
  constructor(name, id, token, settings) {
    this.username = name;
    this.userId = id;
    this.userId = token;
    this.cardsTotal = settings.cardsTotal;
    this.cardsNew = settings.cardsNew;
    this.currentGroup = settings.currentGroup;
    this.currentPage = settings.currentPage;
    this.studyMode = settings.studyMode;
    this.learningWordsMode = settings.learningWordsMode;
    this.transcription = settings.transcription;
    this.associativePicture = settings.associativePicture;
    this.wordPronunciation = settings.wordPronunciation;
    this.meaningPronunciation = settings.meaningPronunciation;
    this.examplePronunciation = settings.examplePronunciation;
    this.btnKnow = settings.btnKnow;
    this.btnDifficult = settings.btnDifficult;
  }
}
