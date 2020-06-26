import SavannahView from './Views/View';
import SavannahModel from './Model';

class SavannahController {
  constructor(user, mainView) {
    this.userData = '';
    this.user = user;
    this.mainView = mainView;
  }

  init() {
    this.model = new SavannahModel();
    this.view = new SavannahView(this.model);
    this.view.getViewUser(this.user, this.mainView);
    this.view.renderSavannah();
  }
}

export default SavannahController;
