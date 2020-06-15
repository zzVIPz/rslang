import FirebaseModel from '../models/firebaseModel';
import IndexView from '../views/indexView';

export default class IndexController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.indexView = new IndexView();
  }

  init() {
    this.firebaseModel.onAuthStateChangedHandler();
    this.indexView.addListeners();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    const onError = (e) => {
      this.indexView.showModalMessage(e);
      this.indexView.closeModalWindow();
    };
    this.indexView.onSignIn = async (email, password) => {
      try {
        await this.firebaseModel.auth.signInWithEmailAndPassword(email, password);
        this.indexView.showMainPage();
      } catch (e) {
        onError(e);
      }
    };
    this.indexView.onRegistration = async (name, email, password) => {
      try {
        await this.firebaseModel.auth.createUserWithEmailAndPassword(email, password);
        this.firebaseModel.writeUserData(email, name, password);
        this.indexView.showMainPage();
      } catch (e) {
        onError(e);
      }
    };
  }
}
