import DictionaryView from './dictionaryView';

export default class DictionaryController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.dictionaryView = new DictionaryView();
  }

  async init() {
    this.dictionaryView.render();
    const wordsData = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': 'easy' });
    this.dictionaryView.renderData(wordsData[0].paginatedResults);
  }
}
