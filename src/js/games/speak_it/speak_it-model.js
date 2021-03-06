export default class Model {
  constructor() {
    this.arrayNumders = Array.from({ length: 20 }, (v, k) => k);
    this.datasWords = [];
    this.id = [];
    this.datasImages = [];
    this.datasAudios = [];
    this.datasAudioMeaning = [];
    this.datasAudioExample = [];
    this.datasTextMeaning = [];
    this.datasTextExample = [];
    this.datasTranscription = [];
    this.datasTextExampleTranslate = [];
    this.datasTextMeaningTranslate = [];
    this.datasWordTranslate = [];
    this.correct = [];
    this.uncorrect = [];
  }

  extractAllDatas(json) {
    this.shuffle(this.arrayNumders);
    for (let i = 0; i < json.length; i += 1) {
      this.datasWords.push(json[i].word);
      this.datasImages.push(json[i].image);
      this.datasAudios.push(json[i].audio);
      this.datasAudioMeaning.push(json[i].audioMeaning);
      this.datasAudioExample.push(json[i].audioExample);
      this.datasTextMeaning.push(json[i].textMeaning);
      this.datasTextExample.push(json[i].textExample);
      this.datasTranscription.push(json[i].transcription);
      this.datasTextExampleTranslate.push(json[i].textExampleTranslate);
      this.datasTextMeaningTranslate.push(json[i].textMeaningTranslate);
      this.datasWordTranslate.push(json[i].wordTranslate);
      this.id.push(json[i].id);
      this.chooseWord = '';
    }
  }

  reset() {
    this.arrayNumders = Array.from({ length: 20 }, (v, k) => k);
    this.datasWords = [];
    this.id = [];
    this.datasImages = [];
    this.datasAudios = [];
    this.datasAudioMeaning = [];
    this.datasAudioExample = [];
    this.datasTextMeaning = [];
    this.datasTextExample = [];
    this.datasTranscription = [];
    this.datasTextExampleTranslate = [];
    this.datasTextMeaningTranslate = [];
    this.datasWordTranslate = [];
  }

  shuffle = (array) => {
    const array1 = array;
    const array2 = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array2[i];
      array2[i] = array1[j];
      array1[j] = temp;
    }
    return array1;
  }

  checkResult(checkingWord) {
    const arrExample = this.chooseWord.toUpperCase().split('');
    const arrCheck = checkingWord.toUpperCase().split('');
    const wrongLetters = [];
    for (let i = 0; i < arrExample.length; i += 1) {
      if (arrExample[i] !== arrCheck[i]) {
        wrongLetters.push(i);
      }
    }
    return wrongLetters;
  }

  isCardAnswered = (choosenCard, ArrayWithCards) => (ArrayWithCards.indexOf(choosenCard) !== -1)

  setRandomStartPage = (round) => {
    const max = round * 5;
    const min = max + 4;
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
