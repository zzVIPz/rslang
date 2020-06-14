import BaseController from './baseController';

class mainController extends BaseController {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
  }

  init() {
    console.log('firebase', this.database);
    console.log('auth', this.auth);
    super.authStateChangedHandler();
    this.addListeners();
  }

  addListeners() {
    this.addBtnLogOutClickHandler();
  }

  addBtnLogOutClickHandler() {
    const btn = document.querySelector('.log-out');
    btn.addEventListener('click', () => {
      super.logout();
    });
  }
}

export default mainController;
