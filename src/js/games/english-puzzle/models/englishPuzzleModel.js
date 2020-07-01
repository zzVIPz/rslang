import CONSTANTS from '../constants/constants';

export default class EnglishPuzzleModel {
  constructor(data) {
    this.data = data;
  }

  getSentencesData() {
    const sentencesData = [];
    this.data.forEach((el) => {
      const currentSentenceData = {};
      const currentSentence = el.textExample.replace(/<[^<>]+>/g, '');
      currentSentenceData.sentence = currentSentence;
      currentSentenceData.translate = el.textExampleTranslate;
      currentSentenceData.wordId = el.id;
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
        if (el2.length < CONSTANTS.SHORT_WORDS_MAX_LENGTH) {
          wordObj.length = el2.length + 2;
        } else if (el2.length > CONSTANTS.LONG_WORDS_MIN_LENGTH) {
          wordObj.length = el2.length - 1;
        } else {
          wordObj.length = el2.length;
        }
        lettersCount += wordObj.length;
        currentSplitSentenceArr.push(wordObj);
      });
      currentSplitSentenceObj.splitSentence = currentSplitSentenceArr;
      currentSplitSentenceObj.translate = el.translate;
      currentSplitSentenceObj.lettersCount = lettersCount;
      currentSplitSentenceObj.wordId = el.wordId;
      splitSentencesData.push(currentSplitSentenceObj);
    });
    return splitSentencesData;
  }
}
