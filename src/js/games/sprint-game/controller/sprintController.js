import SprintView from '../view/sprintView';
import SprintModel from '../model/sprintModel';

export default class SprintController {
  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
  }

  init() {
    this.startGame();
  }

  startGame() {
    this.view.renderStartLayout();
    document.querySelector('.sprint-button--start')
      .addEventListener('click', () => {
        this.game();
      });
  }

  game() {
    console.log('start');
    this.view.renderGameLayout();
    document.querySelector('.sprint-button--right')
      .addEventListener('click', this.checkAnswer);
    document.querySelector('.sprint-button--wrong')
      .addEventListener('click', this.checkAnswer);
    this.startCountdown(10);
  }

  endGame() {
    this.view.showFinalStat();
    document.querySelector('.sprint-button--repeate')
      .addEventListener('click', () => { this.startGame(); });
  }

  // to do
  checkAnswer(event) {
    this.event = event;
    console.log(event.target.id);
  }

  startCountdown(from) {
    this.current = from;
    this.current -= 1;
    if (this.current > 0) {
      this.view.showTime(this.current);
      setTimeout(this.startCountdown.bind(this), 1000, this.current);
    } else {
      this.endGame();
    }
  }
}
