import SavannahView from './Views/View';
import SavannahModel from './Model';

class SavannahController {
  constructor(user, mainView) {
    this.userData = '';
    this.user = user;
    this.mainView = mainView;
  }

  /* clickSavannahBtn() {
    this.savannahBtn = document.querySelector('.savannah');
    this.savannahBtn.addEventListener('click', () => {
      this.init();
      this.model.getCurrUser();
      document.body.classList.add('app__background');
      document.body.style.backgroundPositionY = '100%';
    });
  } */

  init() {
    this.model = new SavannahModel();
    this.view = new SavannahView(this.model);
    this.view.getViewUser(this.user, this.mainView);
    this.view.renderSavannah();
    this.addListeners();
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
    this.view.getLevelsId();
    this.view.getRound();
    this.clickStartGameBtn();
  }

  openModal() {
    this.closeBtn.addEventListener('click', () => {
      this.view.displayModal();
    });
  }

  closeModal() {
    this.cancelBtn.addEventListener('click', () => {
      this.view.hideModal();
    });
  }

  backToMainPage() {
    this.backToMianBtn.addEventListener('click', () => {
      this.view.renderBackToMain();
      this.mainView.renderMain(this.user);
    });
  }

  clickStartGameBtn() {
    this.startBtn.addEventListener('click', () => {
      window.removeEventListener('keyup', this.onKeyUp);
      this.chosenLevel = this.view.level;
      this.chosenRound = this.view.round;
      console.log('Chosen round:', this.chosenRound);
      this.addPreloader();
      setTimeout(this.preloaderCountDown.bind(this), 1000);
      this.model.fetchWords(this.user, this.chosenLevel, this.chosenRound)
        .then((data) => {
          this.model.getWordsAndTranslation(data);
          // todo do we need it?
          this.wordsArr = this.model.wordsArr;
          this.translationArr = this.model.translation;
        });
    });
  }

  addPreloader() {
    this.appContent = document.querySelector('.app__content');
    document.querySelector('.app').removeChild(document.querySelector('.rating__container'));
    this.appContent.innerHTML = this.view.renderPreloader();
  }

  preloaderCountDown() {
    this.countNumber = this.view.countTillOne();

    if (this.countNumber > 0) {
      document.querySelector('.countdown').innerHTML = this.countNumber;
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    } else {
      this.gameMode();
    }
  }

  // Working with data
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

      setTimeout(this.view.nextWord.bind(this.view), 1000);
    }
  }

  rightTranslationActions(translationEl, rightAnswer) {
    this.view.moveBackground();
    this.view.resizeCristal();
    this.view.highlightAnswer(translationEl, rightAnswer);
    clearInterval(this.view.id);
    this.view.flyingWord.classList.add('flying-word_hide');
    this.view.bangOnRightAnswer();

    setTimeout(this.view.removeHighlight.bind(this), 1000, translationEl, rightAnswer);
  }

  wrongTranslationActions(translationEl, wrongAnswer, rightAnswer) {
    this.correctHTMLEl = this.view.findCorrectAnswerHTMLel();
    this.view.highlightAnswer(translationEl, wrongAnswer);
    this.view.highlightAnswer(this.correctHTMLEl, rightAnswer);
    clearInterval(this.view.id);
    this.view.flyingWord.classList.add('flying-word_hide');

    setTimeout(this.view.removeHighlight.bind(this), 1000, translationEl, wrongAnswer);
    setTimeout(this.view.removeHighlight.bind(this), 1000, this.correctHTMLEl, rightAnswer);
    this.view.removeLives(this.model.wrongAnswer);
  }

  clickTranslation() {
    const translationBox = document.querySelector('.app__content__translation-box');

    translationBox.addEventListener('click', ({ target }) => {
      target.classList.add('noHover');
      this.checkRightTranslation(target);
    });
  }

  addKeyUpListener() {
    this.onKeyUp = this.checkTransalationOnKeyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  }

  checkTransalationOnKeyUp(event) {
    const translationEl = this.view.getClickedWord(event.key);
    this.checkRightTranslation(translationEl);
  }
}

export default SavannahController;
