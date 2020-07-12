import SavannahView from './Views/View';
import SavannahModel from './Model';
import { DELAY_CHECK_HASH } from './constSavannah';

class SavannahController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash, currentHash, parseLearningWords) {
    this.defaultHash = defaultHash;
    this.currentHash = currentHash;
    this.model = new SavannahModel();
    this.view = new SavannahView(
      this.model,
      this.defaultHash,
      this.currentHash,
      parseLearningWords,
    );
    this.view.getViewUser(this.user, this.mainView);
    this.view.renderSavannah();
    setTimeout(() => { this.view.checkSavannahWindow(); }, DELAY_CHECK_HASH);
  }
}

function createSavannaGame(mainCtrl) {
  if (!document.querySelector('.savannah__app')) {
    const savannah = new SavannahController(mainCtrl.user, mainCtrl.mainView);
    savannah.init(
      mainCtrl.setDefaultHash,
      mainCtrl.getCurrentHash,
      mainCtrl.parseLearningWords.bind(mainCtrl),
    );
  }
}

export default createSavannaGame;
