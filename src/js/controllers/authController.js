import FirebaseModel from '../models/firebaseModel';
import AuthModel from '../models/authModel';
import AuthView from '../views/authView';
import checkEmail from '../utils/checkEmail';
import checkPassword from '../utils/checkPassword';

export default class AuthController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.authModel = new AuthModel();
    this.authView = new AuthView();
    this.mode = true;
    this.modal = true;
  }

  init() {
    this.authView.addListeners();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.authView.onEnterPress = () => {
      this.authorizeUser();
    };

    this.authView.onBtnFormClickHandler = () => {
      this.authorizeUser();
    };

    this.authView.onLoginSelectionClick = () => {
      this.mode = !this.mode;
      this.authView.setDefaultState();
      this.authView.setText(this.mode);
    };

    this.authView.onPasswordInput = () => {
      const passwordValue = this.authView.getPasswordValue();
      if (checkPassword(passwordValue)) {
        this.authView.removePasswordErrorMessage();
      }
    };

    this.authView.onEmailError = () => {
      const emailValue = this.authView.getEmailValue();
      if (checkEmail(emailValue)) {
        this.authView.removeEmailErrorMessage();
      }
    };
  }

  authorizeUser() {
    if (!this.checkUserData()) {
      if (this.mode) {
        this.onSignIn(this.emailValue, this.passwordValue);
      } else {
        this.onRegistration(this.username, this.emailValue, this.passwordValue);
      }
    }
  }

  checkUserData() {
    let errorCounter = 0;
    this.passwordValue = this.authView.getPasswordValue();
    if (!checkPassword(this.passwordValue)) {
      errorCounter += 1;
      this.authView.showPasswordErrorMessage();
    }

    this.emailValue = this.authView.getEmailValue();
    if (!checkEmail(this.emailValue)) {
      errorCounter += 1;
      this.authView.showEmailErrorMessage();
    }
    if (!this.mode) {
      this.username = this.authView.getUsernameValue();
      if (!this.username) {
        errorCounter += 1;
        this.authView.showNameErrorMessage();
      }
    }
    return errorCounter;
  }

  onError = (e) => {
    this.authView.showModalMessage(e);
    this.authView.closeModalWindow();
  };

  onSignIn = async (email, password) => {
    try {
      await this.firebaseModel.auth.signInWithEmailAndPassword(email, password);
      await this.authModel.loginUser({ email, password });
      this.authView.showMainPage();
    } catch (e) {
      this.onError(e);
    }
  };

  onRegistration = async (name, email, password) => {
    try {
      await this.firebaseModel.auth.createUserWithEmailAndPassword(email, password);
      this.firebaseModel.writeUserData(email, name, password);
      const requestObject = { email, password };
      await this.authModel.createUser(requestObject);
      await this.authModel.loginUser(requestObject, name);
      this.authView.showMainPage();
    } catch (e) {
      this.onError(e);
    }
  };
}
