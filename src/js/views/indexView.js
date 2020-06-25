import CONST_INDEX_VIEW from '../constants/constIndexView';
import checkEmail from '../utils/checkEmail';
import checkPassword from '../utils/checkPassword';

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
    this.constIndexView = CONST_INDEX_VIEW;
    this.logIn = this.constIndexView.mode.logIn;
    this.signUp = this.constIndexView.mode.signUp;
    this.mode = this.logIn;
    this.modal = true;
    this.onSignIn = null;
    this.onRegistration = null;
  }

  setText(data) {
    this.name.classList.toggle('user-name--active');
    this.formButton.setAttribute('value', data[2]);
    const formattedTemplate = this.constIndexView.getLoginFormTemplate(data[0], data[1]);
    this.loginMessage.innerHTML = formattedTemplate;
  }

  showModalMessage(message) {
    const code = message.code.replace(/-/g, ' ').slice(5);
    const formattedTemplate = this.constIndexView.getModalTemplate(
      code.toUpperCase(),
      message.message,
    );
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
      if (this.mode === this.logIn) {
        this.setText(this.constIndexView.existingUserText);
        this.mode = this.signUp;
      } else {
        this.setText(this.constIndexView.newUserText);
        this.mode = this.logIn;
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
        if (this.mode === this.logIn) {
          this.onSignIn(this.email.value, this.password.value);
        } else {
          this.onRegistration(this.name.value, this.email.value, this.password.value);
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showMainPage() {
    document.location.replace('../pages/main.html');
  }

  closeModalWindow() {
    if (this.modal) {
      this.modal = false;
      this.addButtonCloseModalClickHandler();
    }
    this.setSetTimeout();
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
    if (this.mode === this.signUp) {
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