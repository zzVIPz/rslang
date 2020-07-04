import SavannahView from './Views/View';
import SavannahModel from './Model';
import { DELAY_CHECK_HASH } from './constSavannah';

class SavannahController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash, currentHash) {
    this.defaultHash = defaultHash;
    this.currentHash = currentHash;
    this.model = new SavannahModel();
    this.view = new SavannahView(this.model, this.defaultHash, this.currentHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.renderSavannah();
    setTimeout(() => { this.view.checkSavannahWindow(); }, DELAY_CHECK_HASH);
  }
}

export default SavannahController;
