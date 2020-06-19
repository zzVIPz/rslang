import SavannahView from './View';
import SavannahModel from './Model';

class SavannahController {
  constructor() {
    this.userData = '';
  }

  init() {
    this.model = new SavannahModel();
    this.view = new SavannahView(this.model);
    this.mainContainer = document.querySelector('.main');
    this.mainContainer.innerHTML = this.view.renderGameLayout();
    this.mockData = '';
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
      this.mainContainer.innerHTML = '';
      document.body.classList.remove('app__background');
      document.body.style.backgroundPositionY = '0%';
    });
  }

  clickStartGameBtn() {
    this.startBtn.addEventListener('click', () => {
      this.addPreloader();
      setTimeout(this.preloaderCountDown.bind(this), 1000);
      this.model.fetchData(this.view.level, 0)
        .then((data) => {
          this.wordsArr = data.words;
          this.translationArr = data.translation;
        });
    });
  }

  addPreloader() {
    this.appContent = document.querySelector('.app__content');
    document.querySelector('.app').removeChild(document.querySelector('.app__rating'));
    this.appContent.innerHTML = this.view.renderPreloader();
  }

  preloaderCountDown() {
    this.countNumber = this.view.countTillOne(this.wordsArr, this.translationArr);

    if (this.countNumber > 0) {
      document.querySelector('.countdown').innerHTML = this.countNumber;
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    } else {
      this.gameMode();
    }
  }

  clickSavannahBtn() {
    this.savannahBtn = document.querySelector('[data-name="savannah"]');
    this.savannahBtn.addEventListener('click', () => {
      this.init();
      document.body.classList.add('app__background');
      document.body.style.backgroundPositionY = '100%';
    });
  }

  // Working with data
  gameMode() {
    if (this.countNumber < 1) {
      this.clickTranslation();
      this.pressKeyboardBtn();
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
        this.view.moveBackground();
        this.view.resizeCristal();
        this.view.highlightAnswer(translationEl, rightAnswer);
        setTimeout(this.view.removeHighlight.bind(this), 1000, translationEl, rightAnswer);
      } else {
        console.log('it is wrong answer');
        this.view.highlightAnswer(translationEl, false);
        setTimeout(this.view.removeHighlight.bind(this), 1000, translationEl, wrongAnswer);
        this.view.removeLives(this.model.wrongAnswer);
      }
    }
  }

  clickTranslation() {
    const translationBox = document.querySelector('.app__content__translation-box');

    translationBox.addEventListener('click', ({ target }) => {
      this.checkRightTranslation(target);
    });
  }

  pressKeyboardBtn() {
    window.addEventListener('keydown', ({ code }) => {
      const translationEl = this.view.getClickedWord(code);
      this.checkRightTranslation(translationEl);
    });
  }
}

export default SavannahController;
