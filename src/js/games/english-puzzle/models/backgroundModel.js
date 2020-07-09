import paintings1 from './paintings-data/level1';
import paintings2 from './paintings-data/level2';
import paintings3 from './paintings-data/level3';
import paintings4 from './paintings-data/level4';
import paintings5 from './paintings-data/level5';
import paintings6 from './paintings-data/level6';
import CONSTANTS from '../constants/constants';

export default class BackgroundsModel {
  constructor(difficultLevel) {
    this.difficultLevel = difficultLevel;
  }

  getData(gameLevel) {
    const { difficultLevel } = this;
    let currentData = paintings1;

    switch (difficultLevel) {
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

    let gameLevelIndex = gameLevel;
    if (gameLevel > currentData.length) {
      gameLevelIndex = gameLevel - CONSTANTS.MISSING_PAINTINGS_DATA_OFFSET;
    } else {
      gameLevelIndex = gameLevel - CONSTANTS.INDEX_OFFSET;
    }

    return currentData[gameLevelIndex];
  }
}
