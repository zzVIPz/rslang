import shuffleArray from './savannah-utils/shaffle';
import MainModel from '../../models/mainModel';

class SavannahModel {
  constructor() {
    this.difficultyLevel = {
      level: 0,
    };
    this.wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.count = 0;
    this.removeDigitsRegExp = /\d/g;
    this.rightAnswer = 0;
    this.wrongAnswer = 0;
    this.mainModel = new MainModel();
  }

  async getCurrUser() {
    this.currentUser = await this.mainModel.getUser();
  }

  async fetchWords(chosenLevel, chosenRound) {
    this.totalCards = this.currentUser.cardsTotal;
    this.moveBackgroundPercentage = 100 / this.totalCards;
    if (chosenLevel) {
      this.currentUser.currentGroup = chosenLevel;
      this.currentUser.currentPage = chosenRound;
    }

    if (chosenRound) {
      this.currentUser.currentPage = chosenRound;
    }

    const data = await this.mainModel.getWords(this.currentUser);
    return data;
  }

  getWordsAndTranslation(data) {
    this.wordsArr = data.map((el) => el.word);
    this.translation = data.map((el) => el.wordTranslate);
    this.randomArrOfIndexes = this.randomArrAndShuffle(this.wordsArr.length);
    this.isGameOn = true;
  }

  // todo utils
  randomArrAndShuffle(n) {
    this.arr = [...Array(n).keys()];

    return shuffleArray(this.arr);
  }

  generateTranslation() {
    console.log('Translation arr', this.translation);
    this.correctAnswer = this.translation[this.randomArrOfIndexes[this.count]];
    console.log('Correct Answer', this.correctAnswer);
    this.answersArr = [this.correctAnswer];
    const newArr = [...this.translation];

    newArr.splice(this.randomArrOfIndexes[this.count], 1);

    const shortArr = this.randomArrAndShuffle(newArr.length).slice(0, 3);
    shortArr.forEach((element) => {
      this.answersArr.push(newArr[element]);
    });
    this.answersArr = shuffleArray(this.answersArr);
    this.count += 1;
    console.log('4 Answers:', this.answersArr);

    return this.answersArr;
  }

  findCorrectAnswerId() {
    return this.answersArr.indexOf(this.correctAnswer) + 1;
  }

  isRightTranslation(chosenTranslation) {
    const chosenTranslationText = chosenTranslation.replace(this.removeDigitsRegExp, '');

    if (chosenTranslationText === this.correctAnswer) {
      this.rightAnswer += 1;

      return true;
    }
    this.wrongAnswer += 1;

    return false;
  }
}

export default SavannahModel;
