import AudiocallView from './View';
// import AudiocallModel from './Model';

class AudiocallController {
  constructor() {
    // this.model = new AudiocallModel();
    this.view = new AudiocallView();
  }

  init() {
    this.view.render();
    // this.mainContainer = document.querySelector('.main');
    // this.mainContainer.innerHTML = this.view.renderGameLayout();
    // this.addListeners();
  }
}

export default AudiocallController;
