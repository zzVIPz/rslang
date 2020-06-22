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

  renderGameData(score, word, wordTranslate, points, rightAnswersCount) {
    this.score = score;
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.points = points;
    this.rightAnswersCount = rightAnswersCount;
    document.querySelector('.sprint-score').innerHTML = this.score;
    document.querySelector('#word').innerHTML = this.word;
    document.querySelector('#translation').innerHTML = this.wordTranslate;
    document.querySelector('.sprint-points-line').innerHTML = `+${this.points} очков за слово`;
    const marks = document.querySelectorAll('.sprint-mark');
    const activatedMarks = document.querySelectorAll('.sprint-mark');
    if (this.rightAnswersCount > 0 && this.rightAnswersCount < 4) {
      marks[this.rightAnswersCount - 1].classList.add('activated');
    } else if (activatedMarks || this.rightAnswersCount === 4) {
      activatedMarks.forEach((el) => el.classList.remove('activated'));
    }
  }

  showTime(time) {
    this.timer = document.querySelector('.sprint-timer');
    if (this.timer) { this.timer.innerHTML = time; }
  }

  showFinalStat(score) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
    document.querySelector('.sprint-final-score').innerHTML = score;
  }
}
