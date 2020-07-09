import STAT_CONST from './dailyStatisticsConstants';

export default class DailyStatisticsController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.statObj = STAT_CONST;
  }

  async init() {
    // console.log(this.mainModel.userId, this.mainModel.token);
    await this.getData();

    this.getDate();
    if (!this.statData.optional.progress) {
      this.statData.optional.progress = {};
    }
    if (!(this.date in this.statData.optional.progress)) {
      await this.setDateInProgress();
    }
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
    const data = await this.mainModel.getUserStatistic();
    delete data.id;
    this.statData = data;
  }

  async setData() {
    await this.mainModel.setUserStatistic(this.statData);
  }

  async learnedWordsUpdate(count) {
    this.getDate();
    this.statData.learnedWords += count;
    await this.setDateInProgress();
  }

  async gameStartsStat(game) {
    this.statData.optional.games[game] += 1;
    await this.setData();
  }

  async setDateInProgress() {
    this.statData.optional.progress[this.date] = this.statData.learnedWords;
    await this.setData();
  }
}
