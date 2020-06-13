import * as firebase from 'firebase/app';
import 'firebase/auth';
import BaseController from './baseController';
import checkEmail from '../utils/checkEmail';

class indexController extends BaseController {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.mode = 1;
  }

  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.auth = firebase.auth();
    console.log('firebase', firebase);
    console.log('auth', this.auth);
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.name = document.querySelector('.user-name');
    this.loginSelection = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.addListeners();
  }

  addListeners() {
    // this.addBtnLogInClickHandler();
    // this.addBtnSignUpClickHandler();
    this.addBtnFormClickHandler();
    this.addLoginSelectionClickHandler();
  }

  addLoginSelectionClickHandler() {
    this.loginSelection.addEventListener('click', () => {
      this.email.value = '';
      this.name.value = '';
      this.password.value = '';
      if (this.mode) {
        this.view.setText(this.model.existingUserText);

        this.mode = !this.mode;
      } else {
        this.view.setText(this.model.newUserText);
        this.mode = !this.mode;
      }
    });
  }

  // addBtnSignUpClickHandler() {
  //   const btnSignUp = document.querySelector('.sing-up');
  //   btnSignUp.addEventListener('click', () => {
  //     const promise = this.auth.createUserWithEmailAndPassword(
  //       this.email.value,
  //       this.password.value,
  //     );
  //     console.log('promise'.promise);
  //     promise.catch((e) => console.log(e.message));
  //     console.log('Sing Up!');
  //   });
  // }

  // addBtnLogInClickHandler() {
  //   const btnLogIn = document.querySelector('.log-in');
  //   btnLogIn.addEventListener('click', () => {
  //     const promise = this.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
  //     promise.catch((e) => console.log(e.message));
  //   });
  // }

  addBtnFormClickHandler() {
    this.formButton.addEventListener('click', () => {
      if (!this.checkUserData()) {
        const promise = this.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
        promise.catch((e) => console.log(e.message));
      }
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
    if (this.password.value.length < 6) {
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
    const message = document.querySelector('.user-name-error-message');
    message.classList.add('email-error-message--active');
    this.name.focus();
    this.name.addEventListener('input', () => {
      if (this.email.value) {
        message.classList.remove('email-error-message--active');
      }
    });
  }

  showEmailErrorMessage() {
    const message = document.querySelector('.email-error-message');
    message.classList.add('email-error-message--active');
    this.email.focus();
    this.email.addEventListener('input', () => {
      if (checkEmail(this.email.value)) {
        message.classList.remove('email-error-message--active');
      }
    });
  }

  showPasswordErrorMessage() {
    const message = document.querySelector('.password-error-message');
    message.classList.add('password-error-message--active');
    this.password.focus();
    this.password.addEventListener('input', () => {
      if (this.password.value.length > 5) {
        message.classList.remove('password-error-message--active');
      }
    });
  }
}

export default indexController;
