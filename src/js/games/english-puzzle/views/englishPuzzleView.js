import { Sortable, Plugins } from '@shopify/draggable';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';
import shuffle from '../helpers/shuffle';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.currentSentence = 0;
    this.domElements = {};
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.skipButton = document.getElementById('skipBtn');
    this.domElements.checkButton = document.getElementById('checkBtn');
    this.domElements.continueBtn = document.getElementById('continueBtn');
    this.domElements.playField = document.getElementById('playField');

    const splitSentences = this.englishPuzzleModel.getSplitSentences();
    shuffle(splitSentences[this.currentSentence]);

    splitSentences.forEach((sentence, idSentence) => {
      const elem = document.createElement('div');
      if (idSentence === this.currentSentence) {
        elem.classList.add('ep-board__line_active');
        elem.classList.add('drag-container');
      }
      elem.classList.add('ep-board__line');
      elem.textContent = splitSentences.indexOf(sentence) + 1;
      document.querySelector('.ep-board').append(elem);
      sentence.forEach((word) => {
        const elem2 = document.createElement('div');
        elem2.classList.add('ep-sentences-word');
        elem2.classList.add('Block--isDraggable');
        elem2.textContent = word.wordName;
        elem2.dataset.line = word.line;
        elem2.dataset.pos = word.pos;
        if (idSentence < this.currentSentence) {
          elem.append(elem2);
        }
        if (idSentence === this.currentSentence) {
          this.domElements.playField.append(elem2);
        }
      });
    });
    this.domElements.activeLine = document.querySelector('.ep-board__line_active');
    this.addDragAndDrop();
    this.addListeners();
  }

  addDragAndDrop() {
    const classes = {
      draggable: 'Block--isDraggable',
    };
    const containers = document.querySelectorAll('.drag-container');
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
      if (this.domElements.playField.childNodes.length === 1) {
        this.domElements.checkButton.classList.remove('ep-hidden');
        this.domElements.skipButton.classList.add('ep-hidden');
      }
    });
    return sortable;
  }

  addListeners() {
    this.domElements.checkButton.addEventListener('click', () => {
      let mistakes = 0;
      this.domElements.activeLine.childNodes.forEach((word, idWord) => {
        if (idWord !== 0) {
          word.classList.remove('ep-wrongPosition');
          word.classList.remove('ep-rightPosition');
          if (idWord !== +word.dataset.pos + 1) {
            word.classList.add('ep-wrongPosition');
            mistakes += 1;
          } else {
            word.classList.add('ep-rightPosition');
          }
        }
      });

      if (mistakes === 0
         && this.domElements.activeLine.childNodes.length > 1
          && this.domElements.playField.childNodes.length === 0) {
        this.domElements.continueBtn.classList.remove('ep-hidden');
        this.domElements.checkButton.classList.add('ep-hidden');
        this.domElements.skipButton.classList.add('ep-hidden');
      } else {
        this.domElements.skipButton.classList.remove('ep-hidden');
      }
    });

    this.domElements.continueBtn.addEventListener('click', () => {
      this.currentSentence += 1;
      this.domElements.continueBtn.classList.add('ep-hidden');
      this.render();
    });

    this.domElements.skipButton.addEventListener('click', () => {
      this.currentSentence += 1;
      this.render();
    });
  }
}
