import LOGIN_FORM_TEXT from '../constants/constAuthView';
import checkEmail from '../utils/checkEmail';
import checkPassword from '../utils/checkPassword';
import getModalErrorTemplate from '../utils/getModalErrorTemplate';
import getLoginFormText from '../utils/getLoginFormText';

/* todo:  */
import EnglishPuzzleController from '../games/english-puzzle/controllers/englishPuzzleController';

export default class IndexView {
  constructor() {
    // todo: берем кнопку
    this.btnDrawGame = document.querySelector('.button-draw-game');
    this.loginMessage = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.name = document.querySelector('.user-name');
    this.main = document.querySelector('.main');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.loginSelection = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.mode = true;
    this.modal = true;
    this.onSignIn = null;
    this.onRegistration = null;
  }

  setText() {
    this.name.classList.toggle('user-name--active');
    if (this.mode) {
      this.formButton.setAttribute('value', LOGIN_FORM_TEXT.btnLogInText);
      const formattedTemplate = getLoginFormText(
        LOGIN_FORM_TEXT.newUserText,
        LOGIN_FORM_TEXT.btnSingUpText,
      );
      this.loginMessage.innerHTML = formattedTemplate;
    } else {
      this.formButton.setAttribute('value', LOGIN_FORM_TEXT.btnSingUpText);
      const formattedTemplate = getLoginFormText(
        LOGIN_FORM_TEXT.existingUserText,
        LOGIN_FORM_TEXT.btnLogInText,
      );
      this.loginMessage.innerHTML = formattedTemplate;
    }
  }

  showModalMessage(message) {
    const code = message.code.replace(/-/g, ' ').slice(5);
    const formattedTemplate = getModalErrorTemplate(code.toUpperCase(), message.message);
    this.main.insertAdjacentHTML('afterBegin', formattedTemplate);
  }

  addListeners() {
    // todo: вешаем лиссенер
    this.addBtbDrawGame();

    this.addBtnFormClickHandler();
    this.addLoginSelectionClickHandler();
  }

  addBtbDrawGame() {
    this.btnDrawGame.addEventListener('click', () => {
      this.main.innerText = '';
      // рендерим нашу игру
      const englishPuzzle = new EnglishPuzzleController();
      englishPuzzle.init();
    });
  }

  addLoginSelectionClickHandler() {
    this.loginSelection.addEventListener('click', () => {
      this.setDefaultState();
      this.mode = !this.mode;
      this.setText();
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
          this.onSignIn(this.email.value, this.password.value);
        } else {
          this.onRegistration(this.name.value, this.email.value, this.password.value);
        }
      }
    });
  }

  showMainPage = () => document.location.replace('../pages/main.html');

  closeModalWindow() {
    if (this.modal) {
      this.modal = false;
      this.addButtonCloseModalClickHandler();
      this.setTimeoutModalClose();
    }
  }

  checkUserData() {
    let errorCounter = 0;
    if (!checkPassword(this.password.value)) {
      errorCounter += 1;
      this.showPasswordErrorMessage();
    }
    if (!checkEmail(this.email.value)) {
      errorCounter += 1;
      this.showEmailErrorMessage();
    }
    if (!this.mode) {
      if (!this.name.value) {
        errorCounter += 1;
        this.showNameErrorMessage();
      }
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

  setTimeoutModalClose() {
    this.modalTimer = setTimeout(() => {
      this.removeModalWindow();
    }, 3500);
  }

  removeModalWindow = () => {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  };
}
