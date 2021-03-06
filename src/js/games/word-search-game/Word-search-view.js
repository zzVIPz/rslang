import GroupRoundView from '../savannah-game/Views/groupRoundView';
import SavannahView from '../savannah-game/Views/View';
import setNewStyles from './utils/setNewStyles';
import getLevel from '../utils/getLevel';
import getRound from '../utils/getRound';
import removeStyle from '../utils/removeStyle';
import addStyle from '../utils/addStyle';
import { HASH_VALUES } from '../../constants/constMainView';
import addEventHandler from '../utils/addEventHandler';
import setFocus from '../utils/setFocus';
import WordSearchStatistics from './Views/Word-search-statistic-view';
import { DELAY_PRELOADER_COUNT_DOWN } from '../savannah-game/constSavannah';
import getMediaUrl from '../../utils/getMediaUrl';
import playAudio from '../utils/playAudio';
import getIndexOfArr from '../utils/indexOfArrInArr';
import compareArrayOfArrays from '../utils/compareArrayOfArrays';
import GLOBAL from '../../constants/global';
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
  DELAY_CHECK_HASH,
  REMOVE_STYLE_DELAY,
  REMOVE_HINT_STYLE_DELAY,
  CHECK_CHOSEN_LETTER_STYLE_DELAY,
} from './constants';

class WordSearchView extends SavannahView {
  constructor(model, defaultHash, currentHash, parseLearningWords, stat) {
    super();
    this.currentHash = currentHash;
    this.parseLearningWords = parseLearningWords;
    this.stats = stat;
    this.model = model;
    this.statistics = new WordSearchStatistics();
    this.setDefaultHash = defaultHash;
    this.WordSearchLayout = GAME_LAYOUT;
    this.mainContainer = document.querySelector('.main');
    this.appContainer = document.querySelector('.word-search__app');
    this.groupRoundHtml = GROUP_ROUND;
    this.rightAnswersElements = [];
  }

  checkWordSearchWindow() {
    this.changePositionAccordingToClientHeight();

    if (!(this.currentHash() === HASH_VALUES.wordSearch)) {
      this.finishGame();
      this.wordSearchApp = document.querySelector('.word-search__app');

      if (this.wordSearchApp) {
        this.mainContainer.removeChild(this.wordSearchApp);
      }
    } else {
      setTimeout(() => {
        this.checkWordSearchWindow();
      }, DELAY_CHECK_HASH);
    }
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
    setFocus(document.querySelector('.app__button'));
    this.setMusicOnOff();
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
      setTimeout(() => {
        this.preloaderCountDown();
      }, DELAY_PRELOADER_COUNT_DOWN);
      this.model.fetchWords(this.currentUser, chosenLevel, chosenRound).then((data) => {
        this.model.getWordsAndTranslation(data);
        this.model.getWordIdsAndAudio(data);
        this.model.getGameData();
      });
      this.stats.gameStartsStat(GLOBAL.STAT_GAME_NAMES.wordSearch);
    });
  }

  changePreloaderInfo = () => {
    document.querySelector('.keyboard').classList.add('word-search_hide');
    document.querySelector('.preloader__info_text').innerHTML = PRELOADER_INFO;
  };

  countTillOne() {
    let preloaderNumber = Number(document.querySelector('.countdown').innerHTML);

    if (preloaderNumber > 0) {
      preloaderNumber -= 1;
    }

    if (preloaderNumber < 1) {
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
    this.renderWord();
    this.renderMatrixWord(this.model.matrixObj.matrix);
    this.renderCheckBtn();
    this.renderClearBtn();
  }

  renderHeader() {
    const livesBox = this.renderLives();

    this.appHeader = document.querySelector('.app__header');
    this.appHeader.appendChild(livesBox);

    return this.appHeader;
  }

  changeLivesStyle = () => {
    document.querySelector('.lives').classList.add('word-search__lives');
  };

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
  };

  renderWordsContainer() {
    this.wordsContainer = document.createElement('div');
    this.wordsContainer.className = 'word-search__words-container';
    this.wordsContainer.innerHTML = WORDS_CONTAINER;
    this.wordsContainer.appendChild(this.controllersContainer);
    this.gameField.appendChild(this.wordsContainer);
  }

  renderWord = () => {
    this.model.tenTranslationsArray.map((translation) => {
      const word = document.createElement('li');
      word.classList.add('word');
      word.innerHTML = translation;
      document.querySelector('.word-search__words').appendChild(word);

      return true;
    });
  };

  preloaderCountDown() {
    if (this.model.isPreloading) {
      const activeMenu = document
        .querySelector('.burger-menu')
        .classList.contains('burger-menu--active');
      const visibleModal = document
        .querySelector('.app__modal')
        .classList.contains('app__modal_visible');
      const settingsVisible = document.querySelector('.settings__overlay');

      if (!activeMenu && !visibleModal && !settingsVisible) {
        this.countNumber = this.countTillOne();

        if (this.countNumber) {
          document.querySelector('.countdown').innerHTML = this.countNumber;
          setTimeout(() => {
            this.preloaderCountDown();
          }, DELAY_PRELOADER_COUNT_DOWN);
        } else {
          this.gameMode();
        }
      } else {
        setTimeout(() => {
          this.preloaderCountDown();
        }, DELAY_PRELOADER_COUNT_DOWN);
      }
    }
  }

  renderCell = (letter, rowNum, colNum) => {
    const cell = document.createElement('div');

    cell.className = 'cell';
    cell.id = `${rowNum}-${colNum}`;
    cell.innerHTML = letter;
    document.querySelector(`.row-${rowNum}`).appendChild(cell);
  };

  renderMatrixWord(matrix) {
    matrix.map((arr, rowIndex) => {
      arr.map((letter, colIndex) => this.renderCell(letter, rowIndex, colIndex));

      return true;
    });
  }

  renderCheckBtn() {
    this.checkBtn = document.createElement('button');
    this.checkBtn.className = 'app__button';
    this.checkBtn.classList.add('word-search__controllers');
    this.checkBtn.classList.add('word-search__controllers_check');
    this.checkBtn.innerHTML = CHECK_BTN_TEXT;
    this.disableBtn(this.checkBtn);
    this.controllersContainer.appendChild(this.checkBtn);
  }

  renderClearBtn() {
    this.clearBtn = document.createElement('button');
    this.clearBtn.className = 'app__button';
    this.clearBtn.classList.add('word-search__controllers');
    this.clearBtn.classList.add('word-search__controllers_clear');
    this.clearBtn.innerHTML = CLEAR_BTN_TEXT;
    this.disableBtn(this.clearBtn);
    this.controllersContainer.appendChild(this.clearBtn);
  }

  disableBtn = (el) => {
    const element = el;

    if (!element.classList.contains('word-search__disabled')) {
      element.classList.add('word-search__disabled');
      element.disabled = true;
    }
  }

  activateBtn = (el) => {
    const element = el;
    if (element.classList.contains('word-search__disabled')) {
      element.classList.remove('word-search__disabled');
      element.disabled = false;
    }
  }

  gameMode() {
    this.addGameModeListeners();
    this.isChosenLetterStyle();
  }

  addGameModeListeners() {
    this.wordsBox = document.querySelector('.word-search-grid');
    const translationsWords = document.querySelector('.word-search__words');

    addEventHandler('mousedown', this.wordsBox, this.onMouseDown.bind(this));
    addEventHandler('mouseup', this.wordsBox, this.onMouseUp.bind(this));
    addEventHandler('mouseover', this.wordsBox, this.onMouseOver.bind(this));
    addEventHandler('click', this.clearBtn, this.onClearBtnClick.bind(this));
    addEventHandler('click', this.checkBtn, this.onCheckBtnClick.bind(this));
    addEventHandler('click', translationsWords, this.onTranslationClick.bind(this));
  }

  isChosenLetterStyle() {
    let notActivated = true;
    const allCells = document.querySelectorAll('.cell');

    allCells.forEach((el) => {
      if (notActivated) {
        if (el.classList.contains('word-search__chosen-letter')) {
          this.activateBtn(this.clearBtn);
          this.activateBtn(this.checkBtn);
          notActivated = false;
        } else {
          this.disableBtn(this.clearBtn);
          this.disableBtn(this.checkBtn);
        }
      }
    });

    setTimeout(() => { this.isChosenLetterStyle(); }, CHECK_CHOSEN_LETTER_STYLE_DELAY);
  }

  newLetter(target) {
    this.saveLetterCoords(target);
    target.classList.add('word-search__chosen-letter');
    this.model.chosenWord.push(target.textContent.toLowerCase());
  }

  onMouseDown = ({ target }) => {
    this.clicked = true;
    this.chosenLetter = target.classList.contains('word-search__chosen-letter');
    this.correctWord = target.classList.contains('word-search__correct-word');

    if (target.classList.contains('cell')) {
      if (!this.chosenLetter && !this.correctWord) {
        this.newLetter(target);
      } else {
        this.onSecondLetterClick(target);
      }
    }
  };

  onMouseOver = ({ target }) => {
    if (this.clicked) {
      if (target.classList.contains('cell')) {
        if (!this.chosenLetter && !this.correctWord) {
          this.newLetter(target);
        }
      }
    }
  };

  onMouseUp = () => {
    this.clicked = false;
  };

  onSecondLetterClick(target) {
    if (target.classList.contains('word-search__chosen-letter')) {
      target.classList.remove('word-search__chosen-letter');
      const id = getIndexOfArr(this.model.wordCoordinates, this.getLetterCoords(target));
      this.model.chosenWord.splice(id, 1);
      this.model.wordCoordinates.splice(id, 1);
    }
  }

  saveLetterCoords(target) {
    const letterCoords = this.getLetterCoords(target);
    this.model.wordCoordinates.push(letterCoords);
  }

  getLetterCoords = (target) => {
    let letterCoords = target.id.split('-');
    letterCoords = letterCoords.map((coo) => Number(coo));

    return letterCoords;
  };

  onCheckBtnClick() {
    let isRightAnswer = false;
    let isRightLetters = false;

    if (this.model.chosenWord.length > 0) {
      this.chosenWordString = this.model.chosenWord.join('');
      this.allCells = document.querySelectorAll('.cell');

      const { chosenWordTranslation, chosenWordAudio } = this.model.getChosenWordData(
        this.chosenWordString,
      );
      this.currentTranslation = chosenWordTranslation;
      this.currentAudio = chosenWordAudio;

      this.model.tenEngWordsArr = this.model.tenEngWordsArr.map((el) => el.toLowerCase());
      this.currentWordIdInArr = this.model.tenEngWordsArr.indexOf(this.chosenWordString);

      if (this.currentWordIdInArr !== -1) {
        isRightLetters = true;
        const currentCoordsArr = this.model.matrixObj.coords[this.currentWordIdInArr];
        isRightAnswer = compareArrayOfArrays(currentCoordsArr, this.model.wordCoordinates);
      }

      if (isRightAnswer) {
        this.correctWordActions();
        this.removeElementFromArr();
        this.allWordsFound();
      } else {
        this.wrongWordActions(isRightLetters);
      }
    }
  }

  removeElementFromArr() {
    this.model.tenEngWordsArr.splice(this.currentWordIdInArr, 1);
    this.model.tenTranslationsArray.splice(this.currentWordIdInArr, 1);
    this.model.tenAudioArray.splice(this.currentWordIdInArr, 1);
    this.model.tenWordsId.splice(this.currentWordIdInArr, 1);
    this.model.matrixObj.coords.splice(this.currentWordIdInArr, 1);
  }

  correctWordActions() {
    this.model.rightAnswersCounter += 1;
    const engWordSound = getMediaUrl(this.currentAudio);

    this.addStylesToCorrectTranslation();

    if (this.model.audioOn) {
      this.correctSound.play();
      playAudio(engWordSound);
    }

    this.model.setDefaultArray();
    this.allCells.forEach((cell) => {
      addStyle(cell, 'word-search__chosen-letter', 'word-search__correct-word');
      addStyle(
        cell,
        'word-search__chosen-letter',
        `correct-word-${this.model.rightAnswersCounter}`,
      );
      removeStyle(cell, 'word-search__chosen-letter');
    });

    this.rightAnswersElements.push({
      word: this.chosenWordString,
      translation: this.currentTranslation,
      audio: this.currentAudio,
    });
  }

  wrongWordActions(isRightLetters) {
    if (!isRightLetters) {
      this.model.wrongAnswerCounter += 1;
      this.removeLives();
    }
    if (this.model.audioOn) {
      this.errorSound.play();
    }

    this.allCells.forEach((cell) => {
      addStyle(cell, 'word-search__chosen-letter', 'word-search__wrong-word');
      setTimeout(() => {
        removeStyle(cell, 'word-search__wrong-word');
      }, REMOVE_STYLE_DELAY);
    });

    this.onClearBtnClick();
    this.model.setDefaultArray();
  }

  /* removeLives() {
    super.removeLives();
    this.renderGameOver(false);
  } */

  addStylesToCorrectTranslation() {
    this.allTranslations = document.querySelectorAll('.word');
    this.allTranslations.forEach((tran) => {
      if (tran.textContent === this.currentTranslation) {
        tran.classList.add('word-search__correct-translation');
      }
    });
  }

  onClearBtnClick = () => {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => removeStyle(cell, 'word-search__chosen-letter'));
    this.model.setDefaultArray();
  };

  renderGameOver(isWin) {
    this.statistics.init(this, this.mainView, this.model, this.setDefaultHash);
    this.statistics.changeClassName();
    this.addNotGuessedWordToWrongWords();
    this.addGuessedWords();
    this.continuePlaying();

    document.querySelectorAll('.wordBox')
      .forEach((el) => el.classList.add('word-search__word-box'));

    this.incorrectWordsIdArr = this.model.tenWordsId;
    this.parseLearningWords(this.incorrectWordsIdArr);

    document.querySelector('.statistics__container').classList.remove('hidden');
    document.querySelector('.statistics__container').classList.add('flex');
    document.querySelector('.word-search__app').removeChild(this.wordSearchContainer);
    this.statistics.renderWrongAnswersTitle();
    this.statistics.renderCorrectAnswerTitle();

    if (isWin) {
      this.statistics.winRound();
    } else {
      this.statistics.loseRound();
    }

    document.querySelector('.wrong_title').classList.add('word-search__wrong_title');
    document.querySelector('.correct_title').classList.add('word-search__correct_title');
    document.querySelectorAll('.soundBox')
      .forEach((el) => el.classList.add('word-search__sound-box'));
    this.rightAnswersElements = [];
  }

  addNotGuessedWordToWrongWords() {
    if (this.model.tenEngWordsArr.length) {
      this.model.tenEngWordsArr.map((word, index) => {
        this.statistics.appendWrongAnswer(
          word,
          this.model.tenTranslationsArray[index],
          this.model.tenAudioArray[index],
        );

        return true;
      });
    }
  }

  addGuessedWords() {
    this.rightAnswersElements.map((obj) => {
      this.statistics.appendCorrectAnswer(
        obj.word,
        obj.translation,
        obj.audio,
      );

      return true;
    });
  }

  allWordsFound() {
    if (!this.model.tenEngWordsArr.length) {
      this.renderGameOver(true);
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

  onTranslationClick = ({ target }) => {
    if (target.classList.contains('word')) {
      const translationId = this.model.tenTranslationsArray.indexOf(target.textContent);
      const firstLetterCoords = this.model.matrixObj.coords[translationId][0];
      const firstLetterId = firstLetterCoords.join('-');
      const firstLetterHint = document.getElementById(firstLetterId);
      firstLetterHint.classList.add('word-search__hint');
      setTimeout(() => {
        firstLetterHint.classList.remove('word-search__hint');
      }, REMOVE_HINT_STYLE_DELAY);
    }
  };
}

export default WordSearchView;
