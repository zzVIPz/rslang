import MainModel from '../../models/mainModel';
import getRhymesUrl from './audiocall-utils/getRhymesUrl';

class AudiocallModel {
  constructor() {
    this.rightAnswer = [];
    this.wrongAnswer = [];
    this.positionAnswerArray = [1, 2, 3, 4];
    this.mainModel = new MainModel();
  }

  async fetchWords(user, chosenLevel, chosenRound) {
    this.currentUser = user;

    const data = await this.mainModel.getWords(chosenRound || 0,
      chosenLevel || 0);

    return data;
  }

  getWordsForAnswers = async (words) => {
    const oneWord = words.split(' ');
    const url = getRhymesUrl(oneWord);
    const res = await fetch(url);
    const dataWords = await res.json();
    return dataWords;
  }
}

export default AudiocallModel;
