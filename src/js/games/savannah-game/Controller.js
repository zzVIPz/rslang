import SavannahView from './View';
import SavannahModel from './Model';

class SavannahController {
  constructor() {
    this.model = new SavannahModel();
    this.view = new SavannahView();
  }

  init() {
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
    // this.getDataByChoosingLevel();
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
    const countNumber = this.view.countTillOne(this.wordsArr, this.translationArr);
    if (countNumber > 0) {
      document.querySelector('.countdown').innerHTML = countNumber;
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    }
  }

  clickSavannahBtn() {
    this.savannahBtn = document.querySelector('[data-name="savannah"]');
    this.savannahBtn.addEventListener('click', () => {
      this.init();
      document.body.classList.add('app__background');
    });
  }

  // Working with data
/*   getDataByChoosingLevel() {
    this.stars = document.querySelector('.rating');
    this.stars.addEventListener('click', ({ target }) => {
      this.level = this.view.getLevelsId(target);
      if (this.level) {
        this.model.fetchData(this.level, 0).then((data) => {
          this.words = data;
        });
      }
    });
  } */
}

export default SavannahController;
