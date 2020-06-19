import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    // const sentences = this.englishPuzzleModel.getSentences();
    // sentences.forEach((el) => {
    //   const elem = document.createElement('div');
    //   elem.classList.add('ep-sentences');
    //   elem.textContent = `${sentences.indexOf(el) + 1} ${el}`;
    //   document.querySelector('.mockData').append(elem);
    // });

    const splitSentences = this.englishPuzzleModel.getSplitSentences();
    splitSentences.forEach((sentence) => {
      const elem = document.createElement('div');
      elem.classList.add('ep-sentences');
      elem.textContent = splitSentences.indexOf(sentence) + 1;
      document.querySelector('.mockData').append(elem);
      sentence.forEach((word) => {
        const elem2 = document.createElement('div');
        elem2.classList.add('ep-sentences-word');
        elem2.textContent = word;
        elem.append(elem2);
      });
    });
    this.addDragAndDropListener();
  }

  // eslint-disable-next-line class-methods-use-this
  addDragAndDropListener() {
    const firstDiv = document.querySelector('.ep-sentences-word');
  }
}
