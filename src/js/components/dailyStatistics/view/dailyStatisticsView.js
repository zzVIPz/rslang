import renderChart from './dailyStatisticsChart';
import dailyStatisticsTemplate from './dailyStatisticsTemplate';

export default class DailyStatisticsView {
  constructor() {
    this.template = dailyStatisticsTemplate;
  }

  renderStatistics(data, aggregatedWords) {
    document.querySelector('.main').innerHTML = this.template(data, aggregatedWords);
    const canvas = document.getElementById('statisticsChart');
    const AxisX = Object.keys(data.optional.progress);
    const AxisY = Object.values(data.optional.progress);
    renderChart(canvas, AxisX, AxisY);
  }
}
