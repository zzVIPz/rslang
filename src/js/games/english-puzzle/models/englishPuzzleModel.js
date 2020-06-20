import DATA_FOR_GAMES from './mockData';

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

    sentences.forEach((el, id) => {
      const currentSplitSentence = el.split(' ');

      const currentSplitSentenceData = [];
      currentSplitSentence.forEach((el2, id2) => {
        const wordObj = {};
        wordObj.wordName = el2;
        wordObj.line = id;
        wordObj.pos = id2;
        currentSplitSentenceData.push(wordObj);
      });

      splitSentences.push(currentSplitSentenceData);
    });
    return splitSentences;
  }
}
