// import getDifficultyLevelRoundId from '../../utils/getDifficultyLevelID';
import getLevel from '../../utils/getLevel';
import getRound from '../../utils/getRound';
import GroupRoundView from './groupRoundView';
// import randomInteger from '../../utils/randomInteger';
import GameStatistics from './gameStatView';
import STATISTICS_MODAL_LAYOUT from '../../utils/statisticsModalConst';
import {
  GAME_LAYOUT,
  PRELOADER,
  LIVES,
  SPARKLES,
  GROUP_ROUND,
  SOUND_URL,
  CORRECT_SOUND,
  ERROR_SOUND,
  ROUND_STARTS_SOUND,
  SAVANNAH_HASH_REGEXP,
  DELAY,
  START_FLYING_POSITION,
  FINAL_FLYING_POSITION,
  START_BANG_POSITION,
  FINAL_BANG_POSITION,
  BACKGROUND_MOVE_PX,
} from '../constSavannah';

class SavannahView {
  constructor(model, defaultHash) {
    this.model = model;
    this.setDefaultHash = defaultHash;
    this.savannahGame = GAME_LAYOUT;
    this.preloader = PRELOADER;
    this.groupRoundHtml = GROUP_ROUND;
    this.correctSound = new Audio(SOUND_URL + CORRECT_SOUND);
    this.errorSound = new Audio(SOUND_URL + ERROR_SOUND);
    this.roundStartsSound = new Audio(SOUND_URL + ROUND_STARTS_SOUND);
    this.gameStatistics = new GameStatistics();
    this.statisticsLayout = STATISTICS_MODAL_LAYOUT;
    this.mainContainer = document.querySelector('.main');
    this.livesBox = document.createElement('div');
    this.flyingWordBox = document.createElement('div');
    this.translationBox = document.createElement('div');
    this.cristalBox = document.createElement('div');
    this.sparklesBox = document.createElement('div');
    this.muteLine = document.createElement('div');
    this.bang = document.createElement('div');
  }

  checkSavannahWindow() {
    if (!SAVANNAH_HASH_REGEXP.test(window.location.href)) {
      this.finishGame();
      this.savannahContainer = document.querySelector('.savannah__app');

      if (this.savannahContainer) {
        this.mainContainer.removeChild(this.savannahContainer);
      }
    } else {
      setTimeout(() => { this.checkSavannahWindow(); }, DELAY / 2);
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
    this.gameStatistics.init(this, this.mainView, this.model);
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
      console.log(this.level, this.round);
      this.addPreloader();
      setTimeout(() => { this.preloaderCountDown(); }, DELAY);
      this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
        .then((data) => {
          this.model.getWordsAndTranslation(data);
          this.model.getWordIdsAndAudio(data);
        });
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

      if (!activeMenu && !visibleModal) {
        this.countNumber = this.countTillOne();

        if (this.countNumber > 0) {
          document.querySelector('.countdown').innerHTML = this.countNumber;
          setTimeout(() => { this.preloaderCountDown(); }, DELAY);
        } else {
          this.gameMode();
        }
      } else {
        setTimeout(() => { this.preloaderCountDown(); }, DELAY);
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

      this.model.getCurrentWordId();
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

      setTimeout(() => { this.nextWord(); }, DELAY);
    }
  }

  rightTranslationActions(translationEl, rightAnswer) {
    this.moveBackground();
    this.resizeCristal();
    this.highlightAnswer(translationEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');
    this.bangOnRightAnswer();

    setTimeout(() => { this.removeHighlight(translationEl, rightAnswer); }, DELAY);
    this.gameStatistics.appendCorrectAnswer(this.randomEngWord,
      this.model.correctAnswer, this.model.currentWordAudio);
  }

  wrongTranslationActions(translationEl, wrongAnswer, rightAnswer) {
    this.correctHTMLEl = this.findCorrectAnswerHTMLel();
    this.highlightAnswer(translationEl, wrongAnswer);
    this.highlightAnswer(this.correctHTMLEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');

    setTimeout(() => { this.removeHighlight(translationEl, wrongAnswer); }, DELAY);
    setTimeout(() => { this.removeHighlight(this.correctHTMLEl, rightAnswer); }, DELAY);
    this.removeLives(this.model.wrongAnswerCounter);

    this.gameStatistics.appendWrongAnswer(this.randomEngWord,
      this.model.correctAnswer, this.model.currentWordAudio);
  }

  clickTranslation() {
    const translationBox = document.querySelector('.app__content__translation-box');
    this.listener1 = this.listenerOnTranslationBox.bind(this);
    translationBox.addEventListener('click', this.listener1);
  }

  listenerOnTranslationBox({ target }) {
    const translation = target.classList.contains('translation');
    const keyboardNum = target.classList.contains('keyboard-num');
    if (translation && !keyboardNum && !this.model.isWordClicked) {
      if (this.pos < FINAL_FLYING_POSITION) {
        target.classList.add('noHover');
        this.checkRightTranslation(target);
      }
    }
  }

  addKeyUpListener() {
    this.onKeyUp = this.checkTransalationOnKeyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  }

  checkTransalationOnKeyUp(event) {
    if (!this.model.isWordClicked) {
      const translationEl = this.getClickedWord(event.key);
      this.checkRightTranslation(translationEl);
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
    this.rendercristal();
    this.renderBang();
    this.renderSparkles();
  }

  renderPlayingPage() {
    this.renderFlyingWord();
    this.moveWord();
    this.renderTranslation();
  }

  finishGame() {
    this.model.isGameOn = false;
    this.model.isPreloading = false;
    window.removeEventListener('keyup', this.onKeyUp);
    this.appContainer.classList.remove('app__background');
    this.appContainer.style.backgroundPositionY = '0%';
  }

  renderRating() {
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.groupRoundView.init();
  }

  renderHeader() {
    this.appHeader = document.querySelector('.app__header');
    this.livesBox.className = 'lives';
    this.livesBox.innerHTML = LIVES;
    this.appHeader.appendChild(this.livesBox);

    return this.appHeader;
  }

  renderFlyingWord() {
    this.flyingWordBox.className = 'flying-word';
    this.flyingWordBox.innerHTML = `
    <span id="main-word">${this.randomEngWord}</span>`;
    this.appContent.appendChild(this.flyingWordBox);
  }

  moveWord() {
    this.model.isWordClicked = false;
    this.pos = START_FLYING_POSITION;
    this.id = setInterval(this.frame.bind(this), 20);
    this.flyingWord = document.querySelector('.flying-word');
    this.flyingWord.classList.remove('flying-word_hide');
  }

  frame() {
    const rightAnswer = true;
    if (!document.querySelector('.burger-menu').classList.contains('burger-menu--active')) {
      if (this.pos === FINAL_FLYING_POSITION && this.model.isGameOn) {
        clearInterval(this.id);
        if (this.model.audioOn) {
          this.errorSound.play();
        }

        this.correctHTMLEl = this.findCorrectAnswerHTMLel();
        this.model.wrongAnswerCounter += 1;

        this.removeLives();
        this.highlightAnswer(this.correctHTMLEl, rightAnswer);
        this.gameStatistics.appendWrongAnswer(this.randomEngWord,
          this.model.correctAnswer, this.model.currentWordAudio);
        this.flyingWord.classList.add('flying-word_hide');
        this.flyingWord.style.top = '0';
        setTimeout(() => { this.removeHighlight(this.correctHTMLEl, rightAnswer); }, DELAY);
        setTimeout(() => { this.nextWord(); }, DELAY);
      } else {
        this.pos += 1;
        this.flyingWord.style.top = `${this.pos}px`;
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
      this.bangPos -= 5;
      this.bang.style.top = `${this.bangPos}px`;
    }
  }

  renderTranslation() {
    const fourAnswersWordsArr = this.model.generateTranslation();
    this.translationBox.className = 'app__content__translation-box';
    const spanArr = [];

    fourAnswersWordsArr.forEach((item, index) => {
      spanArr.push(`<span class="translation translation-${index + 1}"><span class="keyboard-num">${index + 1}</span>${item}</span>`);
    });
    this.translationBox.innerHTML = spanArr.join('');
    this.appContent.appendChild(this.translationBox);
  }

  rendercristal() {
    this.cristalBox.className = 'cristal';
    this.cristalBox.innerHTML = `
    <img class="cristal__img" src="../src/assets/images/cristal.png">`;
    this.appContent.appendChild(this.cristalBox);
  }

  renderBang() {
    this.bang.className = 'bang hidden';
    this.appContent.appendChild(this.bang);
  }

  renderSparkles() {
    this.sparklesBox.className = 'sparkle-container';
    this.sparklesBox.innerHTML = SPARKLES;
    this.cristalBox.appendChild(this.sparklesBox);
  }

  setMusicOnOff() {
    this.musicIcon = document.querySelector('.user-tool__button-speaker');

    if (this.musicIcon.classList.contains('user-tool__button-speaker--active')) {
      this.model.audioOn = true;
    } else {
      this.model.audioOn = false;
    }

    setTimeout(() => { this.setMusicOnOff(); }, DELAY);
  }

  moveBackground() {
    this.model.backgroundPositionY -= BACKGROUND_MOVE_PX;
    this.appContainer.style.backgroundPositionY = `${this.model.backgroundPositionY}%`;
  }

  resizeCristal() {
    this.model.cristalWidth += 1;
    this.cristalBox.style.width = `${this.model.cristalWidth}px`;
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
    if (this.model.wrongAnswerCounter <= 5) {
      document.getElementById(`life-${this.model.wrongAnswerCounter}`).classList.add('hidden');

      if (this.model.wrongAnswerCounter === 5) {
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
      }
    } else {
      this.renderGameOver(true);
    }
  }

  renderGameOver(isWin) {
    this.translationBox.removeEventListener('click', this.listener1);
    document.querySelector('.statistics__container').classList.remove('hidden');
    document.querySelector('.app__content').innerHTML = '';
    this.gameStatistics.renderWrongAnswersTitle();
    this.gameStatistics.renderCorrectAnswerTitle();

    if (isWin) {
      this.gameStatistics.winRound();
    } else {
      this.gameStatistics.loseRound();
    }
  }
}

export default SavannahView;
