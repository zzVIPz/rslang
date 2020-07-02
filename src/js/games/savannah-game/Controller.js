import SavannahView from './Views/View';
import SavannahModel from './Model';
import { DELAY } from './constSavannah';

class SavannahController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash) {
    this.defaultHash = defaultHash;
    this.model = new SavannahModel();
    this.view = new SavannahView(this.model, this.defaultHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.renderSavannah();
    setTimeout(() => { this.view.checkSavannahWindow(); }, DELAY);
  }
}

export default SavannahController;
