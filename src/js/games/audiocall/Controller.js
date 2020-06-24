import AudiocallView from './View';
// import AudiocallModel from './Model';

class AudiocallController {
  constructor() {
    // this.model = new AudiocallModel();
    this.view = new AudiocallView();
  }

  init() {
    this.view.render();
    this.view.addListeners();
  }

  clickAudiocallBtn() {
    // this.audiocallBtn = document.querySelector('[data-name="audiocall"]');
    this.audiocallBtn = document.querySelector('.audiocall');
    this.audiocallBtn.addEventListener('click', () => {
      this.init();
    });
  }
}

export default AudiocallController;
