import DATA_FOR_GAMES from './mockData';

export default class EnglishPuzzleModel {
  constructor() {
    this.data = DATA_FOR_GAMES;
  }

  getSentencesData() {
    const sentencesData = [];
    this.data.forEach((el) => {
      const currentSentenceData = {};
      const currentSentence = el.textExample.replace(/<[^<>]+>/g, '');
      currentSentenceData.sentence = currentSentence;
      currentSentenceData.translate = el.textExampleTranslate;
      sentencesData.push(currentSentenceData);
    });
    return sentencesData;
  }

  getSplitSentencesData() {
    const splitSentencesData = [];
    const sentencesData = this.getSentencesData();

    sentencesData.forEach((el, id) => {
      const currentSplitSentence = el.sentence.split(' ');
      const currentSplitSentenceObj = {};
      const currentSplitSentenceArr = [];
      let lettersCount = 0;
      currentSplitSentence.forEach((el2, id2) => {
        const wordObj = {};
        wordObj.wordName = el2;
        wordObj.line = id;
        wordObj.pos = id2;
        wordObj.length = el2.length;
        lettersCount += el2.length;
        currentSplitSentenceArr.push(wordObj);
      });
      currentSplitSentenceObj.splitSentence = currentSplitSentenceArr;
      currentSplitSentenceObj.translate = el.translate;
      currentSplitSentenceObj.lettersCount = lettersCount;
      splitSentencesData.push(currentSplitSentenceObj);
    });
    console.log(splitSentencesData);
    return splitSentencesData;
  }
}
