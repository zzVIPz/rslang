import { Sortable, Plugins } from '@shopify/draggable';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.currentSentence = 0;
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    const splitSentences = this.englishPuzzleModel.getSplitSentences();
    this.shuffle(splitSentences[this.currentSentence]);

    splitSentences.forEach((sentence, id1) => {
      const elem = document.createElement('div');
      const playground = document.querySelector('.ep-playground');
      if (id1 === this.currentSentence) {
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
        if (id1 < this.currentSentence) {
          elem.append(elem2);
        }
        if (id1 === this.currentSentence) {
          playground.append(elem2);
        }
      });
    });
    this.addDragAndDrop();
    this.addListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  addDragAndDrop() {
    const playground = document.getElementById('playground');
    const checkButton = document.getElementById('checkBtn');
    const skipButton = document.getElementById('skipBtn');
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
    sortable.on('drag:stop', () => {
      if (playground.childNodes.length === 1) {
        checkButton.classList.remove('ep-hidden');
        skipButton.classList.add('ep-hidden');
      }
    });
    return sortable;
  }

  // eslint-disable-next-line class-methods-use-this
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  addListeners() {
    const skipButton = document.getElementById('skipBtn');
    const checkButton = document.getElementById('checkBtn');
    const continueBtn = document.getElementById('continueBtn');
    const activeLine = document.querySelector('.ep-sentences_active');
    const playground = document.getElementById('playground');

    checkButton.addEventListener('click', () => {
      let mistakes = 0;
      activeLine.childNodes.forEach((el, id) => {
        if (id !== 0) {
          el.classList.remove('ep-wrongPosition');
          el.classList.remove('ep-rightPosition');
          if (id !== +el.dataset.pos + 1) {
            el.classList.add('ep-wrongPosition');
            mistakes += 1;
          } else {
            el.classList.add('ep-rightPosition');
          }
        }
      });
      if (mistakes === 0
         && activeLine.childNodes.length > 1
          && playground.childNodes.length === 0) {
        continueBtn.classList.remove('ep-hidden');
        checkButton.classList.add('ep-hidden');
        skipButton.classList.add('ep-hidden');
      } else {
        skipButton.classList.remove('ep-hidden');
      }
    });

    continueBtn.addEventListener('click', () => {
      this.currentSentence += 1;
      continueBtn.classList.add('ep-hidden');
      this.render();
    });

    skipButton.addEventListener('click', () => {
      this.currentSentence += 1;
      this.render();
    });
  }
}
