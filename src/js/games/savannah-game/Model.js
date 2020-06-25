import shuffleArray from './savannah-utils/shaffle';
import MainModel from '../../models/mainModel';
import getMediaUrl from '../../utils/getMediaUrl';

class SavannahModel {
  constructor() {
    this.wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words?';
    this.removeDigitsRegExp = /\d/g;
    this.mainModel = new MainModel();
    this.setDefault();
  }

  /* async getCurrUser(user) {
    this.currentUser = user;
  } */

  async fetchWords(user, chosenLevel, chosenRound) {
    this.currentUser = user;
    this.currentUser.currentGroup = chosenLevel || 0;
    this.currentUser.currentPage = chosenRound || 0;

    console.log(this.currentUser);
    const data = await this.mainModel.getWords(this.currentUser.currentPage,
      this.currentUser.currentGroup);
    console.log('data', data);
    return data;
  }

  getWordsAndTranslation(data) {
    this.wordsArr = data.map((el) => el.word);
    this.translation = data.map((el) => el.wordTranslate);
    this.randomArrOfIndexes = this.randomArrAndShuffle(this.wordsArr.length);
    this.isGameOn = true;
    console.log('Translation arr', this.translation);
    console.log('Eng words', this.wordsArr);
  }

  getWordIdsAndAudio(data) {
    this.wordsIdArr = data.map((el) => el.id);
    this.audioArr = data.map((el) => el.audio);
    console.log('audio', this.audioArr);
    console.log('ids', this.wordsIdArr);
  }

  randomArrAndShuffle(n) {
    this.arr = [...Array(n).keys()];

    return shuffleArray(this.arr);
  }

  generateTranslation() {
    this.correctAnswer = this.translation[this.randomArrOfIndexes[this.count]];
    this.answersArr = [this.correctAnswer];
    const newArr = [...this.translation];

    newArr.splice(this.randomArrOfIndexes[this.count], 1);

    const shortArr = this.randomArrAndShuffle(newArr.length).slice(0, 3);
    shortArr.forEach((element) => {
      this.answersArr.push(newArr[element]);
    });
    this.answersArr = shuffleArray(this.answersArr);
    this.count += 1;

    return this.answersArr;
  }

  getCurrentWordId() {
    this.currentWordId = this.wordsIdArr[this.randomArrOfIndexes[this.count - 1]];
  }

  getCurrentAudioUrl() {
    this.currentWordAudio = this.audioArr[this.randomArrOfIndexes[this.count - 1]];
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

  setDefault() {
    this.count = 0;
    this.rightAnswer = 0;
    this.wrongAnswer = 0;
  }

  async fetchMedia(key) {
    this.mediaUrl = getMediaUrl(key);
    const response = await fetch(this.mediaUrl);
    const data = await response.json();
    return data;
  }
}

export default SavannahModel;
