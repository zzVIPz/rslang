import SavannahView from './View';

class SavannahModel {
  constructor() {
    this.difficultyLevel = {
      level: 0,
    };
    this.view = new SavannahView();
  }

  countTillOne() {
    this.preloaderNumber = Number(document.querySelector('.countdown').innerHTML);
    if (this.preloaderNumber > 0) {
      this.preloaderNumber -= 1;
    }
    if (this.preloaderNumber < 1) {
      this.view.renderCountDownFinished('love');
    }
    return this.preloaderNumber;
  }
}

export default SavannahModel;
