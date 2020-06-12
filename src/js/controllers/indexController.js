import * as firebase from 'firebase/app';
import 'firebase/auth';
import BaseController from './baseController';

class indexController extends BaseController {
  constructor() {
    super();
    this.state = 0;
  }

  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.auth = firebase.auth();
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.addListeners();
  }

  addListeners() {
    this.addBtnLogInClickHandler();
    this.addBtnSignUpClickHandler();
  }

  addBtnSignUpClickHandler() {
    const btnSignUp = document.querySelector('.sing-up');
    btnSignUp.addEventListener('click', () => {
      const promise = this.auth.createUserWithEmailAndPassword(
        this.email.value,
        this.password.value,
      );
      promise.catch((e) => console.log(e.message));
      console.log('Sing Up!');
    });
  }

  addBtnLogInClickHandler() {
    const btnLogIn = document.querySelector('.log-in');
    btnLogIn.addEventListener('click', () => {
      const promise = this.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
      promise.catch((e) => console.log(e.message));
    });
  }
}

export default indexController;
