import WordSearchView from './Word-search-view';
import WordSearchModel from './Word-search-model';
import { DELAY_CHECK_HASH } from './constants';

class WordSearchController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
  }

  init(defaultHash, currentHash) {
    this.model = new WordSearchModel();
    this.view = new WordSearchView(this.model, defaultHash, currentHash);
    this.view.getViewUser(this.user, this.mainView);
    this.view.init();
    setTimeout(() => { this.view.checkWordSearchWindow(); }, DELAY_CHECK_HASH * 2);
  }
}

function createWordSearch(mainCtrl) {
  if (!document.querySelector('.word-search__app')) {
    const wordSearch = new WordSearchController(mainCtrl.user, mainCtrl.mainView);
    wordSearch.init(mainCtrl.setDefaultHash, mainCtrl.getCurrentHash);
  }
}

export default createWordSearch;
