import paintings1 from './paintings-data/level1';
import paintings2 from './paintings-data/level2';
import paintings3 from './paintings-data/level3';
import paintings4 from './paintings-data/level4';
import paintings5 from './paintings-data/level5';
import paintings6 from './paintings-data/level6';

export default class BackgroundsModel {
  constructor(difficultLevel) {
    this.difficultLevel = difficultLevel;
  }

  getData(gameLevel) {
    const { difficultLevel } = this;
    let currentData = paintings1;

    switch (difficultLevel) {
      case 1:
        currentData = paintings1;
        break;
      case 2:
        currentData = paintings2;
        break;
      case 3:
        currentData = paintings3;
        break;
      case 4:
        currentData = paintings4;
        break;
      case 5:
        currentData = paintings5;
        break;
      case 6:
        currentData = paintings6;
        break;
      default:
        currentData = paintings1;
    }

    /* TODO: define '1' and '40' to offsetIndex consts */
    let gameLevelIndex = gameLevel;
    if (gameLevel > currentData.length) {
      gameLevelIndex = gameLevel - 40;
    } else {
      gameLevelIndex = gameLevel - 1;
    }

    return currentData[gameLevelIndex];
  }
}
