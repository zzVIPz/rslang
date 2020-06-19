import { startLayout, gameLayout, finalStatLayout } from './layouts';

export default class SprintView {
  constructor() {
    this.mainContainer = document.querySelector('.main');
    this.startLayout = startLayout;
    this.gameLayout = gameLayout;
    this.finalStatLayout = finalStatLayout;
  }

  renderStartLayout() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.startLayout);
  }

  renderGameLayout() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.gameLayout);
  }

  showTime(time) {
    this.timer = document.querySelector('.sprint-timer');
    this.timer.innerHTML = time;
  }

  showFinalStat() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
  }
}
