import AudiocallView from './View';
import AudiocallModel from './Model';

class AudiocallController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash) {
    this.defaultHash = defaultHash;
    this.model = new AudiocallModel();
    this.view = new AudiocallView(this.model, this.defaultHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.render();
    this.view.addListeners();
  }
}

export default AudiocallController;
