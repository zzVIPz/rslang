import DATA_FOR_GAMES from '../../../models/mockData';

export default class EnglishPuzzleModel {
  constructor() {
    this.data = DATA_FOR_GAMES;
  }

  getSentences() {
    const sentences = [];
    this.data.forEach((el) => {
      const currentSentence = el.textExample.replace(/<[^<>]+>/g, '');
      sentences.push(currentSentence);
    });
    return sentences;
  }

  getSplitSentences() {
    const splitSentences = [];
    const sentences = this.getSentences();
    sentences.forEach((el) => {
      const currentSplitSentence = el.split(' ');
      splitSentences.push(currentSplitSentence);
    });
    return splitSentences;
  }
}
