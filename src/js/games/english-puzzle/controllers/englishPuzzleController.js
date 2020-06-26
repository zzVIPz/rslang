import EnglishPuzzleModel from '../models/englishPuzzleModel';
import BackgroundModel from '../models/backgroundModel';
import EnglishPuzzleView from '../views/englishPuzzleView';
import MainModel from '../../../models/mainModel';
import getPage from '../helpers/getPage';

export default class EnglishPuzzleController {
  constructor() {
    this.englishPuzzleView = new EnglishPuzzleView();
    this.mainModel = new MainModel();
    this.englishPuzzleModel = new EnglishPuzzleModel();
    this.wordsData = null;
    this.page = 0;
    this.gameLevel = 1;
    this.group = 0;
  }

  async init() {
    this.mainModel.init();
    this.englishPuzzleView.englishPuzzleModel = this.englishPuzzleModel;
    await this.getPainting(this.group + 1);
    await this.getData();
    this.renderView();
    this.subscribeToEvents();
  }

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
      await this.getPainting(this.group + 1);
      if (this.page !== newPage) {
        this.page = newPage;
        await this.getData();
        this.renderView();
      } else {
        this.renderView();
      }
    };

    this.englishPuzzleView.onDifficultChange = async (difficult) => {
      const newGroup = difficult - 1;
      this.group = newGroup;
      await this.getData();
      await this.getPainting(difficult);
      this.renderView();
    };
  }

  async getData() {
    this.wordsData = await this.mainModel.getWords(this.page, this.group, 20);
  }

  renderView() {
    const slicedWordData = this.sliceData(this.wordsData);
    this.englishPuzzleModel.data = slicedWordData;
    this.englishPuzzleView.render();
  }

  async getPainting(difficult) {
    const backgroundModel = new BackgroundModel(difficult);
    const backgroundModelData = await backgroundModel.getData(this.gameLevel);
    console.log(backgroundModelData);
    this.englishPuzzleView.paintingName = `${backgroundModelData.author} - ${backgroundModelData.name} (${backgroundModelData.year})`;
    this.englishPuzzleView.img.src = `https://raw.githubusercontent.com/NordOst88/rslang_data_paintings/master/${backgroundModelData.cutSrc}`;
    this.englishPuzzleView.img.onload = () => {
      this.englishPuzzleView.render();
    };
  }
}
