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
    this.addListeners();
  }

  addListeners() {
    console.log('level', this.model.addLevel(2));
    this.closeBtn = document.querySelector('.close');
    this.cancelBtn = document.querySelector('.app__modal__box_cancel');
    this.backToMianBtn = document.querySelector('.app__button_close');
    this.startBtn = document.querySelector('.app__button');
    this.rating = document.querySelectorAll('.rating__input');
    this.openModal();
    this.closeModal();
    this.backToMainPage();
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
    });
  }

  clickStartGameBtn() {
    this.startBtn.addEventListener('click', () => {
      this.addPreloader();
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    });
  }

  addPreloader() {
    this.appContent = document.querySelector('.app__content');
    this.appContent.innerHTML = this.view.renderPreloader();
  }

  preloaderCountDown() {
    const countNumber = this.model.countTillThree();
    if (countNumber > 0) {
      document.querySelector('.countdown').innerHTML = countNumber;
      setTimeout(this.preloaderCountDown.bind(this), 1000);
    }
  }

  clickSavannahBtn() {
    this.savannahBtn = document.querySelector('.savannah-game');
    this.savannahBtn.addEventListener('click', () => {
      this.init();
    });
  }
}

export default SavannahController;
