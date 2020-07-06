import GroupRoundView from '../savannah-game/Views/groupRoundView';
import SavannahView from '../savannah-game/Views/View';
import setNewStyles from './utils/setNewStyles';
import getLevel from '../utils/getLevel';
import getRound from '../utils/getRound';
import { DELAY_PRELOADER_COUNT_DOWN } from '../savannah-game/constSavannah';
import {
  GAME_LAYOUT,
  GROUP_ROUND,
  PRELOADER_INFO,
  WORD_SEARCH_TITLE,
  WORD_SEARCH_CONTENT,
  ROWS,
  WORDS_CONTAINER,
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

  getViewUser(user, mainView) {
    this.currentUser = user;
    this.mainView = mainView;
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
    this.renderRating();
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
    this.removeAppContent();
    this.renderTitle();
    this.renderContent();
    this.renderRows();
    this.renderWordsContainer();
    this.matrixObj = this.model.getObjectOfMatrixWord();
    this.renderWord();
    this.renderMatrixWord(this.matrixObj.matrix);
    // this.getDynamicHeight();
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
    const wordsContainer = document.createElement('div');
    wordsContainer.className = 'word-search__words-container';
    wordsContainer.innerHTML = WORDS_CONTAINER;
    this.gameField.appendChild(wordsContainer);
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
          console.log('game mode');
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

  /*  getDynamicHeight = () => {
    const content = document.querySelector('.word-search__content');
    const contentWidth = content.offsetWidth;
    content.style.height = `${contentWidth}px`;
  } */
}

export default WordSearchView;
