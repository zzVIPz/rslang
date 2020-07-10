import dailyStatisticsTemplate from './dailyStatisticsTemplate';

export default class DailyStatisticsView {
  constructor() {
    this.template = dailyStatisticsTemplate;
  }

  renderStatistics(data, aggregatedWords) {
    document.querySelector('.main').innerHTML = this.template(data, aggregatedWords);
  }
}
