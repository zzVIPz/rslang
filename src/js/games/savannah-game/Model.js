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

  /* async fetchData(difficultyLevel, round) {
    this.mockDataJSON = await fetch(`${this.wordsUrl}group=${difficultyLevel}&page=${round}`);
    this.mockData = await this.mockDataJSON.json();
    this.getWordsAndTranslation(this.mockData);

    return { words: this.wordsArr, translation: this.translation };
  } */
  async fetchWords(chosenLevel, chosenRound) {
    this.currentUser = await this.mainModel.getUser();
    if (chosenLevel) {
      this.currentUser.currentGroup = chosenLevel;
      this.currentUser.currentPage = chosenRound;
    }

    if (chosenRound) {
      this.currentUser.currentPage = chosenRound;
    }

    console.log('My user:', this.currentUser);
    const data = await this.mainModel.getWords(this.currentUser);
    return data;
  }

  getWordsAndTranslation(data) {
    this.wordsArr = data.map((el) => el.word);
    this.translation = data.map((el) => el.wordTranslate);
  }

  randomArrAndShuffle(n) {
    this.arr = [...Array(n).keys()];

    return shuffleArray(this.arr);
  }

  generateRandomWord(arr) {
    this.randomArr = this.randomArrAndShuffle(arr.length);
    console.log('Random numbers Arr:', this.randomArr);
    this.randomWord = arr[this.randomArr[this.count]];

    return this.randomWord;
  }

  generateTranslation(arr) {
    console.log('Translation arr', arr);
    this.correctAnswer = arr[this.randomArr[this.count]];
    console.log('correct', this.correctAnswer);
    this.answersArr = [this.correctAnswer];
    const newArr = [...arr];
    const index = newArr.indexOf(this.correctAnswer);

    if (index > -1) {
      newArr.splice(index, 1);
    }

    const shortArr = this.randomArrAndShuffle(newArr.length).slice(0, 3);
    shortArr.forEach((element) => {
      this.answersArr.push(newArr[element]);
    });
    this.answersArr = shuffleArray(this.answersArr);
    this.count += 1;
    console.log('Answers:', this.answersArr);

    return this.answersArr;
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
