/* TODO: Template -> capital letter to lowercase */
import { Sortable } from '@shopify/draggable';
import Template from './template';
import shuffleChildElements from '../helpers/shuffleChildElements';
import getElementWidth from '../helpers/getElementWidth';
import CONSTANTS from '../constants/constants';
import createPuzzle from './createPuzzleCanvas';

/* TODO: Magic numbers -> constants */
export default class EnglishPuzzleView {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.template = Template;
    this.englishPuzzleModel = null;
    this.audioModel = null;
    this.currentSentence = 0;
    this.tipTranslate = true;
    this.tipBackground = false;
    this.tipAutospeech = false;
    this.domElements = {};

    this.img = new Image();
    this.paintingName = null;

    this.gameDifficult = 1;
    this.gameLevel = 1;
    this.onDifficultChange = null;
    this.onLevelChange = null;

    this.currentWordId = null;
    this.wordsStat = { rightWords: [], wrongWords: [] };
    this.onAudioPlayEnded = this.AudioPlayEnded.bind(this);
  }

  /* TODO: Magic numbers -> constants,
   check doubled actions with DOM and if it is define in separate method */
  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.skipButton = document.getElementById('skipBtn');
    this.domElements.checkButton = document.getElementById('checkBtn');
    this.domElements.continueBtn = document.getElementById('continueBtn');
    this.domElements.resultsBtn = document.getElementById('resultsBtn');
    this.domElements.playField = document.getElementById('playField');
    this.domElements.closeButton = document.getElementById('closeButton');
    this.domElements.sentenceTranslate = document.getElementById('sentenceTranslate');
    this.domElements.tipAutospeech = document.querySelector('.user-tool__button-speaker');
    this.domElements.stopSpeech = document.getElementById('stopSpeech');
    this.domElements.tipSpeech = document.getElementById('tipSpeech');
    this.domElements.tipTranslate = document.getElementById('tipTranslate');
    this.domElements.tipBackground = document.getElementById('tipBackground');
    this.domElements.difficultSelect = document.getElementById('difficultSelect');
    this.domElements.levelSelect = document.getElementById('levelSelect');
    this.domElements.board = document.getElementById('board');
    this.boardWidth = this.domElements.playField.offsetWidth;
    const splitSentencesData = this.englishPuzzleModel.getSplitSentencesData();
    const lineNumbersWrapper = document.querySelector('.ep-numbers');
    this.switchTipButtons();
    this.checkAutospeechTipBtn();
    if (this.currentSentence < 10) {
      this.domElements.sentenceTranslate
        .textContent = splitSentencesData[this.currentSentence].translate;
      this.currentWordId = splitSentencesData[this.currentSentence].wordId;
      this.audio = this.audioModel.getCurrentAudio(this.currentSentence);

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
        lineNumberBlock.textContent = id + 1;
        lineNumbersWrapper.append(lineNumberBlock);
        this.domElements.board.append(elem);

        el.splitSentence.forEach((word) => {
          if (id <= this.currentSentence) {
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
          }
        });
        shuffleChildElements(this.domElements.playField);
      });
      this.audioModel.getAudioArray();
      if (this.tipAutospeech) {
        this.playAudio();
      }
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
  }

  /* TODO: difine magic numbers, font name, text align and color in constants */
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
    if (this.boardWidth <= 800) {
      ctx.font = '16px Verdana';
    } else if (this.boardWidth <= 900) {
      ctx.font = '18px Verdana';
    } else {
      ctx.font = '20px Verdana';
    }
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(text, puzzleCanvas.width / 2, (puzzleCanvas.height / 2) + 6);
  }

  /* TODO: define '1' in const as  offsetToFirstIndex */
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

    this.domElements.difficultSelect.selectedIndex = this.gameDifficult - 1;
    this.domElements.levelSelect.selectedIndex = this.gameLevel - 1;
  }

  checkAutospeechTipBtn() {
    if (this.domElements.tipAutospeech.classList.contains('user-tool__button-speaker--active')) {
      this.tipAutospeech = true;
    } else {
      this.tipAutospeech = false;
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

  /* TODO: define magic numbers in constants */
  nextRound() {
    if ((this.gameLevel === 60) && (this.gameDifficult === 6)) {
      this.gameLevel = 1;
      this.gameDifficult = 1;
      if (this.onDifficultChange !== null) {
        this.onDifficultChange(this.gameDifficult, this.gameLevel);
      }
    } else if (this.gameLevel === 60) {
      this.gameLevel = 1;
      this.gameDifficult += 1;
      if (this.onDifficultChange !== null) {
        this.onDifficultChange(this.gameDifficult, this.gameLevel);
      }
    } else {
      this.gameLevel += 1;
      if (this.onLevelChange !== null) {
        this.onLevelChange(this.gameLevel);
      }
    }
  }

  /* TODO: define magic numbers in constants */
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
          borderColor = CONSTANTS.CANVAS_BORDER_COLOR.RED;
          mistakes += 1;
        } else {
          el.classList.add('ep-rightPosition');
          borderColor = CONSTANTS.CANVAS_BORDER_COLOR.GREEN;
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
        this.domElements.resultsBtn.classList.add('ep-hidden');
        this.nextRound();
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

      sentencesArr.forEach((el, id) => {
        const modalMainLine = document.createElement('div');
        const modalAudioBtn = document.createElement('div');
        const modalMainSentenceBlock = document.createElement('div');
        modalMainLine.classList.add('ep-modal__main-line');
        modalAudioBtn.classList.add('ep-modal__audioBtn');
        /* TODO change to event delegation */
        const newAudio = new Audio();
        newAudio.src = this.audioModel.audioArr[id];
        modalAudioBtn.append(newAudio);
        modalAudioBtn.addEventListener('click', () => {
          newAudio.play();
        });
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
        this.nextRound();
      });
    });

    this.domElements.tipSpeech.addEventListener('click', () => {
      if (this.currentSentence < 10) {
        if (this.audio.paused) {
          this.playAudio();
        } else {
          this.domElements.tipSpeech.classList.remove('speech-animation');
          this.audio.pause();
          this.audio.currentTime = 0.0;
        }
      }
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

    this.domElements.difficultSelect.addEventListener('change', () => {
      this.currentSentence = 0;
      this.gameDifficult = this.domElements.difficultSelect.selectedIndex + 1;
      if (this.onDifficultChange !== null) {
        this.onDifficultChange(this.gameDifficult);
      }
    });

    this.domElements.levelSelect.addEventListener('change', () => {
      this.currentSentence = 0;
      this.gameLevel = this.domElements.levelSelect.selectedIndex + 1;
      if (this.onLevelChange !== null) {
        this.onLevelChange(this.gameLevel);
      }
    });

    this.domElements.closeButton.addEventListener('click', () => {
      document.body.classList.remove('ep-background');
      this.mainView.renderMain(this.user);
    });
  }

  playAudio() {
    this.domElements.tipSpeech.classList.add('speech-animation');
    this.audio.addEventListener('ended', this.onAudioPlayEnded);
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(() => {});
    }
  }

  AudioPlayEnded() {
    this.domElements.tipSpeech.classList.remove('speech-animation');
    this.audio.removeEventListener('ended', this.onAudioPlayEnded);
  }
}
