import { LOGIN_FORM_TEXT, DELAY_MODAL_CLOSE } from '../constants/constAuthView';
import getModalErrorTemplate from '../utils/getModalErrorTemplate';
import getLoginFormText from '../utils/getLoginFormText';

export default class IndexView {
  constructor() {
    this.loginMessage = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.name = document.querySelector('.user-name');
    this.main = document.querySelector('.main');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.loginSelection = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
  }

  setText(mode) {
    this.name.classList.toggle('user-name--active');
    if (mode) {
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
    this.addBtnFormClickHandler();
    this.addLoginSelectionClickHandler();
    this.addEnterPress();
  }

  addLoginSelectionClickHandler() {
    this.loginSelection.addEventListener('click', () => {
      this.onLoginSelectionClick();
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

  addEnterPress() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.onEnterPress();
      }
    });
  }

  addBtnFormClickHandler() {
    this.formButton.addEventListener('click', () => {
      this.onBtnFormClickHandler();
    });
  }

  showMainPage = () => document.location.replace('./pages/main.html');

  closeModalWindow() {
    this.addButtonCloseModalClickHandler();
    this.setTimeoutModalClose();
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
    this.email.addEventListener('input', this.onEmailError);
  }

  getEmailValue = () => this.email.value;

  getUsernameValue = () => this.name.value;

  removeEmailErrorMessage() {
    this.messageEmail.classList.remove('email-error-message--active');
    this.email.removeEventListener('input', this.onEmailError);
  }

  showPasswordErrorMessage() {
    this.messagePassword = document.querySelector('.password-error-message');
    this.messagePassword.classList.add('password-error-message--active');
    this.password.focus();
    this.password.addEventListener('input', this.onPasswordInput);
  }

  getPasswordValue = () => this.password.value;

  removePasswordErrorMessage() {
    this.messagePassword.classList.remove('password-error-message--active');
    this.password.removeEventListener('input', this.onPasswordInput);
  }

  addButtonCloseModalClickHandler() {
    const closeBtn = document.querySelector('.modal__button-close');
    const onCloseBtnPress = () => {
      clearTimeout(this.modalTimer);
      this.removeModalWindow();
      closeBtn.removeEventListener('click', onCloseBtnPress);
    };
    closeBtn.addEventListener('click', onCloseBtnPress);
  }

  setTimeoutModalClose() {
    this.modalTimer = setTimeout(() => {
      this.removeModalWindow();
    }, DELAY_MODAL_CLOSE);
  }

  removeModalWindow = () => {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  };
}
