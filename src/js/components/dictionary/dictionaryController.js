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
    this.dictionaryView.renderData(this.wordsData, this.state);
    this.subscribeToEvents();
    this.dictionaryView.addListeners();
  }

  async getData() {
    const data = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': this.state });
    this.wordsData = data[0].paginatedResults;
  }

  subscribeToEvents() {
    this.dictionaryView.onStateChange = async (state) => {
      this.state = state;
      await this.getData();
      this.dictionaryView.renderData(this.wordsData, this.state);
    };

    this.dictionaryView.onWordToDifficult = async (id) => {
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.DIFFICULT);
      await this.getData();
      this.dictionaryView.renderData(this.wordsData, this.state);
    };

    this.dictionaryView.onWordRemove = async (id) => {
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.REMOVED);
      await this.getData();
      this.dictionaryView.renderData(this.wordsData, this.state);
    };

    this.dictionaryView.onWordRestore = async (id) => {
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.LEARNING,
        CONSTANTS.DEFAULT_MISTAKES_COUNT);
      await this.getData();
      this.dictionaryView.renderData(this.wordsData, this.state);
    };

    this.dictionaryView.onInfoRequest = async (id) => {
      const wordInfo = await this.mainModel.getAggregatedWordById(id);
      this.dictionaryView.showModal(wordInfo);
    };
  }
}
