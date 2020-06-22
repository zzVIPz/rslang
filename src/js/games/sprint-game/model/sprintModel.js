import GAME_DATA from './mockData';

export default class SprintModel {
  constructor() {
    this.wordsArray = GAME_DATA;
  }

  makeWorkingArr(arr) {
    return this.shuffle(this.getRightPairs(arr).concat(this.getWrongPairs(arr)));
  }

  getRightPairs(arr) {
    this.newArr = [];
    arr.forEach((el) => {
      const { word, wordTranslate } = el;
      const accuracy = 1;
      this.newArr.push({
        accuracy, word, wordTranslate,
      });
    });
    return this.newArr;
  }

  getWrongPairs(arr) {
    this.newArr = [];
    arr.forEach((el, ind, array) => {
      const { word } = el;
      const accuracy = 0;
      this.randInd = this.getRandomIndex(0, array.length - 1);
      if (this.randInd !== ind) {
        const falseTranslate = array[this.randInd].wordTranslate;
        const wordTranslate = falseTranslate;
        this.newArr.push({ accuracy, word, wordTranslate });
      }
    });
    return this.newArr;
  }

  getRandomIndex(min, max) {
    this.rand = min + Math.random() * (max - min);
    return Math.floor(this.rand);
  }

  shuffle(array) {
    this.array = array;
    for (let i = this.array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }
    return this.array;
  }
}
