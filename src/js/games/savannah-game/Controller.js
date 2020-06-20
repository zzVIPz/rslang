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
      document.body.classList.remove('app__background');
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
    document.querySelector('.app').removeChild(document.querySelector('.app__rating'));
    this.appContent.innerHTML = this.view.renderPreloader();
  }

  preloaderCountDown() {
    const countNumber = this.model.countTillOne();
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
}

export default SavannahController;
