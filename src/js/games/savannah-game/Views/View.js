import getLevel from '../../utils/getLevel';
import getRound from '../../utils/getRound';
import GroupRoundView from './groupRoundView';
import GameStatistics from './gameStatView';
import setFocus from '../../utils/setFocus';
import getMediaURL from '../../../utils/getMediaUrl';
import { STATISTICS_MODAL_LAYOUT } from '../../utils/statisticsModalConst';
import { HASH_VALUES } from '../../../constants/constMainView';
import GLOBAL from '../../../constants/global';
import SpeechRecognitionClass from '../../utils/speechRecognition';
import {
  GAME_LAYOUT,
  PRELOADER,
  LIVES,
  SPARKLES,
  GROUP_ROUND,
  CORRECT_SOUND,
  ERROR_SOUND,
  ROUND_STARTS_SOUND,
  DELAY_CHECK_HASH,
  DELAY_PRELOADER_COUNT_DOWN,
  DELAY_MUSIC_OFF,
  DELAY_NEXT_WORD,
  START_FLYING_POSITION,
  START_BANG_POSITION,
  FINAL_BANG_POSITION,
  BACKGROUND_MOVE_PX,
  DELAY_HIGHLIGHT,
  MARGIN_PERCENTAGE,
  BASE_MARGIN,
  NUMBER_OF_LIVES,
  MOVING_WORD_INTERVAL,
  BANG_MOVE_PX,
  MICROPHONE,
} from '../constSavannah';

class SavannahView {
  constructor(model, defaultHash, currentHash, parseLearningWords, stat) {
    this.model = model;
    this.parseLearningWords = parseLearningWords;
    this.stats = stat;
    this.currentHash = currentHash;
    this.setDefaultHash = defaultHash;
    this.savannahGame = GAME_LAYOUT;
    this.preloader = PRELOADER;
    this.groupRoundHtml = GROUP_ROUND;
    this.correctSound = new Audio(getMediaURL(CORRECT_SOUND));
    this.errorSound = new Audio(getMediaURL(ERROR_SOUND));
    this.roundStartsSound = new Audio(getMediaURL(ROUND_STARTS_SOUND));
    this.gameStatistics = new GameStatistics();
    this.recognitionObj = new SpeechRecognitionClass(this.model, this);
    this.statisticsLayout = STATISTICS_MODAL_LAYOUT;
    this.mainContainer = document.querySelector('.main');
    this.flyingWordBox = document.createElement('div');
    this.translationBox = document.createElement('div');
    this.crystalBox = document.createElement('div');
    this.sparklesBox = document.createElement('div');
    this.muteLine = document.createElement('div');
    this.bang = document.createElement('div');
    this.marginTop = document.documentElement.clientHeight * MARGIN_PERCENTAGE;
  }

  checkSavannahWindow() {
    this.changePositionAccordingToClientHeight();

    if (!(this.currentHash() === HASH_VALUES.savannah)) {
      this.finishGame();
      this.savannahContainer = document.querySelector('.savannah__app');

      if (this.savannahContainer) {
        this.mainContainer.removeChild(this.savannahContainer);
      }
    } else {
      setTimeout(() => { this.checkSavannahWindow(); }, DELAY_CHECK_HASH / 2);
    }
  }

  getViewUser(user, mainView) {
    this.currentUser = user;
    this.mainView = mainView;
  }

  renderSavannah() {
    this.mainContainer.innerHTML = this.renderGameLayout();
    this.appContainer = document.querySelector('.app');
    this.appContainer.classList.add('app__background');
    this.appContainer.style.backgroundPositionY = '100%';
    this.renderRating();
    this.addListeners();
    this.setMusicOnOff();
    this.gameStatistics.init(this, this.mainView, this.model, this.setDefaultHash);
    setFocus(document.querySelector('.app__button'));
  }

  addListeners() {
    this.closeBtn = document.querySelector('.close');
    this.cancelBtn = document.querySelector('.app__modal__box_cancel');
    this.backToMainBtn = document.querySelector('.app__button_close');
    this.startBtn = document.querySelector('.app__button');
    this.rating = document.querySelectorAll('.rating__input');
    this.stars = document.querySelector('.rating__group');
    this.starsRound = document.querySelector('.rating__round');
    this.openModal();
    this.closeModal();
    this.backToMainPage();
    getLevel(this.stars, this, this.model);
    getRound(this.starsRound, this);
    this.clickStartGameBtn();
  }

  openModal() {
    this.closeBtn.addEventListener('click', () => {
      clearInterval(this.id);
      this.displayModal();
    });
  }

  closeModal() {
    this.cancelBtn.addEventListener('click', () => {
      this.hideModal();

      if (document.querySelector('.flying-word')) {
        this.moveWord();
      }
    });
  }

  backToMainPage() {
    this.backToMainBtn.addEventListener('click', () => {
      this.setDefaultHash();
      this.finishGame();
      this.mainView.renderMain(this.currentUser);
    });
  }

  clickStartGameBtn() {
    this.startBtn.addEventListener('click', () => {
      if (this.model.audioOn) {
        this.roundStartsSound.play();
      }
      window.removeEventListener('keyup', this.onKeyUp);
      this.chosenLevel = this.level;
      this.chosenRound = this.round;
      this.addPreloader();
      setTimeout(() => { this.preloaderCountDown(); }, DELAY_PRELOADER_COUNT_DOWN);
      this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
        .then((data) => {
          this.model.getWordsAndTranslation(data);
          this.model.getWordIdsAndAudio(data);
        });
      this.stats.gameStartsStat(GLOBAL.STAT_GAME_NAMES.savannah);
    });
  }

  addPreloader() {
    this.model.isPreloading = true;
    this.appContent = document.querySelector('.app__content');
    document.querySelector('.app').removeChild(document.querySelector('.rating__container'));
    this.appContent.innerHTML = this.renderPreloader();
    this.renderLevel();
  }

  renderLevel() {
    this.levelBox = document.querySelector('.current-level');
    this.levelBox.innerHTML = `Уровень: ${this.model.levelNumForUser}`;
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

  gameMode() {
    if (this.countNumber < 1) {
      this.clickTranslation();
      this.addKeyUpListener();
    }
  }

  checkRightTranslation(translationEl) {
    this.model.isWordClicked = true;

    const rightAnswer = true;
    const wrongAnswer = false;

    if (translationEl) {
      const answer = (translationEl.textContent).replace(this.model.removeDigitsRegExp, '');
      const result = this.model.isRightTranslation(answer);

      this.model.getCurrentAudioUrl();

      if (result === rightAnswer) {
        if (this.model.audioOn) {
          this.correctSound.play();
        }

        this.rightTranslationActions(translationEl, rightAnswer);
      } else {
        if (this.model.audioOn) {
          this.errorSound.play();
        }

        this.wrongTranslationActions(translationEl, wrongAnswer, rightAnswer);
      }

      setTimeout(() => { this.nextWord(); }, DELAY_NEXT_WORD);
    }
  }

  rightTranslationActions(translationEl, rightAnswer) {
    this.moveBackground();
    this.resizeCrystal();
    this.highlightAnswer(translationEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');
    this.bangOnRightAnswer();

    setTimeout(() => { this.removeHighlight(translationEl, rightAnswer); }, DELAY_HIGHLIGHT);
    this.gameStatistics.appendCorrectAnswer(this.randomEngWord,
      this.model.correctAnswer, this.model.currentWordAudio);
  }

  wrongTranslationActions(translationEl, wrongAnswer, rightAnswer) {
    this.model.incorrectWordsId.push(this.model.currentWordId);
    this.correctHTMLEl = this.findCorrectAnswerHTMLel();
    this.highlightAnswer(translationEl, wrongAnswer);
    this.highlightAnswer(this.correctHTMLEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');

    setTimeout(() => { this.removeHighlight(translationEl, wrongAnswer); }, DELAY_HIGHLIGHT);
    setTimeout(() => { this.removeHighlight(this.correctHTMLEl, rightAnswer); }, DELAY_HIGHLIGHT);
    this.removeLives(this.model.wrongAnswerCounter);

    this.gameStatistics.appendWrongAnswer(this.randomEngWord,
      this.model.correctAnswer, this.model.currentWordAudio);
  }

  clickTranslation() {
    const translationBox = document.querySelector('.app__content_translation-box');
    this.listener1 = this.listenerOnTranslationBox.bind(this);
    translationBox.addEventListener('click', this.listener1);
  }

  listenerOnTranslationBox({ target }) {
    const translation = target.classList.contains('translation');
    const keyboardNum = target.classList.contains('keyboard-num');
    if (this.recognitionObj.notRecognizedCorrect) {
      if (translation && !keyboardNum && !this.model.isWordClicked) {
        if (this.pos < this.marginTop) {
          target.classList.add('hover-disabled');
          this.checkRightTranslation(target);

          if (document.querySelector('.microphone').classList.contains('microphone_active')) {
            this.recognitionObj.stopRecognition();
          }
        }
      }
    }
  }

  addKeyUpListener() {
    this.onKeyUp = this.checkTranslationOnKeyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  }

  checkTranslationOnKeyUp({ key }) {
    if (this.recognitionObj.notRecognizedCorrect) {
      if (!this.model.isWordClicked && key >= 1 && key <= 4) {
        const translationEl = this.getClickedWord(key);
        this.checkRightTranslation(translationEl);

        if (document.querySelector('.microphone').classList.contains('microphone_active')) {
          this.recognitionObj.stopRecognition();
        }
      }
    }
  }

  displayModal() {
    this.appModal = document.querySelector('.app__modal');
    this.appModal.classList.add('app__modal_visible');
  }

  hideModal() {
    this.appModal.classList.remove('app__modal_visible');
  }

  renderGameLayout() {
    return this.savannahGame;
  }

  renderPreloader() {
    return this.preloader;
  }

  countTillOne() {
    this.preloaderNumber = Number(document.querySelector('.countdown').innerHTML);

    if (this.preloaderNumber > 0) {
      this.preloaderNumber -= 1;
    }

    if (this.preloaderNumber < 1) {
      this.randomEngWord = this.model.wordsArr[this.model.randomArrOfIndexes[this.model.count]];
      this.renderCountDownFinished();
    }

    return this.preloaderNumber;
  }

  renderCountDownFinished() {
    this.appContent = document.querySelector('.app__content');
    this.appContent.innerHTML = '';
    this.renderHeader();
    this.renderPlayingPage();
    this.renderCrystal();
    this.renderBang();
    this.renderSparkles();
    this.model.getCurrentWordId();
  }

  renderPlayingPage() {
    this.renderFlyingWord();
    this.moveWord();
    this.renderTranslation();
  }

  finishGame() {
    this.model.isGameOn = false;
    this.model.isPreloading = false;
    this.recognitionObj.stopRecognition();
    window.removeEventListener('keyup', this.onKeyUp);
    this.appContainer.classList.remove('app__background');
    this.appContainer.style.backgroundPositionY = '0%';
  }

  renderRating() {
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.groupRoundView.init();
  }

  renderHeader() {
    const microphone = this.renderMicrophone();
    const livesBox = this.renderLives();

    this.appHeader = document.querySelector('.app__header');
    this.appHeader.setAttribute('id', 'savannah-header');
    this.appHeader.appendChild(livesBox);
    document.getElementById('savannah-header').appendChild(microphone);
    this.recognitionObj.addListeners();

    return this.appHeader;
  }

  renderLives = () => {
    const livesBox = document.createElement('div');
    livesBox.classList.add('lives');
    livesBox.innerHTML = LIVES;

    return livesBox;
  }

  renderMicrophone = () => {
    const microphone = document.createElement('div');
    microphone.classList.add('microphone');
    microphone.innerHTML = MICROPHONE;

    return microphone;
  }

  renderFlyingWord() {
    this.flyingWordBox.classList.add('flying-word');
    this.flyingWordBox.innerHTML = `
    <span id="main-word">${this.randomEngWord}</span>`;
    this.appContent.appendChild(this.flyingWordBox);
  }

  moveWord() {
    this.model.isWordClicked = false;
    this.pos = START_FLYING_POSITION;
    this.id = setInterval(this.frame.bind(this), MOVING_WORD_INTERVAL);
    this.flyingWord = document.querySelector('.flying-word');
    this.flyingWord.classList.remove('flying-word_hide');
  }

  frame() {
    if (this.model.isGameOn) {
      const rightAnswer = true;
      const settingsVisible = document.querySelector('.settings__overlay');
      const menuActive = document.querySelector('.burger-menu').classList.contains('burger-menu--active');

      if (!menuActive && !settingsVisible) {
        if (this.pos >= (this.marginTop)) {
          clearInterval(this.id);
          if (this.model.audioOn) {
            this.errorSound.play();
          }

          this.recognitionObj.stopRecognition();
          this.model.incorrectWordsId.push(this.model.currentWordId);
          this.correctHTMLEl = this.findCorrectAnswerHTMLel();
          this.model.wrongAnswerCounter += 1;

          this.removeLives();
          this.highlightAnswer(this.correctHTMLEl, rightAnswer);
          this.gameStatistics.appendWrongAnswer(this.randomEngWord,
            this.model.correctAnswer, this.model.currentWordAudio);
          this.flyingWord.classList.add('flying-word_hide');
          this.flyingWord.style.top = '0';
          setTimeout(() => {
            this.removeHighlight(this.correctHTMLEl, rightAnswer);
          }, DELAY_HIGHLIGHT);
          setTimeout(() => { this.nextWord(); }, DELAY_NEXT_WORD);
        } else {
          this.pos += this.marginTop / BASE_MARGIN;
          this.flyingWord.style.top = `${this.pos}px`;
        }
      }
    }
  }

  bangOnRightAnswer() {
    this.bang.classList.remove('hidden');
    this.bangPos = START_BANG_POSITION;
    this.bangId = setInterval(this.bangFrame.bind(this), 1);
  }

  bangFrame() {
    if (this.bangPos === FINAL_BANG_POSITION && this.model.isGameOn) {
      clearInterval(this.bangId);
      this.bang.classList.add('hidden');
    } else {
      this.bangPos -= BANG_MOVE_PX;
      this.bang.style.top = `${this.bangPos}px`;
    }
  }

  renderTranslation() {
    const fourAnswersWordsArr = this.model.generateTranslation();
    this.translationBox.classList.add('app__content_translation-box');
    const spanArr = [];

    fourAnswersWordsArr.forEach((item, index) => {
      spanArr.push(`<span class="translation translation-${index + 1}"><span class="keyboard-num">${index + 1}</span>${item}</span>`);
    });
    this.translationBox.innerHTML = spanArr.join('');
    this.appContent.appendChild(this.translationBox);
  }

  renderCrystal() {
    this.crystalBox.classList.add('crystal');
    this.crystalBox.innerHTML = `
    <img class="crystal__img" src="../src/assets/images/crystal.png">`;
    this.appContent.appendChild(this.crystalBox);
  }

  renderBang() {
    this.bang.className = ('bang hidden');
    this.appContent.appendChild(this.bang);
  }

  renderSparkles() {
    this.sparklesBox.classList.add('sparkle-container');
    this.sparklesBox.innerHTML = SPARKLES;
    this.crystalBox.appendChild(this.sparklesBox);
  }

  setMusicOnOff() {
    this.musicIcon = document.querySelector('.user-tool__button-speaker');

    if (this.musicIcon.classList.contains('user-tool__button-speaker--active')) {
      this.model.audioOn = true;
    } else {
      this.model.audioOn = false;
    }

    setTimeout(() => { this.setMusicOnOff(); }, DELAY_MUSIC_OFF);
  }

  moveBackground() {
    this.model.backgroundPositionY -= BACKGROUND_MOVE_PX;
    this.appContainer.style.backgroundPositionY = `${this.model.backgroundPositionY}%`;
  }

  resizeCrystal() {
    this.model.crystalWidth += 1;
    this.crystalBox.style.width = `${this.model.crystalWidth}px`;
  }

  highlightAnswer = (element, isRight) => {
    if (isRight) {
      element.classList.add('correct-answer');
    } else {
      element.classList.add('wrong-answer');
    }
  }

  removeHighlight = (element, isRight) => {
    if (isRight) {
      element.classList.remove('correct-answer');
    } else {
      element.classList.remove('wrong-answer');
    }
  }

  findCorrectAnswerHTMLel() {
    this.answerId = this.model.findCorrectAnswerId();

    return document.querySelector(`.translation-${this.answerId}`);
  }

  getClickedWord(key) {
    this.keyCode = +key;
    if (this.keyCode >= 1 && this.keyCode <= 4) {
      return document.querySelector(`.translation-${this.keyCode}`);
    }

    return false;
  }

  removeLives() {
    if (this.model.wrongAnswerCounter <= NUMBER_OF_LIVES) {
      document.getElementById(`life-${this.model.wrongAnswerCounter}`).classList.add('hidden');

      if (this.model.wrongAnswerCounter === NUMBER_OF_LIVES) {
        this.model.isGameOn = false;
        this.renderGameOver(false);
      }
    }

    return this;
  }

  nextWord() {
    if (this.model.count < this.model.wordsArr.length) {
      if (this.model.isGameOn) {
        this.randomEngWord = this.model.wordsArr[this.model.randomArrOfIndexes[this.model.count]];
        this.renderPlayingPage();
        this.model.getCurrentWordId();

        if (document.querySelector('.microphone').classList.contains('microphone_active')) {
          this.recognitionObj.turnOnMicrophone();
        }

        this.recognitionObj.notRecognizedCorrect = true;
      }
    } else {
      this.renderGameOver(true);
    }
  }

  renderGameOver(isWin) {
    this.incorrectWordsIdArr = this.model.incorrectWordsId;
    this.parseLearningWords(this.incorrectWordsIdArr);
    this.recognitionObj.removeListeners();
    const activeMicrophone = document.querySelector('.microphone').classList.contains('microphone_active');

    if (activeMicrophone) {
      document.querySelector('.microphone').classList.remove('microphone_active');
    }

    this.translationBox.removeEventListener('click', this.listener1);
    document.querySelector('.statistics__container').classList.remove('hidden');
    document.querySelector('.statistics__container').classList.add('flex');
    document.querySelector('.app__content').innerHTML = '';
    this.gameStatistics.renderWrongAnswersTitle();
    this.gameStatistics.renderCorrectAnswerTitle();

    if (isWin) {
      this.gameStatistics.winRound();
    } else {
      this.gameStatistics.loseRound();
    }
  }

  changePositionAccordingToClientHeight() {
    const marginTop = document.documentElement.clientHeight * MARGIN_PERCENTAGE;
    if (this.marginTop !== marginTop) {
      this.marginTop = marginTop;
    }
  }
}

export default SavannahView;
