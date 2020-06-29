import WordSearchView from './View';
import WordSearchModel from './Model';

class WordSearchController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash) {
    this.defaultHash = defaultHash;
    this.model = new WordSearchModel();
    this.view = new WordSearchView(this.model, this.defaultHash);
  }
}

export default WordSearchController;
