import SavannahView from './View';

class Controller {
  constructor(model) {
    this.model = model;
    this.view = new SavannahView();
  }

  init() {
    this.mainContainer = document.querySelector('.main');
    this.mainContainer.innerHTML = this.view.renderGameLayout();
    this.addListeners();
    // this.changeDifficultyLevel();
  }

  addListeners() {
    console.log('level', this.model.addLevel(2));
    this.closeBtn = document.querySelector('.close');
    this.cancelBtn = document.querySelector('.app__modal__box_cancel');
    this.rating = document.querySelectorAll('.rating__input');
    this.openModal();
    this.closeModal();
  }

  openModal() {
    console.log(this.closeBtn);
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.view.displayModal();
      });
    }
  }

  closeModal() {
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => {
        this.view.hideModal();
      });
    }
  }

  /*   changeDifficultyLevel() {
    console.log(this.rating);
  } */

  clickSavannahBtn() {
    this.savannahBtn = document.querySelector('.savannah-game');
    this.savannahBtn.addEventListener('click', () => {
      this.init();
    });
  }
}

export default Controller;
