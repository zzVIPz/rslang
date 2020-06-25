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
    document.querySelector('.main').classList.add('sprint-game');
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
    if (this.rightAnswersCount > 0 && this.rightAnswersCount < 4 && this.points < 80) {
      marks[this.rightAnswersCount - 1].classList.add('activated');
    } else if (activatedMarks || this.rightAnswersCount === 4) {
      activatedMarks.forEach((el) => el.classList.remove('activated'));
    }
    this.header = document.querySelector('.sprint-header');
    switch (this.points) {
      case 20:
        this.header.className = 'sprint-header sprint-roof1';
        break
      case 40:
        this.header.className = 'sprint-header sprint-roof2';
        break
      case 80:
        this.header.className = 'sprint-header sprint-roof3';
        break
      default:
        this.header.className = 'sprint-header';
        break

    }
  }
  animateTrue() {
    document.querySelector('.sprint-container').classList.add('sprint-container--true');
    setTimeout(() => { document.querySelector('.sprint-container').classList.remove('sprint-container--true') }, 200);

  }

  animateFalse() {
    document.querySelector('.sprint-container').classList.add('sprint-container--false');
    setTimeout(() => { document.querySelector('.sprint-container').classList.remove('sprint-container--false') }, 200);
  }

  showTime(time) {
    this.timer = document.querySelector('.sprint-timer');
    if (this.timer) { this.timer.innerHTML = time; }
  }

  showFinalStat(username, score, errors) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
    document.querySelector('.sprint-result-header').innerHTML = `${username}, Ваш результат:`
    document.querySelector('.sprint-final-score').innerHTML = score;
    document.querySelector('.sprint-user-mistakes').innerHTML = `Ошибок ${errors.length}`;
  }
}
