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
}
