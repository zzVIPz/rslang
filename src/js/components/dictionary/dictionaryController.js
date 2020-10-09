/* eslint-disable no-underscore-dangle */
import DictionaryView from './view/dictionaryView';
import CONSTANTS from './dictionaryConstants';

export default class DictionaryController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.user = this.mainModel.currentUser;
    this.dictionaryView = new DictionaryView();
    this.wordsData = null;
    this.state = CONSTANTS.DEFAULT_DICT_STATE;
  }

  async init() {
    this.dictionaryView.render();
    await this.getData();
    this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    this.subscribeToEvents();
    this.dictionaryView.addListeners();
  }

  async getData() {
    this.dictionaryView.showPreloader(this.dictionaryView.domElements.wordsData);
    const data = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': this.state }, 3600);
    this.wordsData = data[0].paginatedResults;
  }

  getWordOptional(id) {
    let optional;
    this.wordsData.forEach((el) => {
      if (el._id === id) {
        optional = el.userWord.optional;
      }
    });
    return optional;
  }

  subscribeToEvents() {
    this.dictionaryView.onStateChange = async (state) => {
      this.state = state;
      await this.getData();
      this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    };

    this.dictionaryView.onWordToDifficult = async (id) => {
      const optional = this.getWordOptional(id);
      delete optional.mistakesCounter;
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.DIFFICULT, optional);
      await this.getData();
      this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    };

    this.dictionaryView.onWordRemove = async (id) => {
      const optional = this.getWordOptional(id);
      delete optional.mistakesCounter;
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.REMOVED, optional);
      await this.getData();
      this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    };

    this.dictionaryView.onWordRestore = async (id) => {
      const optional = this.getWordOptional(id);
      const newOptional = Object.assign(optional, CONSTANTS.DEFAULT_MISTAKES_COUNT);
      await this.mainModel.updateUserWord(id, CONSTANTS.DICT_STATES.LEARNING, newOptional);
      await this.getData();
      this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    };

    this.dictionaryView.onInfoRequest = async (id) => {
      const wordInfo = await this.mainModel.getAggregatedWordById(id);
      this.dictionaryView.renderModal(wordInfo, this.user);
    };

    this.mainModel.onSetUserSettings = (user) => {
      this.user = user;
      this.dictionaryView.renderLines(this.wordsData, this.user, this.state);
    };
  }
}
