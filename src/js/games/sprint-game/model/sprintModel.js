import MainModel from '../../../models/mainModel';

export default class SprintModel {
  constructor() {
    this.mainModel = new MainModel();
  }

  async getWordsArray(level, round) {
    this.wordsArray = await this.mainModel.getWords(level, round);
    console.log(this.wordsArray);
    return this.makeWorkingArr(this.wordsArray);
  }

  async getCurrenttUser() {
    this.userId = this.mainModel.userId;
    this.token = this.mainModel.token;
    this.currentUser = await this.mainModel.getUser(this.userId, this.token);
    return this.currentUser;
  }

  makeWorkingArr(arr) {
    return this.shuffle(this.getRightPairs(arr).concat(this.getWrongPairs(arr)));
  }

  getRightPairs(arr) {
    this.newArr = [];
    arr.forEach((el) => {
      const { word, wordTranslate, id } = el;
      const accuracy = 1;
      this.newArr.push({
        accuracy, word, wordTranslate, id,
      });
    });
    return this.newArr;
  }

  getWrongPairs(arr) {
    this.newArr = [];
    arr.forEach((el, index, array) => {
      const { word, id } = el;
      const accuracy = 0;
      this.randIndex = this.getRandomIndex(0, array.length - 1);
      if (this.randIndex !== index) {
        const falseTranslate = array[this.randIndex].wordTranslate;
        const wordTranslate = falseTranslate;
        this.newArr.push({
          accuracy, word, wordTranslate, id,
        });
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
