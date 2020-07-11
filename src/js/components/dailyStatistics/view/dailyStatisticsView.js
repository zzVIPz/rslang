import renderChartLinear from './dailyStatisticsChartLinear';
import renderChartBar from './dailyStatisticsChartBar';
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
    const GeneralAxisX = Object.keys(data.optional.progress);
    const GeneralAxisY = Object.values(data.optional.progress);
    renderChartLinear(canvasGeneral, GeneralAxisX, GeneralAxisY);
    console.log(data.optional.games);
    const GamesAxisX = Object.values(data.optional.games);
    const GamesAxisY = Object.keys(data.optional.games);
    renderChartBar(canvasGames, GamesAxisX, GamesAxisY);
  }
}
