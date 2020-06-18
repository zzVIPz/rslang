import shuffleArray from './savannah-utils/shaffle';

class SavannahModel {
  constructor() {
    this.difficultyLevel = {
      level: 0,
    };
    this.wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.count = 0;
  }

  async fetchData(difficultyLevel, round) {
    this.mockDataJSON = await fetch(`${this.wordsUrl}group=${difficultyLevel}&page=${round}`);
    this.mockData = await this.mockDataJSON.json();
    this.getWordsAndTranslation(this.mockData);
    return { words: this.wordsArr, translation: this.translation };
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
    this.randomWord = arr[this.randomArr[this.count]];
    return this.randomWord;
  }

  generateTranslation(arr) {
    this.correctAnswer = arr[this.randomArr[this.count]];
    let translArr = [this.correctAnswer];
    const newArr = arr;
    const index = newArr.indexOf(this.correctAnswer);
    if (index > -1) {
      newArr.splice(index, 1);
    }
    const shortArr = this.randomArrAndShuffle(newArr.length).slice(0, 3);
    shortArr.forEach((element) => {
      translArr.push(newArr[element]);
    });
    translArr = shuffleArray(translArr);
    this.count += 1;
    return translArr;
  }
}

export default SavannahModel;
