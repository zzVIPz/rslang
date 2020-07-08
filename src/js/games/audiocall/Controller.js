import AudiocallView from './View';
import AudiocallModel from './Model';

class AudiocallController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash, currentHash) {
    this.defaultHash = defaultHash;
    this.currentHash = currentHash;
    this.model = new AudiocallModel();
    this.view = new AudiocallView(this.model, this.defaultHash, this.currentHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.render();
    this.view.addListeners();
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.view.onContinueGame = () => {
      this.init(this.setDefaultHash, this.getCurrentHash);
    };
  }
}

export default AudiocallController;
