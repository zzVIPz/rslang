import { Sortable, Plugins } from '@shopify/draggable';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';
import shuffle from '../helpers/shuffle';
import getElementWidth from '../helpers/getElementWidth';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.currentSentence = 0;
    this.showTipTranslate = true;
    this.domElements = {};
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.skipButton = document.getElementById('skipBtn');
    this.domElements.checkButton = document.getElementById('checkBtn');
    this.domElements.continueBtn = document.getElementById('continueBtn');
    this.domElements.playField = document.getElementById('playField');
    this.domElements.sentenceTranslate = document.getElementById('sentenceTranslate');
    this.domElements.tipTranslate = document.getElementById('tipTranslate');
    const parentWidth = this.domElements.playField.offsetWidth;
    const splitSentencesData = this.englishPuzzleModel.getSplitSentencesData();

    this.domElements.sentenceTranslate
      .textContent = splitSentencesData[this.currentSentence].translate;
    this.showTip();
    shuffle(splitSentencesData[this.currentSentence].splitSentence);

    splitSentencesData.forEach((el, id) => {
      const elem = document.createElement('div');
      if (id === this.currentSentence) {
        elem.classList.add('ep-board__line_active');
        elem.classList.add('drag-container');
      }
      elem.classList.add('ep-board__line');
      elem.textContent = splitSentencesData.indexOf(el) + 1;
      document.querySelector('.ep-board').append(elem);
      el.splitSentence.forEach((word) => {
        const elem2 = document.createElement('div');
        const elWidth = getElementWidth(parentWidth, el.lettersCount, word.length);
        elem2.style.width = `${elWidth}px`;
        elem2.classList.add('ep-sentences-word');
        elem2.classList.add('Block--isDraggable');
        elem2.textContent = word.wordName;
        elem2.dataset.line = word.line;
        elem2.dataset.pos = word.pos;
        if (id < this.currentSentence) {
          elem.append(elem2);
        }
        if (id === this.currentSentence) {
          this.domElements.playField.append(elem2);
        }
      });
    });

    this.domElements.activeLine = document.querySelector('.ep-board__line_active');
    this.addDragAndDrop();
    this.addListeners();
  }

  showTip() {
    if (this.showTipTranslate === true) {
      this.domElements.tipTranslate.classList.add('tips__button_active');
      this.domElements.sentenceTranslate.classList.remove('ep-transparent');
    } else {
      this.domElements.tipTranslate.classList.remove('tips__button_active');
      this.domElements.sentenceTranslate.classList.add('ep-transparent');
    }
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

    this.domElements.tipTranslate.addEventListener('click', () => {
      if (this.showTipTranslate === true) {
        this.showTipTranslate = false;
      } else {
        this.showTipTranslate = true;
      }
      this.showTip();
    });

    this.domElements.playField.addEventListener('click', (event) => {
      if (event.target.classList.contains('Block--isDraggable')) {
        this.domElements.activeLine.append(event.target);
      }
      if (this.domElements.playField.childNodes.length === 0) {
        this.domElements.checkButton.classList.remove('ep-hidden');
        this.domElements.skipButton.classList.add('ep-hidden');
      }
    });

    this.domElements.activeLine.addEventListener('click', (event) => {
      if (event.target.classList.contains('Block--isDraggable')) {
        this.domElements.playField.append(event.target);
      }
      if (this.domElements.playField.childNodes.length !== 0) {
        this.domElements.checkButton.classList.add('ep-hidden');
        this.domElements.skipButton.classList.remove('ep-hidden');
      }
    });
  }
}
