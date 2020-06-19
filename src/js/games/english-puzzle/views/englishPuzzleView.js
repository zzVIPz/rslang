import { Sortable, Plugins } from '@shopify/draggable';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    const splitSentences = this.englishPuzzleModel.getSplitSentences();
    this.shuffle(splitSentences[0]);

    splitSentences.forEach((sentence, id1) => {
      const elem = document.createElement('div');
      const playground = document.querySelector('.ep-playground');
      if (id1 === 0) {
        elem.classList.add('ep-sentences_active');
      }
      elem.classList.add('ep-sentences');
      elem.textContent = splitSentences.indexOf(sentence) + 1;
      document.querySelector('.mockData').append(elem);
      sentence.forEach((word) => {
        const elem2 = document.createElement('div');
        elem2.classList.add('ep-sentences-word');
        elem2.classList.add('Block--isDraggable');
        elem2.textContent = word.wordName;
        elem2.dataset.line = word.line;
        elem2.dataset.pos = word.pos;
        if (id1 === 0) {
          playground.append(elem2);
        }
      });
    });
    this.addDragAndDrop();
  }

  // eslint-disable-next-line class-methods-use-this
  addDragAndDrop() {
    const classes = {
      draggable: 'Block--isDraggable',
      capacity: 'draggable-container-parent--capacity',
    };
    const containers = document.querySelectorAll('.ep-sentences_active');
    if (containers.length === 0) {
      return false;
    }
    const sortable = new Sortable(containers, {
      draggable: `.${classes.draggable}`,
      mirror: {
        constrainDimensions: true,
      },
      plugins: [Plugins.ResizeMirror],
    });
    return sortable;
  }

  // eslint-disable-next-line class-methods-use-this
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
}
