import FirebaseModel from '../models/firebaseModel';
import MainView from '../views/mainView';
import MainModel from '../models/mainModel';

export default class MainController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.mainModel = new MainModel();
    this.mainView = new MainView(this.mainModel);
  }

  async init() {
    this.firebaseModel.onAuthStateChangedHandler();
    this.mainModel.init();
    this.mainView.init();
    this.accessData = this.mainModel.getAccessData();
    if (this.accessData.username) {
      this.user = await this.mainModel.getUser();
      this.mainView.showSettingsModal(this.user);
    }
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.mainView.onLogOut = () => {
      this.firebaseModel.onLogOut();
    };
  }
}
