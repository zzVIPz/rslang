import WordSearchView from './Word-search-view';
import WordSearchModel from './Word-search-model';

class WordSearchController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash) {
    this.model = new WordSearchModel();
    this.view = new WordSearchView(this.model, defaultHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.init();
  }
}

export default WordSearchController;
