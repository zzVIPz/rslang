import BaseController from './baseController';
import checkEmail from '../utils/checkEmail';
import checkPassword from '../utils/checkPassword';

class indexController extends BaseController {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
  }

  init() {
    console.log('firebase', this.database);
    console.log('auth', this.auth);
    this.mode = 1;
    this.modal = true;
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.name = document.querySelector('.user-name');
    this.loginSelection = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.addListeners();
  }

  addListeners() {
    this.addBtnLogOutClickHandler();
    this.addBtnFormClickHandler();
    this.addLoginSelectionClickHandler();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // todo: show modal on refresh
        console.log('user log in');
      } else {
        console.log('user log out');
      }
    });
  }

  addBtnLogOutClickHandler() {
    const btn = document.querySelector('.log-out');
    btn.addEventListener('click', () => {
      super.logout();
    });
  }

  addLoginSelectionClickHandler() {
    this.loginSelection.addEventListener('click', () => {
      this.setDefaultState();
      if (this.mode) {
        this.view.setText(this.model.existingUserText);

        this.mode = !this.mode;
      } else {
        this.view.setText(this.model.newUserText);
        this.mode = !this.mode;
      }
    });
  }

  setDefaultState() {
    this.email.value = '';
    this.name.value = '';
    this.password.value = '';
    if (this.messageEmail) {
      this.messageEmail.classList.remove('email-error-message--active');
    }
    if (this.messageName) {
      this.messageName.classList.remove('user-name-error-message--active');
    }
    if (this.messagePassword) {
      this.messagePassword.classList.remove('password-error-message--active');
    }
  }

  addBtnFormClickHandler() {
    this.formButton.addEventListener('click', () => {
      if (!this.checkUserData()) {
        if (this.mode) {
          this.auth
            .signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(() => {
              this.showMainPage();
            })
            .catch((error) => {
              console.log(error.code, error.message);
              this.view.showModalMessage(this.model.modal, error);
              this.closeModalWindow();
            });
        } else {
          this.auth
            .createUserWithEmailAndPassword(this.email.value, this.password.value)
            .then(() => {
              const userId = this.auth.currentUser.uid;
              this.writeUserData(userId, this.email.value, this.name.value, this.password.value);
              this.showMainPage();
            })
            .catch((error) => {
              console.log(error.code, error.message);
              this.view.showModalMessage(this.model.modal, error);
              this.closeModalWindow();
            });
        }
      }
    });
  }

  showMainPage() {
    window.location.href = '../pages/main.html';
    // document.location.replace('../pages/main.html');
  }

  closeModalWindow() {
    if (this.modal) {
      this.modal = false;
      this.addButtonCloseModalClickHandler();
    }
    this.setSetTimeout();
  }

  writeUserData(userId, email, username, password) {
    this.database.ref(`users/${userId}`).set({
      username,
      email,
      password,
    });
  }

  checkUserData() {
    let errorCounter = 0;
    if (!this.mode) {
      if (!this.name.value) {
        errorCounter += 1;
        this.showNameErrorMessage();
      }
    }
    if (!checkPassword(this.password.value)) {
      errorCounter += 1;
      this.showPasswordErrorMessage();
    }
    if (!checkEmail(this.email.value)) {
      errorCounter += 1;
      this.showEmailErrorMessage();
    }
    return errorCounter;
  }

  showNameErrorMessage() {
    this.messageName = document.querySelector('.user-name-error-message');
    this.messageName.classList.add('user-name-error-message--active');
    this.name.focus();
    this.name.addEventListener('input', () => {
      if (this.email.value) {
        this.messageName.classList.remove('user-name-error-message--active');
      }
    });
  }

  showEmailErrorMessage() {
    this.messageEmail = document.querySelector('.email-error-message');
    this.messageEmail.classList.add('email-error-message--active');
    this.email.focus();
    this.email.addEventListener('input', () => {
      if (checkEmail(this.email.value)) {
        this.messageEmail.classList.remove('email-error-message--active');
      }
    });
  }

  showPasswordErrorMessage() {
    this.messagePassword = document.querySelector('.password-error-message');
    this.messagePassword.classList.add('password-error-message--active');
    this.password.focus();
    this.password.addEventListener('input', () => {
      if (checkPassword(this.password.value)) {
        this.messagePassword.classList.remove('password-error-message--active');
      }
    });
  }

  addButtonCloseModalClickHandler() {
    const closeBtn = document.querySelector('.modal__button-close');

    closeBtn.addEventListener('click', () => {
      clearTimeout(this.modalTimer);
      this.removeModalWindow();
    });
  }

  setSetTimeout() {
    this.modalTimer = setTimeout(() => {
      this.removeModalWindow();
    }, 3000);
  }

  removeModalWindow() {
    const modal = document.querySelector('.modal');
    clearTimeout(this.modalTimer);
    if (modal) {
      modal.remove();
    }
  }
}

export default indexController;
