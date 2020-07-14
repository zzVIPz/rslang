import renderChartLinear from './dailyStatisticsChartLinear';
import renderChartBar from './dailyStatisticsChartBar';
import renderChartPolarArea from './dailyStatistcsChartPolarArea';
import dailyStatisticsTemplate from './dailyStatisticsTemplate';

export default class DailyStatisticsView {
  constructor() {
    this.template = dailyStatisticsTemplate;
    this.domElements = { main: document.querySelector('.main') };
  }

  renderStatistics(data, aggregatedWords) {
    this.domElements.main.innerHTML = this.template(data, aggregatedWords);
    const canvasGeneral = document.getElementById('statisticsChartGeneral');
    const canvasGames = document.getElementById('statisticsChartGames');
    const canvasWords = document.getElementById('statisticsChartWords');
    const generalAxisX = Object.keys(data.optional.progress);
    const dataValues = Object.values(data.optional.progress);
    const generalAxisY = [];
    for (let i = 0 ; i < dataValues.length ; i ++) {
      generalAxisY.push(dataValues[i][0]);
    }

    console.log('general axis Y is:', generalAxisY);
    renderChartLinear(canvasGeneral, generalAxisX, generalAxisY);
    const gamesAxisX = Object.values(data.optional.games);
    renderChartBar(canvasGames, gamesAxisX);
    const wordsGroupData = Object.values(aggregatedWords);
    renderChartPolarArea(canvasWords, wordsGroupData);
  }

  showPreloader(parent) {
    this.domElements.preloader = document.createElement('div');
    this.domElements.preloader.classList.add('data-preloader');
    const parentElement = parent;
    parentElement.innerHTML = '';
    parent.append(this.domElements.preloader);
  }
}
