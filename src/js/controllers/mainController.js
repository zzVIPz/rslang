import FirebaseModel from '../models/firebaseModel';
import MainView from '../views/mainView';

export default class MainController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.mainView = new MainView();
  }

  init() {
    this.firebaseModel.onAuthStateChangedHandler();
    this.mainView.init();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.mainView.onLogOut = () => {
      this.firebaseModel.onLogOut();
    };
  }
}
