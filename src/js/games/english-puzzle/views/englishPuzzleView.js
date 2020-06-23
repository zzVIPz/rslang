import { Sortable } from '@shopify/draggable';
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
    this.tipBackground = false;
    this.domElements = {};
    this.img = new Image();
    this.img.src = '/src/assets/images/ep-icons/scream.jpg';
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.skipButton = document.getElementById('skipBtn');
    this.domElements.checkButton = document.getElementById('checkBtn');
    this.domElements.continueBtn = document.getElementById('continueBtn');
    this.domElements.playField = document.getElementById('playField');
    this.domElements.sentenceTranslate = document.getElementById('sentenceTranslate');
    this.domElements.tipTranslate = document.getElementById('tipTranslate');
    this.domElements.tipBackground = document.getElementById('tipBackground');
    const parentWidth = this.domElements.playField.offsetWidth;
    const splitSentencesData = this.englishPuzzleModel.getSplitSentencesData();
    const lineNumbersWrapper = document.querySelector('.ep-numbers');

    if (this.currentSentence < 10) {
      this.domElements.sentenceTranslate
        .textContent = splitSentencesData[this.currentSentence].translate;
    }

    this.showTip();
    this.showTipBackground();

    splitSentencesData.forEach((el, id) => {
      const elem = document.createElement('div');
      let posCounter = 0;

      if (this.currentSentence === 10 && id === 0) {
        elem.classList.add('ep-board__line_active');
        elem.classList.add('drag-container');
      }
      if (id === this.currentSentence) {
        elem.classList.add('ep-board__line_active');
        elem.classList.add('drag-container');
      }
      // console.log(id, this.currentSentence);
      elem.classList.add('ep-board__line');

      const lineNumberBlock = document.createElement('div');
      lineNumberBlock.classList.add('ep-board__line_number');
      lineNumberBlock.textContent = splitSentencesData.indexOf(el) + 1;
      lineNumbersWrapper.append(lineNumberBlock);

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
        const puzzle = document.createElement('canvas');
        puzzle.classList.add('Block--isClickable');
        this.createPuzzle(puzzle, elem2, elWidth);

        if (id < this.currentSentence) {
          this.fillPuzzle(puzzle, parentWidth, posCounter, id, word.wordName, true);
          elem.append(elem2);
        }
        if (id === this.currentSentence) {
          this.fillPuzzle(puzzle, parentWidth, posCounter, id, word.wordName, this.tipBackground);
          this.domElements.playField.append(elem2);
        }
        posCounter += elWidth;
      });
      shuffle(this.domElements.playField);
    });

    this.domElements.activeLine = document.querySelector('.ep-board__line_active');
    this.addDragAndDrop();
    this.addListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  createPuzzle(canvas, parentElement, length) {
    const parent = parentElement;
    const puzzle = canvas;
    const ctx = puzzle.getContext('2d');
    puzzle.height = 50;
    puzzle.width = length + 16;
    ctx.lineWidth = 2;
    // if (state === 1) {
    //   ctx.strokeStyle = '#FF0000';
    // } else if (state === 2) {
    //   ctx.strokeStyle = '#00FF00';
    // } else {
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    // }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 0);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 17);
    ctx.arc(puzzle.width + 5 - (Math.sqrt(2) / 2 + 1) * 10, 25, 10,
      (5 / 4) * Math.PI + 0.2, (3 / 4) * Math.PI - 0.2, false);
    ctx.moveTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 33);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 50);
    ctx.lineTo(0, 50);

    ctx.lineTo(0, 33);
    ctx.arc(5, 25, 10, (3 / 4) * Math.PI, (5 / 4) * Math.PI, true);
    ctx.lineTo(0, 17);
    ctx.lineTo(0, 0);

    ctx.fillStyle = '#9A3FD5';
    ctx.fill();

    ctx.stroke();
    ctx.clip();

    parent.append(puzzle);
  }

  fillPuzzle(puzzle, imgWidth, pos, indexString, text, state) {
    const ctx = puzzle.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    if (state === true) {
      const ratio = this.img.naturalWidth / this.img.naturalHeight;
      this.img.width = imgWidth + ((Math.sqrt(2) / 2 + 1) * 10);
      this.img.height = this.img.width / ratio;
      ctx.drawImage(this.img, -pos, -50 * indexString, this.img.width, this.img.height);
    }
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(text, puzzle.width / 2, (puzzle.height / 2) + 6);
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

  showTipBackground() {
    if (this.tipBackground === true) {
      this.domElements.tipBackground.classList.add('tips__button_active');
    } else {
      this.domElements.tipBackground.classList.remove('tips__button_active');
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
      // plugins: [Plugins.ResizeMirror],
    });
    sortable.on('drag:stop', () => {
      if (this.domElements.playField.childNodes.length === 2) {
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
        // if (idWord !== 0) {
        word.classList.remove('ep-wrongPosition');
        word.classList.remove('ep-rightPosition');
        if (idWord !== +word.dataset.pos) {
          word.classList.add('ep-wrongPosition');
          mistakes += 1;
        } else {
          word.classList.add('ep-rightPosition');
        }
        // }
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
      if (this.currentSentence === 10) {
        alert('Round end!');
        this.currentSentence = 0;
        this.render();
      } else {
        this.currentSentence += 1;
        this.render();
      }
    });

    this.domElements.tipTranslate.addEventListener('click', () => {
      if (this.showTipTranslate === true) {
        this.showTipTranslate = false;
      } else {
        this.showTipTranslate = true;
      }
      this.showTip();
    });

    this.domElements.tipBackground.addEventListener('click', () => {
      if (this.tipBackground === true) {
        this.tipBackground = false;
      } else {
        this.tipBackground = true;
      }
      this.render();
    });

    this.domElements.playField.addEventListener('click', (event) => {
      if (event.target.classList.contains('Block--isClickable')) {
        this.domElements.activeLine.append(event.target.parentElement);
      }
      if (this.domElements.playField.childNodes.length === 0) {
        this.domElements.checkButton.classList.remove('ep-hidden');
        this.domElements.skipButton.classList.add('ep-hidden');
      }
    });

    this.domElements.activeLine.addEventListener('click', (event) => {
      if (event.target.classList.contains('Block--isClickable')) {
        this.domElements.playField.append(event.target.parentElement);
      }
      if (this.domElements.playField.childNodes.length !== 0) {
        this.domElements.checkButton.classList.add('ep-hidden');
        this.domElements.skipButton.classList.remove('ep-hidden');
      }
    });
  }
}
