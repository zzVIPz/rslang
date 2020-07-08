import STAT_CONST from './dailyStatisticsConstants';

export default class DailyStatisticsController {
  constructor(mainModel) {
    this.mainModel = mainModel;
    this.statObj = STAT_CONST;
  }

  async init() {
    // await this.mainModel.setUserStatistic(this.statObj);
    // console.log(this.mainModel.userId, this.mainModel.token);
    await this.mainModel.getUserStatistic();
    this.getDate();
  }

  getDate() {
    this.currentDate = new Date();
    let day = this.currentDate.getDate();
    if (day < 10) day = `0${day}`;

    let month = this.currentDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;

    const year = this.currentDate.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    console.log(dateString);
  }
}
