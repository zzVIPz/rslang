/* eslint-disable prefer-destructuring */
import MainModel from '../../../models/mainModel';
import EnglishPuzzleModel from '../models/englishPuzzleModel';
import BackgroundModel from '../models/backgroundModel';
import AudioModel from '../models/audioModel';
import EnglishPuzzleView from '../views/englishPuzzleView';
import CONSTANTS from '../constants/constants';
import getPage from '../helpers/getPage';

export default class EnglishPuzzleController {
  constructor(user, mainView, setDefaultHash) {
    this.user = user;
    this.setDefaultHash = setDefaultHash;
    this.mainView = mainView;
    this.englishPuzzleView = new EnglishPuzzleView(this.user, this.mainView,
      this.setDefaultHash, this.gameSettings);
    this.mainModel = new MainModel();
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.audioModel = new AudioModel();
    this.wordsData = null;
    this.slicedWordsData = null;
    this.gameLevel = 1;
    this.page = 0;
    this.group = 0;
  }

  async init() {
    if (!this.user.puzzle) {
      Object.assign(this.user, CONSTANTS.DEFAULT_PUZZLE_SETTINGS);
      this.englishPuzzleView.user = this.user;
      this.mainModel.updateUserSettings(this.user);
    } else {
      this.gameLevel = this.user.puzzle.lvl + 1;
      this.page = getPage(this.gameLevel);
      this.group = this.user.puzzle.dif;
    }

    this.englishPuzzleView.englishPuzzleModel = this.englishPuzzleModel;
    this.englishPuzzleView.audioModel = this.audioModel;
    await this.getData();
    this.getPainting(this.group + CONSTANTS.INDEX_OFFSET);
    this.subscribeToEvents();
  }

  sliceData() {
    let partOfArray = [];
    if (this.gameLevel % 2) {
      partOfArray = this.wordsData.slice(0, CONSTANTS.FIRST_TEN_SENTENCES_QUERY);
    } else {
      partOfArray = this.wordsData.slice(CONSTANTS.FIRST_TEN_SENTENCES_QUERY,
        CONSTANTS.SECOND_TEN_SENTENCES_QUERY);
    }
    this.slicedWordsData = partOfArray;
  }

  subscribeToEvents() {
    this.englishPuzzleView.onLevelChange = async (level) => {
      this.gameLevel = level;
      this.user.puzzle.lvl = this.gameLevel - 1;
      await this.mainModel.updateUserSettings(this.user);
      const newPage = getPage(this.gameLevel);
      if (this.page !== newPage) {
        this.page = newPage;
        await this.getData();
      }
      this.getPainting(this.group + CONSTANTS.INDEX_OFFSET);
    };

    this.englishPuzzleView.onDifficultChange = async (difficult, level) => {
      this.group = difficult - CONSTANTS.INDEX_OFFSET;
      this.user.puzzle.dif = this.group;
      if (level) {
        this.gameLevel = level;
        this.user.puzzle.lvl = this.gameLevel - 1;
        this.page = getPage(this.gameLevel);
      }
      await this.mainModel.updateUserSettings(this.user);
      await this.getData();
      this.getPainting(difficult);
    };

    this.englishPuzzleView.onSettingsChange = async (user) => {
      await this.mainModel.updateUserSettings(user);
    };
  }

  async getData() {
    this.wordsData = await this.mainModel
      .getWords(this.page, this.group, CONSTANTS.DEFAULT_REQUEST_WORDS_NUMBER);
  }

  renderView() {
    this.sliceData();
    this.audioModel.data = this.slicedWordsData;
    this.englishPuzzleModel.data = this.slicedWordsData;
    this.englishPuzzleView.render();
  }

  getPainting(difficult) {
    const backgroundModel = new BackgroundModel(difficult);
    const backgroundModelData = backgroundModel.getData(this.gameLevel);
    this.englishPuzzleView.paintingName = `${backgroundModelData.author} - ${backgroundModelData.name} (${backgroundModelData.year})`;
    this.englishPuzzleView.img.src = `https://raw.githubusercontent.com/NordOst88/rslang_data_paintings/master/${backgroundModelData.cutSrc}`;
    this.englishPuzzleView.img.onload = () => {
      this.renderView();
    };
  }
}
