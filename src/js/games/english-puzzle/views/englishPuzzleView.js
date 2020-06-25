import { Sortable } from '@shopify/draggable';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import Template from './template';
import shuffle from '../helpers/shuffle';
import getElementWidth from '../helpers/getElementWidth';
import CONSTANTS_VIEW from './constantsView';
import createPuzzle from './createPuzzleCanvas';

export default class EnglishPuzzleView {
  constructor() {
    this.template = Template;
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.currentSentence = 0;
    this.tipTranslate = true;
    this.tipBackground = false;
    this.domElements = {};
    this.img = new Image();
    this.img.src = '/src/assets/images/ep-icons/scream.jpg';
    this.paintingName = 'Иван Айвазовский - Девятый вал (1850г)';
    this.currentWordId = null;
    this.wordsStat = { rightWords: [], wrongWords: [] };
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.skipButton = document.getElementById('skipBtn');
    this.domElements.checkButton = document.getElementById('checkBtn');
    this.domElements.continueBtn = document.getElementById('continueBtn');
    this.domElements.resultsBtn = document.getElementById('resultsBtn');
    this.domElements.playField = document.getElementById('playField');
    this.domElements.sentenceTranslate = document.getElementById('sentenceTranslate');
    this.domElements.tipTranslate = document.getElementById('tipTranslate');
    this.domElements.tipBackground = document.getElementById('tipBackground');
    this.domElements.board = document.getElementById('board');
    this.boardWidth = this.domElements.playField.offsetWidth;
    const splitSentencesData = this.englishPuzzleModel.getSplitSentencesData();
    const lineNumbersWrapper = document.querySelector('.ep-numbers');

    this.switchTipButtons();

    if (this.currentSentence < 10) {
      this.domElements.sentenceTranslate
        .textContent = splitSentencesData[this.currentSentence].translate;
      this.currentWordId = splitSentencesData[this.currentSentence].wordId;

      splitSentencesData.forEach((el, id) => {
        const elem = document.createElement('div');
        const lineNumberBlock = document.createElement('div');
        let posOffset = 0;

        if (id === this.currentSentence) {
          lineNumberBlock.classList.add('ep-board__line_number-active');
          elem.classList.add('ep-board__line_active');
          elem.classList.add('drag-container');
        }
        elem.classList.add('ep-board__line');
        lineNumberBlock.classList.add('ep-board__line_number');

        lineNumberBlock.textContent = splitSentencesData.indexOf(el) + 1;
        lineNumbersWrapper.append(lineNumberBlock);

        document.querySelector('.ep-board').append(elem);
        el.splitSentence.forEach((word) => {
          const elem2 = document.createElement('div');
          const elWidth = getElementWidth(this.boardWidth, el.lettersCount, word.length);
          elem2.style.width = `${elWidth}px`;
          elem2.classList.add('ep-sentences-word');
          elem2.classList.add('Block--isDraggable');
          elem2.textContent = word.wordName;
          elem2.dataset.posOffset = posOffset;
          elem2.dataset.line = word.line;
          elem2.dataset.pos = word.pos;
          const puzzleCanvas = createPuzzle(elWidth);
          elem2.append(puzzleCanvas);

          if (id < this.currentSentence) {
            this.fillPuzzle(puzzleCanvas, elem2.dataset.posOffset, id, word.wordName, true);
            elem.append(elem2);
          }
          if (id === this.currentSentence) {
            this.fillPuzzle(puzzleCanvas, elem2.dataset.posOffset,
              id, word.wordName, this.tipBackground);
            this.domElements.playField.append(elem2);
          }
          posOffset += elWidth;
        });
        shuffle(this.domElements.playField);
      });
    } else {
      this.domElements.board.innerHTML = '';
      this.domElements.board.append(this.img);
      this.domElements.sentenceTranslate.textContent = this.paintingName;
      this.domElements.skipButton.classList.add('ep-hidden');
      this.domElements.continueBtn.classList.remove('ep-hidden');
      this.domElements.playField.classList.add('ep-board__line_active');
      this.domElements.resultsBtn.classList.remove('ep-hidden');
    }
    this.domElements.activeLine = document.querySelector('.ep-board__line_active');
    this.addDragAndDrop();
    this.addListeners();
    // const a = new Audio('https://raw.githubusercontent.com/irinainina/rslang-data/master/files/01_0009_example.mp3');
    // a.play();
  }

  fillPuzzle(puzzleCanvas, positionOffset, indexString, text, imgRender) {
    const ctx = puzzleCanvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    if (imgRender === true) {
      const ratio = this.img.naturalWidth / this.img.naturalHeight;
      this.img.width = this.boardWidth + ((Math.sqrt(2) / 2 + 1) * 10);
      this.img.height = this.img.width / ratio;
      if (this.img.height < 500) {
        this.img.height = 500;
        this.img.width = this.img.height * ratio;
      }
      ctx.drawImage(this.img, -positionOffset, -50 * indexString, this.img.width, this.img.height);
    }
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(text, puzzleCanvas.width / 2, (puzzleCanvas.height / 2) + 6);
  }

  switchTipButtons() {
    if (this.tipTranslate === true) {
      this.domElements.tipTranslate.classList.add('tips__button_active');
      this.domElements.sentenceTranslate.classList.remove('ep-transparent');
    } else {
      this.domElements.tipTranslate.classList.remove('tips__button_active');
      this.domElements.sentenceTranslate.classList.add('ep-transparent');
    }

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

  resetWordsStat() {
    this.wordsStat.rightWords.length = 0;
    this.wordsStat.wrongWords.length = 0;
  }

  addListeners() {
    this.domElements.checkButton.addEventListener('click', () => {
      let mistakes = 0;
      this.domElements.activeLine.childNodes.forEach((el, id) => {
        const elWidth = el.style.width.slice(0, el.style.width.length - 2);
        el.classList.remove('ep-wrongPosition');
        el.classList.remove('ep-rightPosition');
        let borderColor;
        if (id !== +el.dataset.pos) {
          el.classList.add('ep-wrongPosition');
          borderColor = CONSTANTS_VIEW.BORDER_COLOR.RED;
          mistakes += 1;
        } else {
          el.classList.add('ep-rightPosition');
          borderColor = CONSTANTS_VIEW.BORDER_COLOR.GREEN;
        }
        const puzzleCanvas = createPuzzle(+elWidth, borderColor);
        puzzleCanvas.classList.add('Block--isClickable');
        el.append(puzzleCanvas);
        this.fillPuzzle(puzzleCanvas, el.dataset.posOffset,
          this.currentSentence, el.textContent, this.tipBackground);
        el.removeChild(el.childNodes[1]);
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
      if (this.currentSentence === 10) {
        this.currentSentence = 0;
        this.resetWordsStat();
        this.domElements.continueBtn.classList.add('ep-hidden');
        this.render();
      } else {
        this.wordsStat.rightWords.push(this.currentWordId);
        this.currentSentence += 1;
        this.domElements.continueBtn.classList.add('ep-hidden');
        this.render();
      }
    });

    this.domElements.skipButton.addEventListener('click', () => {
      this.wordsStat.wrongWords.push(this.currentWordId);
      this.currentSentence += 1;
      this.render();
    });

    this.domElements.resultsBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal');
      const modalBody = document.getElementById('modalBody');
      const modalImage = document.getElementById('modalImage');
      const modalDescription = document.getElementById('modalDescription');
      const rightWordsBlock = document.getElementById('rightWordsBlock');
      const wrongWordsBlock = document.getElementById('wrongWordsBlock');
      const rightWordsCount = document.getElementById('rightWordsCount');
      const wrongWordsCount = document.getElementById('wrongWordsCount');
      const modalContinueBtn = document.getElementById('modalContinueBtn');
      const sentencesArr = this.englishPuzzleModel.getSentencesData();

      modalImage.setAttribute('style', `background-image:url(${this.img.src});`);
      modalDescription.textContent = this.paintingName;
      rightWordsCount.textContent = this.wordsStat.rightWords.length;
      wrongWordsCount.textContent = this.wordsStat.wrongWords.length;

      sentencesArr.forEach((el) => {
        const modalMainLine = document.createElement('div');
        const modalAudioBtn = document.createElement('div');
        const modalMainSentenceBlock = document.createElement('div');
        modalMainLine.classList.add('ep-modal__main-line');
        modalAudioBtn.classList.add('ep-modal__audioBtn');
        modalMainSentenceBlock.classList.add('ep-modal__sentence-block');
        modalMainSentenceBlock.textContent = el.sentence;
        modalMainLine.append(modalAudioBtn);
        modalMainLine.append(modalMainSentenceBlock);
        if (this.wordsStat.rightWords.indexOf(el.wordId) < 0) {
          wrongWordsBlock.append(modalMainLine);
        } else {
          rightWordsBlock.append(modalMainLine);
        }
      });

      modal.classList.remove('ep-modal_hidden');
      modalBody.classList.remove('ep-modal_hidden');

      modalContinueBtn.addEventListener('click', () => {
        this.resetWordsStat();
        modal.classList.add('ep-modal_hidden');
        modalBody.classList.add('ep-modal_hidden');
        rightWordsBlock.innerHTML = '';
        wrongWordsBlock.innerHTML = '';
        this.currentSentence = 0;
        this.render();
      });
    });

    this.domElements.tipTranslate.addEventListener('click', () => {
      if (this.tipTranslate === true) {
        this.tipTranslate = false;
      } else {
        this.tipTranslate = true;
      }
      this.switchTipButtons();
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
      if (this.domElements.playField.childNodes.length === 0 && event.target.classList.contains('Block--isClickable')) {
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
