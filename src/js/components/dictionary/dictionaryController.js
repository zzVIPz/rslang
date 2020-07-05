import DictionaryView from './dictionaryView';
import CONSTANTS from './dictionaryConstants';

export default class DictionaryController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.dictionaryView = new DictionaryView();
    this.wordsData = null;
    this.state = CONSTANTS.DEFAULT_DICT_STATE;
  }

  async init() {
    await this.getData();
    this.dictionaryView.render();
    this.dictionaryView.renderData(this.wordsData);
    this.subscribeToEvents();
    // console.log(this.mainModel.userId, this.mainModel.token);
  }

  async getData() {
    const data = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': this.state });
    this.wordsData = data[0].paginatedResults;
  }

  subscribeToEvents() {
    this.dictionaryView.onStateChange = async (state) => {
      this.state = state;
      await this.getData();
      this.dictionaryView.renderData(this.wordsData);
    };
  }
}
