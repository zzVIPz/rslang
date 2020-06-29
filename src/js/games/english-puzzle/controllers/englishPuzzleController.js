import EnglishPuzzleModel from '../models/englishPuzzleModel';
import BackgroundModel from '../models/backgroundModel';
import AudioModel from '../models/audioModel';
import EnglishPuzzleView from '../views/englishPuzzleView';
import MainModel from '../../../models/mainModel';
import getPage from '../helpers/getPage';

export default class EnglishPuzzleController {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.englishPuzzleView = new EnglishPuzzleView(this.user, this.mainView);
    this.mainModel = new MainModel();
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.audioModel = new AudioModel();
    this.wordsData = null;
    this.page = 0;
    this.gameLevel = 1;
    this.group = 0;
  }

  /* TODO: define '1' in const as  offsetToFirstIndex */
  async init() {
    this.mainModel.init();
    this.englishPuzzleView.englishPuzzleModel = this.englishPuzzleModel;
    this.englishPuzzleView.audioModel = this.audioModel;
    await this.getData();
    await this.getPainting(this.group + 1);
    this.subscribeToEvents();
  }

  /* TODO: define slicedWordData in class property and use this or define in helper module */
  sliceData(dataArr) {
    let partOfArray = [];
    if (this.gameLevel % 2 !== 0) {
      partOfArray = dataArr.slice(0, 10);
    } else {
      partOfArray = dataArr.slice(10, 20);
    }
    return partOfArray;
  }

  subscribeToEvents() {
    this.englishPuzzleView.onLevelChange = async (level) => {
      this.gameLevel = level;
      const newPage = getPage(this.gameLevel);
      if (this.page !== newPage) {
        this.page = newPage;
        await this.getData();
      }
      await this.getPainting(this.group + 1);
    };

    this.englishPuzzleView.onDifficultChange = async (difficult, level) => {
      const newGroup = difficult - 1;
      this.group = newGroup;
      if (level) {
        this.gameLevel = level;
        this.page = getPage(this.gameLevel);
      }
      await this.getData();
      await this.getPainting(difficult);
    };
  }

  async getData() {
    this.wordsData = await this.mainModel.getWords(this.page, this.group, 20);
  }

  async renderView() {
    const slicedWordData = await this.sliceData(this.wordsData);
    this.audioModel.data = slicedWordData;
    this.englishPuzzleModel.data = slicedWordData;
    this.englishPuzzleView.render();
  }

  async getPainting(difficult) {
    const backgroundModel = new BackgroundModel(difficult);
    const backgroundModelData = await backgroundModel.getData(this.gameLevel);
    this.englishPuzzleView.paintingName = `${backgroundModelData.author} - ${backgroundModelData.name} (${backgroundModelData.year})`;
    this.englishPuzzleView.img.src = `https://raw.githubusercontent.com/NordOst88/rslang_data_paintings/master/${backgroundModelData.cutSrc}`;
    this.englishPuzzleView.img.onload = () => {
      this.renderView();
    };
  }
}
