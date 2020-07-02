import shuffleArray from '../utils/shaffle';
import MainModel from '../../models/mainModel';
import {
  INITIAL_BACKGROUND_POSITIONY,
  REMOVE_DIGITS_REGEXP,
  INITIAL_CRISTAL_WIDTH,
  DEFAULT_DISPLAYED_LEVEL,
} from './constSavannah';

class SavannahModel {
  constructor() {
    this.mainModel = new MainModel();
    this.setDefault();
    this.audioOn = true;
    this.isPreloading = true;
    this.isWordClicked = false;
    this.removeDigitsRegExp = REMOVE_DIGITS_REGEXP;
    this.backgroundPositionY = INITIAL_BACKGROUND_POSITIONY;
    this.cristalWidth = INITIAL_CRISTAL_WIDTH;
    this.levelNumForUser = DEFAULT_DISPLAYED_LEVEL;
  }

  async fetchWords(user, chosenLevel, chosenRound) {
    this.currentUser = user;

    const data = await this.mainModel.getWords(chosenRound || 0,
      chosenLevel || 0);

    return data;
  }

  getWordsAndTranslation(data) {
    this.wordsArr = data.map((el) => el.word);
    this.translation = data.map((el) => el.wordTranslate);
    this.randomArrOfIndexes = this.randomArrAndShuffle(this.wordsArr.length);
    this.isGameOn = true;
  }

  getWordIdsAndAudio(data) {
    this.wordsIdArr = data.map((el) => el.id);
    this.audioArr = data.map((el) => el.audio);
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
      this.rightAnswersCounter += 1;

      return true;
    }
    this.wrongAnswerCounter += 1;

    return false;
  }

  setDefault() {
    this.count = 0;
    this.rightAnswersCounter = 0;
    this.wrongAnswerCounter = 0;
  }
}

export default SavannahModel;
