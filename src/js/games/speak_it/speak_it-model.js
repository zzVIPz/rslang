import { QUANTITY_MISS_RIGHT_ANWS } from './speak_it-constants';
import getCorrectUrl from '../../utils/getCorrectUrl';

export class Model {
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
    return this;
  }

  getJson(group, page) {
    return fetch(getCorrectUrl(page, group, false))
      .then((response) => response.json());
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

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkResult(checkingWord) {
    const arrExample = this.chooseWord.toUpperCase().split('');
    const arrCheck = checkingWord.toUpperCase().split('');
    let mis = 0;
    for (let i = 0; i < arrExample.length; i += 1) {
      if (arrExample[i] !== arrCheck[i]) {
        mis += 1;
      }
    }
    if (mis <= QUANTITY_MISS_RIGHT_ANWS) {
      return true;
    }
  }

  setRandomStartPage(round) {
    const max = round * 5;
    const min = max + 4;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getWords = async (currentPage, currentGroup, cardsTotal, wordsPerExample) => {
    const url = getCorrectUrl(currentPage, currentGroup, cardsTotal, wordsPerExample);
    const rawResponse = await fetch(url);
    const content = await rawResponse.json();
    return content;
  };
}
