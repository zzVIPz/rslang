import {
  savannahGame, preloader, lives, sparkles, groupRound, statisticsModalLayout,
} from '../constSavannah';
import getDifficultyLevelRoundId from '../savannah-utils/getDifficultyLevelID';
import GroupRoundView from './groupRoundView';
import randomIntegerForPages from '../savannah-utils/randomInteger';
import GameStatistics from './gameStatView';

class SavannahView {
  constructor(model) {
    this.savannahGame = savannahGame;
    this.preloader = preloader;
    this.groupRoundHtml = groupRound;
    this.gameStatistics = new GameStatistics();
    this.statisticsLayout = statisticsModalLayout;
    this.livesBox = document.createElement('div');
    this.musicBox = document.createElement('div');
    this.flyingWordBox = document.createElement('div');
    this.translationBox = document.createElement('div');
    this.cristalBox = document.createElement('div');
    this.sparklesBox = document.createElement('div');
    this.muteLine = document.createElement('div');
    this.bang = document.createElement('div');
    this.model = model;
    this.backgroundPositionY = 100;
    this.cristalWidth = 30;
    this.removeDigits = /\d/g;
    this.maxRound = 6;
  }

  getViewUser(user, mainView) {
    this.currentUser = user;
    this.mainView = mainView;
  }

  renderSavannah() {
    this.mainContainer = document.querySelector('.main');
    document.body.classList.add('app__background');
    document.body.style.backgroundPositionY = '100%';
    this.mainContainer.innerHTML = this.renderGameLayout();
    this.renderRating();
    this.addListeners();
    this.gameStatistics.init(this, this.mainView, this.model);
  }

  addListeners() {
    this.closeBtn = document.querySelector('.close');
    this.cancelBtn = document.querySelector('.app__modal__box_cancel');
    this.backToMianBtn = document.querySelector('.app__button_close');
    this.startBtn = document.querySelector('.app__button');
    this.rating = document.querySelectorAll('.rating__input');
    this.openModal();
    this.closeModal();
    this.backToMainPage();
    this.getLevelsId();
    this.getRound();
    this.clickStartGameBtn();
  }

  openModal() {
    this.closeBtn.addEventListener('click', () => {
      this.displayModal();
    });
  }

  closeModal() {
    this.cancelBtn.addEventListener('click', () => {
      this.hideModal();
    });
  }

  backToMainPage() {
    this.backToMianBtn.addEventListener('click', () => {
      this.renderBackToMain();
      this.mainView.renderMain(this.currentUser);
    });
  }

  clickStartGameBtn() {
    this.startBtn.addEventListener('click', () => {
      window.removeEventListener('keyup', this.onKeyUp);
      this.chosenLevel = this.level;
      this.chosenRound = this.round;
      console.log('Chosen round:', this.chosenRound);
      this.addPreloader();
      setTimeout(this.preloaderCountDown.bind(this), 1000);
      this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
        .then((data) => {
          this.model.getWordsAndTranslation(data);
          this.model.getWordIdsAndAudio(data);
        });
    });
  }

  addPreloader() {
    this.appContent = document.querySelector('.app__content');
    document.querySelector('.app').removeChild(document.querySelector('.rating__container'));
    this.appContent.innerHTML = this.renderPreloader();
  }

  preloaderCountDown() {
    this.countNumber = this.countTillOne();

    if (this.countNumber > 0) {
      document.querySelector('.countdown').innerHTML = this.countNumber;
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    } else {
      this.gameMode();
    }
  }

  gameMode() {
    if (this.countNumber < 1) {
      this.clickTranslation();
      this.addKeyUpListener();
    }
  }

  checkRightTranslation(translationEl) {
    const rightAnswer = true;
    const wrongAnswer = false;

    if (translationEl) {
      const answer = (translationEl.textContent).replace(this.removeDigitsRegExp, '');
      const result = this.model.isRightTranslation(answer);

      if (result === rightAnswer) {
        console.log('it is correct answer');
        this.rightTranslationActions(translationEl, rightAnswer);
      } else {
        console.log('it is wrong answer');
        console.log(this.model.wrongAnswer);
        this.wrongTranslationActions(translationEl, wrongAnswer, rightAnswer);
      }

      setTimeout(this.nextWord.bind(this), 1000);
    }
  }

  rightTranslationActions(translationEl, rightAnswer) {
    this.moveBackground();
    this.resizeCristal();
    this.highlightAnswer(translationEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');
    this.bangOnRightAnswer();

    setTimeout(this.removeHighlight.bind(this), 1000, translationEl, rightAnswer);

    this.gameStatistics.appendCorrectAnswer(this.randomEngWord, this.model.correctAnswer);
  }

  wrongTranslationActions(translationEl, wrongAnswer, rightAnswer) {
    this.correctHTMLEl = this.findCorrectAnswerHTMLel();
    this.highlightAnswer(translationEl, wrongAnswer);
    this.highlightAnswer(this.correctHTMLEl, rightAnswer);
    clearInterval(this.id);
    this.flyingWord.classList.add('flying-word_hide');

    setTimeout(this.removeHighlight.bind(this), 1000, translationEl, wrongAnswer);
    setTimeout(this.removeHighlight.bind(this), 1000, this.correctHTMLEl, rightAnswer);
    this.removeLives(this.model.wrongAnswer);

    this.gameStatistics.appendWrongAnswer(this.randomEngWord, this.model.correctAnswer);
  }

  clickTranslation() {
    const translationBox = document.querySelector('.app__content__translation-box');
    this.listener1 = this.listenerOnTranslationBox.bind(this);
    translationBox.addEventListener('click', this.listener1);
  }

  listenerOnTranslationBox({ target }) {
    if (this.pos < 150) {
      this.model.getCurrentWordId();
      this.model.getCurrentAudioUrl();
      console.log(this.model.currentWordAudio);
      target.classList.add('noHover');
      this.checkRightTranslation(target);
    }
  }

  addKeyUpListener() {
    this.onKeyUp = this.checkTransalationOnKeyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  }

  checkTransalationOnKeyUp(event) {
    const translationEl = this.getClickedWord(event.key);
    this.checkRightTranslation(translationEl);
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
      console.log('Random word:', this.randomEngWord);
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
    this.renderMuteMusicNote();
  }

  renderPlayingPage() {
    this.renderFlyingWord();
    this.moveWord();
    this.renderTranslation();
  }

  renderBackToMain() {
    this.model.isGameOn = false;
    window.location.href = '#main-page';
    window.removeEventListener('keyup', this.onKeyUp);
    document.body.classList.remove('app__background');
    document.body.style.backgroundPositionY = '0%';
  }

  renderRating() {
    this.appContainer = document.querySelector('.app');
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.groupRoundView.init();
  }

  renderHeader() {
    this.appHeader = document.querySelector('.app__header');
    this.livesBox.className = 'lives';
    this.livesBox.innerHTML = lives;
    this.musicBox.className = 'music';
    this.musicBox.innerHTML = `
    <img class="music__icon" src="../src/assets/images/musical-note.png">`;
    this.muteLine.className = 'music__line';
    this.appHeader.appendChild(this.livesBox);
    this.appHeader.appendChild(this.musicBox);
    this.musicBox.appendChild(this.muteLine);

    return this.appHeader;
  }

  renderFlyingWord() {
    this.flyingWordBox.className = 'flying-word';
    this.flyingWordBox.innerHTML = `
    <span id="main-word">${this.randomEngWord}</span>`;
    this.appContent.appendChild(this.flyingWordBox);
  }

  moveWord() {
    this.flyingWord = document.querySelector('.flying-word');
    this.flyingWord.classList.remove('flying-word_hide');
    this.pos = -100;
    this.id = setInterval(this.frame.bind(this), 20);
  }

  frame() {
    const rightAnswer = true;
    if (this.pos === 150 && this.model.isGameOn) {
      clearInterval(this.id);
      this.flyingWord.classList.add('flying-word_hide');
      this.correctHTMLEl = this.findCorrectAnswerHTMLel();
      this.model.wrongAnswer += 1;

      this.removeLives();
      this.highlightAnswer(this.correctHTMLEl, rightAnswer);

      setTimeout(this.removeHighlight.bind(this), 1000, this.correctHTMLEl, rightAnswer);
      setTimeout(this.nextWord.bind(this), 1000);
    } else {
      this.pos += 1;
      this.flyingWord.style.top = `${this.pos}px`;
    }
  }

  bangOnRightAnswer() {
    this.bang.classList.remove('hidden');
    this.bangPos = 300;
    this.bangId = setInterval(this.bangFrame.bind(this), 1);
  }

  bangFrame() {
    if (this.bangPos === -100 && this.model.isGameOn) {
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
      spanArr.push(`<span class="translation-${index + 1}"><span class="keyboard-num">${index + 1}</span>${item}</span>`);
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
    this.sparklesBox.innerHTML = sparkles;
    this.cristalBox.appendChild(this.sparklesBox);
  }

  renderMuteMusicNote() {
    this.musicIcon = document.querySelector('.music__icon');
    this.musicIcon.addEventListener('click', () => {
      this.muteLine.classList.toggle('visible');
    });
  }

  getLevelsId() {
    const stars = document.querySelector('.rating__group');
    stars.addEventListener('click', ({ target }) => {
      if (target.classList.contains('group')) {
        this.level = getDifficultyLevelRoundId(target);
      }
    });
  }

  getRound() {
    const starsRound = document.querySelector('.rating__round');
    starsRound.addEventListener('click', ({ target }) => {
      if (target.classList.contains('round')) {
        this.round = getDifficultyLevelRoundId(target);
        this.round = this.round * 5 + randomIntegerForPages();
        console.log('page', this.round);
      }
    });
  }

  moveBackground() {
    this.backgroundPositionY -= 5;
    document.body.style.backgroundPositionY = `${this.backgroundPositionY}%`;
  }

  resizeCristal() {
    this.cristalWidth += 1;
    this.cristalBox.style.width = `${this.cristalWidth}px`;
  }

  highlightAnswer(element, isRight) {
    if (isRight) {
      element.classList.add('correct-answer');
    } else {
      element.classList.add('wrong-answer');
    }

    return this;
  }

  removeHighlight(element, isRight) {
    if (isRight) {
      element.classList.remove('correct-answer');
    } else {
      element.classList.remove('wrong-answer');
    }

    return this;
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
    console.log(this.model.wrongAnswer);
    if (this.model.wrongAnswer <= 5) {
      document.getElementById(`life-${this.model.wrongAnswer}`).classList.add('hidden');
      if (this.model.wrongAnswer === 5) {
        this.model.isGameOn = false;
        console.log('Modal Page');
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
      console.log('Modal Page');
      this.renderGameOver(true);
    }
  }

  renderGameOver(isWin) {
    this.translationBox.removeEventListener('click', this.listener1);
    document.querySelector('.statistics__container').classList.remove('hidden');
    this.gameStatistics.renderWrongAnswersTitle();
    this.gameStatistics.renderCorrectAnswerTitle();
    if (isWin) {
      this.gameStatistics.winRound();
    } else {
      this.gameStatistics.loseRound();
    }
  }

  // working with audio
  /* playStartGameAudio() {

  } */
}

export default SavannahView;
