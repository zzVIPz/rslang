import FirebaseModel from '../models/firebaseModel';
import AuthModel from '../models/authModel';
import IndexView from '../views/authView';

export default class IndexController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.authModel = new AuthModel();
    this.indexView = new IndexView();
  }

  init() {
    this.firebaseModel.onAuthStateChangedHandler();
    this.indexView.addListeners();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    const onError = (e) => {
      console.log('onError', e);
      this.indexView.showModalMessage(e);
      this.indexView.closeModalWindow();
    };
    this.indexView.onSignIn = async (email, password) => {
      try {
        await this.firebaseModel.auth.signInWithEmailAndPassword(email, password);
        await this.authModel.loginUser({ email, password });
        this.indexView.showMainPage();
      } catch (e) {
        onError(e);
      }
    };
    this.indexView.onRegistration = async (name, email, password) => {
      try {
        await this.firebaseModel.auth.createUserWithEmailAndPassword(email, password);
        this.firebaseModel.writeUserData(email, name, password);
        const requestObject = { email, password };
        await this.authModel.createUser(requestObject);
        await this.authModel.loginUser(requestObject, name);
        this.indexView.showMainPage();
      } catch (e) {
        onError(e);
      }
    };
  }
}