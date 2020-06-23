import Swiper from 'swiper';
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
    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.firebaseModel.onAuthStateChangedHandler();
    this.mainModel.init();
    this.accessData = this.mainModel.getAccessData();
    const { username } = this.accessData;
    this.user = await this.mainModel.getUser();
    this.mainView.init(this.user, this.swiper);
    this.mainView.renderMain(this.user);
    if (username) {
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
