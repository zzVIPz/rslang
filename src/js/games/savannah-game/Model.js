class SavannahModel {
  constructor() {
    this.difficultyLevel = {
      level: 0,
    };
  }

  countTillThree() {
    this.preloaderNumber = Number(document.querySelector('.countdown').innerHTML);
    if (this.preloaderNumber > 0) {
      this.preloaderNumber -= 1;
    }
    return this.preloaderNumber;
  }
}

export default SavannahModel;
