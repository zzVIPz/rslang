// import STAT_CONST from './dailyStatisticsConstants';
import DailyStatisticsView from './view/dailyStatisticsView';

export default class DailyStatisticsController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.statView = new DailyStatisticsView();
    this.statData = null;
    this.aggregatedWordsCount = null;
    // this.statObj = STAT_CONST;
  }

  async init() {
    this.getDate();

    // await this.getAggregatedWordsCount();
    await this.getData();
    console.log(this.statData);

    // if (!this.statData.optional.progress) {
    //   this.statData.optional.progress = {};
    // }
    // await this.setDateInProgress();
    // if (!(this.date in this.statData.optional.progress)) {
    //   await this.setDateInProgress();
    // }
  }

  getDate() {
    const currentDate = new Date('07/13/2020');
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

  // async learnedWordsUpdate(count) {
  //   this.getDate();
  //   this.statData.learnedWords += count;
  //   await this.setDateInProgress();
  // }

  async gameStartsStat(game) {
    this.statData.optional.games[game] += 1;
    await this.setData();
  }

  // async setDateInProgress() {
  //   this.statData.learnedWords = this.aggregatedWordsCount.easy;
  //   this.statData.optional.progress[this.date] = this.aggregatedWordsCount.easy;
  //   await this.setData();
  // }

  async renderStat() {
    // await this.getAggregatedWordsCount();
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
