import renderChartLinear from './dailyStatisticsChartLinear';
import renderChartBar from './dailyStatisticsChartBar';
import renderChartPolarArea from './dailyStatistcsChartPolarArea';
import dailyStatisticsTemplate from './dailyStatisticsTemplate';

export default class DailyStatisticsView {
  constructor() {
    this.template = dailyStatisticsTemplate;
  }

  renderStatistics(data, aggregatedWords) {
    document.querySelector('.main').innerHTML = this.template(data, aggregatedWords);
    const canvasGeneral = document.getElementById('statisticsChartGeneral');
    const canvasGames = document.getElementById('statisticsChartGames');
    const canvasWords = document.getElementById('statisticsChartWords');
    const generalAxisX = Object.keys(data.optional.progress);
    const generalAxisY = Object.values(data.optional.progress);
    renderChartLinear(canvasGeneral, generalAxisX, generalAxisY);
    const gamesAxisX = Object.values(data.optional.games);
    renderChartBar(canvasGames, gamesAxisX);
    const wordsGroupData = Object.values(aggregatedWords);
    renderChartPolarArea(canvasWords, wordsGroupData);
  }
}
