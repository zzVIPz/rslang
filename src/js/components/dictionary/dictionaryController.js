import DictionaryView from './dictionaryView';

export default class DictionaryController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.dictionaryView = new DictionaryView();
  }

  init() {
    this.dictionaryView.render();
  }
}
