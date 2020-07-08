import GroupRoundView from '../savannah-game/Views/groupRoundView';
import SavannahView from '../savannah-game/Views/View';
import setNewStyles from './utils/setNewStyles';
import getLevel from '../utils/getLevel';
import getRound from '../utils/getRound';
import removeStyle from '../utils/removeStyle';
import addStyle from '../utils/addStyle';
import addEventHandler from '../utils/addEventHandler';
import setFocus from '../utils/setFocus';
import { DELAY_PRELOADER_COUNT_DOWN } from '../savannah-game/constSavannah';
import {
  GAME_LAYOUT,
  GROUP_ROUND,
  PRELOADER_INFO,
  WORD_SEARCH_TITLE,
  WORD_SEARCH_CONTENT,
  ROWS,
  WORDS_CONTAINER,
  CLEAR_BTN_TEXT,
  CHECK_BTN_TEXT,
} from './constants';

class WordSearchView extends SavannahView {
  constructor(model, defaultHash) {
    super();
    this.model = model;
    this.setDefaultHash = defaultHash;
    this.WordSearchLayout = GAME_LAYOUT;
    this.mainContainer = document.querySelector('.main');
    this.appContainer = document.querySelector('.word-search__app');
    this.groupRoundHtml = GROUP_ROUND;
  }

  init() {
    this.renderStartPage();
    this.getAppElements();
    this.addListeners();
  }

  getAppElements() {
    this.closeBtn = document.querySelector('.close');
    this.cancelBtn = document.querySelector('.app__modal__box_cancel');
    this.backToMainBtn = document.querySelector('.word-search_close');
    this.starsLevel = document.querySelector('.rating__group');
    this.starsRound = document.querySelector('.rating__round');
  }

  renderStartPage() {
    this.mainContainer.innerHTML = this.WordSearchLayout;
    this.appContainer = document.querySelector('.word-search__app');
    this.appContainer.classList.add('word-search__background');
    this.gameStatistics.init(this, this.mainView, this.model, this.setDefaultHash);
    this.renderRating();
    setFocus(document.querySelector('.app__button'));
  }

  renderRating() {
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.groupRoundView.init();
    setNewStyles();
  }

  addListeners() {
    this.openModal();
    this.closeModal();
    this.backToMainPage();
    getLevel(this.starsLevel, this, this.model);
    getRound(this.starsRound, this);
    this.clickStartGameBtn();
    this.continuePlaying();
  }

  backToMainPage() {
    this.backToMainBtn.addEventListener('click', () => {
      this.setDefaultHash();
      this.finishGame();
      this.mainView.renderMain(this.currentUser);
    });
  }

  clickStartGameBtn() {
    const startBtn = document.querySelector('.word-search__start-btn');

    startBtn.addEventListener('click', () => {
      const chosenLevel = this.level;
      const chosenRound = this.round;
      if (this.model.audioOn) {
        this.roundStartsSound.play();
      }

      this.addPreloader();
      this.changePreloaderInfo();
      setTimeout(() => { this.preloaderCountDown(); }, DELAY_PRELOADER_COUNT_DOWN);
      this.model.fetchWords(this.currentUser, chosenLevel, chosenRound)
        .then((data) => {
          this.model.getWordsAndTranslation(data);
          this.model.getWordIdsAndAudio(data);
          this.model.getGameData();
        });
    });
  }

  changePreloaderInfo = () => {
    document.querySelector('.keyboard').classList.add('word-search_hide');
    document.querySelector('.preloader__info_text').innerHTML = PRELOADER_INFO;
  }

  countTillOne() {
    let preloaderNumber = Number(document.querySelector('.countdown').innerHTML);

    if (preloaderNumber > 0) {
      preloaderNumber -= 1;
    }

    if (preloaderNumber < 1) {
      console.log('eng words', this.model.wordsArr);
      console.log('translations', this.model.translation);
      this.renderPlayingField();
    }

    return preloaderNumber;
  }

  renderPlayingField() {
    this.wordSearchContainer = document.createElement('div');
    this.wordSearchContainer.classList.add('word-search__container');
    this.appContainer.appendChild(this.wordSearchContainer);
    this.controllersContainer = document.createElement('div');
    this.controllersContainer.classList.add('controllers-container');
    this.renderHeader();
    this.changeLivesStyle();
    this.removeAppContent();
    this.renderTitle();
    this.renderContent();
    this.renderRows();
    this.renderWordsContainer();
    this.matrixObj = this.model.getObjectOfMatrixWord();
    this.renderWord();
    this.renderMatrixWord(this.matrixObj.matrix);
    this.renderCheckBtn();
    this.renderClearBtn();
    this.renderFinishImg();
  }

  changeLivesStyle = () => {
    document.querySelector('.lives').classList.add('word-search__lives');
  }

  removeAppContent() {
    const content = document.querySelector('.word-search__start-content');
    this.appContainer.removeChild(content);
  }

  renderTitle() {
    const wordSearchTitle = document.createElement('h1');
    wordSearchTitle.classList.add('word-search__title');
    wordSearchTitle.innerHTML = WORD_SEARCH_TITLE;
    this.wordSearchContainer.appendChild(wordSearchTitle);
  }

  renderContent() {
    this.gameField = document.createElement('div');
    this.gameField.classList.add('game-field');
    const wordSearchContent = document.createElement('div');
    wordSearchContent.classList.add('word-search__content');
    wordSearchContent.innerHTML = WORD_SEARCH_CONTENT;
    this.gameField.appendChild(wordSearchContent);
    this.wordSearchContainer.appendChild(this.gameField);
  }

  renderRows = () => {
    document.querySelector('.word-search-grid').innerHTML = ROWS;
  }

  renderWordsContainer() {
    this.wordsContainer = document.createElement('div');
    this.wordsContainer.className = 'word-search__words-container';
    this.wordsContainer.innerHTML = WORDS_CONTAINER;
    this.wordsContainer.appendChild(this.controllersContainer);
    this.gameField.appendChild(this.wordsContainer);
  }

  renderWord = () => {
    this.model.tenTranslationsArray
      .map((translation) => {
        const word = document.createElement('li');
        word.classList.add('word');
        word.innerHTML = translation;
        document.querySelector('.word-search__words').appendChild(word);

        return true;
      });
  }

  preloaderCountDown() {
    if (this.model.isPreloading) {
      const activeMenu = document.querySelector('.burger-menu').classList.contains('burger-menu--active');
      const visibleModal = document.querySelector('.app__modal').classList.contains('app__modal_visible');
      const settingsVisible = document.querySelector('.settings__overlay');

      if (!activeMenu && !visibleModal && !settingsVisible) {
        this.countNumber = this.countTillOne();

        if (this.countNumber) {
          document.querySelector('.countdown').innerHTML = this.countNumber;
          setTimeout(() => { this.preloaderCountDown(); }, DELAY_PRELOADER_COUNT_DOWN);
        } else {
          this.gameMode();
        }
      } else {
        setTimeout(() => { this.preloaderCountDown(); }, DELAY_PRELOADER_COUNT_DOWN);
      }
    }
  }

  renderCell = (letter, rowNum) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = letter;
    document.querySelector(`.row-${rowNum}`).appendChild(cell);
  }

  renderMatrixWord(matrix) {
    matrix.map((arr, index) => {
      arr.map((letter) => this.renderCell(letter, index));

      return true;
    });
  }

  renderCheckBtn() {
    this.checkBtn = document.createElement('div');
    this.checkBtn.className = ('app__button');
    this.checkBtn.classList.add('word-search__controllers');
    this.checkBtn.classList.add('check');
    this.checkBtn.innerHTML = CHECK_BTN_TEXT;
    this.controllersContainer.appendChild(this.checkBtn);
  }

  renderClearBtn() {
    this.clearBtn = document.createElement('div');
    this.clearBtn.className = ('app__button');
    this.clearBtn.classList.add('word-search__controllers');
    this.clearBtn.classList.add('clear');
    this.clearBtn.innerHTML = CLEAR_BTN_TEXT;
    this.controllersContainer.appendChild(this.clearBtn);
  }

  renderFinishImg() {
    this.finishImg = document.createElement('div');
    this.finishImg.classList.add('finish-icon');
    document.querySelector('.app__header').appendChild(this.finishImg);
  }

  gameMode() {
    this.addGameModeListeners();
  }

  addGameModeListeners() {
    const wordsBox = document.querySelector('.word-search-grid');
    addEventHandler('click', wordsBox, this.onLetterClick.bind(this));
    addEventHandler('click', this.clearBtn, this.onClearBtnClick.bind(this));
    addEventHandler('click', this.checkBtn, this.onCheckBtnClick.bind(this));
  }

  onLetterClick = ({ target }) => {
    const chosenLetter = target.classList.contains('word-search__chosen-letter');
    const correctWord = target.classList.contains('word-search__correct-word');

    if (target.classList.contains('cell')) {
      if (!chosenLetter && !correctWord) {
        target.classList.add('word-search__chosen-letter');
        this.model.chosenWord.push(target.textContent.toLowerCase());
        console.log(this.model.chosenWord);
      }
    }
  }

  onCheckBtnClick() {
    if (this.model.chosenWord.length > 0) {
      this.allCells = Array.from(document.querySelectorAll('.cell'));

      if (this.matrixObj.words.includes(this.model.chosenWord.join(''))) {
        this.correctWordActions();
      } else {
        this.wrongWordActions();
      }
    }
  }

  correctWordActions() {
    console.log('includes');
    this.correctSound.play();
    this.model.chosenWord = [];
    this.allCells.map((cell) => {
      addStyle(cell, 'word-search__chosen-letter', 'word-search__correct-word');
      removeStyle(cell, 'word-search__chosen-letter');

      return true;
    });
  }

  wrongWordActions() {
    console.log('wrong');
    this.model.wrongAnswerCounter += 1;
    console.log(this.model.wrongAnswerCounter);
    this.removeLives();
    this.errorSound.play();
    this.allCells.map((cell) => {
      addStyle(cell, 'word-search__chosen-letter', 'word-search__wrong-word');
      setTimeout(() => {
        removeStyle(cell, 'word-search__wrong-word');
      }, 500);

      return true;
    });
    this.onClearBtnClick();
    this.model.chosenWord = [];
  }

  onClearBtnClick = () => {
    this.allCells.map((cell) => removeStyle(cell, 'word-search__chosen-letter'));
    this.model.chosenWord = [];
  }

  renderGameOver(isWin) {
    this.incorrectWordsIdArr = this.model.incorrectWordsId;
    document.querySelector('.statistics__container').classList.remove('hidden');
    document.querySelector('.statistics__container').classList.add('flex');
    document.querySelector('.word-search__app').removeChild(this.wordSearchContainer);
    this.gameStatistics.renderWrongAnswersTitle();
    this.gameStatistics.renderCorrectAnswerTitle();

    if (isWin) {
      this.gameStatistics.winRound();
    } else {
      this.gameStatistics.loseRound();
    }
  }

  continuePlaying() {
    if (document.querySelector('.statistics__continue')) {
      document.querySelector('.statistics__continue').addEventListener('click', () => {
        this.init();
        this.model.setDefault();
      });
    }
  }

  finishGame() {
    this.model.isGameOn = false;
    this.model.isPreloading = false;
    this.appContainer.classList.remove('app__background');
  }
}

export default WordSearchView;
