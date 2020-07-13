import DailyStatisticsView from './view/dailyStatisticsView';

export default class DailyStatisticsController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.statView = new DailyStatisticsView();
    this.statData = null;
    this.aggregatedWordsCount = null;
  }

  async init() {
    this.getDate();
    await this.getData();
  }

  getDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    if (day < 10) day = `0${day}`;

    let month = currentDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;

    const year = currentDate.getFullYear();
    this.date = `${month}/${day}/${year}`;
  }

  async getData() {
    await this.getAggregatedWordsCount();
    const data = await this.mainModel.getUserStatistic();
    delete data.id;
    if (!data.optional.progress) {
      data.optional.progress = {};
    }
    data.learnedWords = this.aggregatedWordsCount.easy;
    data.optional.progress[this.date] = this.aggregatedWordsCount.easy;
    this.statData = data;
    await this.setData();
  }

  async setData() {
    await this.mainModel.setUserStatistic(this.statData);
  }

  async gameStartsStat(game) {
    this.statData.optional.games[game] += 1;
    await this.setData();
  }

  async renderStat() {
    this.statView.showPreloader(this.statView.domElements.main);
    await this.getData();
    this.statView.renderStatistics(this.statData, this.aggregatedWordsCount);
  }

  async getAggregatedWordsCount() {
    const easy = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': 'easy' });
    const difficult = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': 'difficult' });
    const repeat = await this.mainModel.getAggregatedWords({ 'userWord.difficulty': 'repeat' });
    this.aggregatedWordsCount = {
      easy: easy[0].paginatedResults.length,
      difficult: difficult[0].paginatedResults.length,
      repeat: repeat[0].paginatedResults.length,
    };
  }
}
