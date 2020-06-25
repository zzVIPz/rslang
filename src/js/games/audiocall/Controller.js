import AudiocallView from './View';

class AudiocallController {
  constructor(user, mainView) {
    this.view = new AudiocallView();
    this.userData = '';
    this.user = user;
    this.mainView = mainView;
  }

  init() {
    this.view.render();
    this.view.addListeners();
    this.view.getViewUser(this.user, this.mainView);
  }
}

export default AudiocallController;
