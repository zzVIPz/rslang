import { startLayout, gameLayout, finalStatLayout, closeBtn } from './layouts';

export default class SprintView {
  constructor() {
    this.mainContainer = document.querySelector('.main');
    this.startLayout = startLayout;
    this.gameLayout = gameLayout;
    this.finalStatLayout = finalStatLayout;
    this.closeBtn = closeBtn;
  }

  renderStartLayout(userName) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.startLayout);
    this.addCloseBtn();
    this.gameDescription = document.querySelector('.sprint-game-descr');
    this.gameDescription.innerHTML = `${userName}, за 1 минуту укажи правильно или не правильно переведены слова.`
  }

  renderGameLayout() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.gameLayout);
    this.mainContainer.classList.add('sprint-game-bgr');
    this.addCloseBtn();
  }

  renderGameData(score, word, wordTranslate, points, rightAnswersCount) {
    document.querySelector('.sprint-score').innerHTML = score;
    document.querySelector('#word').innerHTML = word;
    document.querySelector('#translation').innerHTML = wordTranslate;
    document.querySelector('.sprint-points-line').innerHTML = `+${points} очков за слово`;
    const marks = document.querySelectorAll('.sprint-mark');
    const activatedMarks = document.querySelectorAll('.sprint-mark');
    if (rightAnswersCount > 0 && rightAnswersCount < 4 && points < 80) {
      marks[rightAnswersCount - 1].classList.add('activated');
    } else if (activatedMarks || rightAnswersCount === 4) {
      activatedMarks.forEach((el) => el.classList.remove('activated'));
    }
    this.header = document.querySelector('.sprint-container');
    switch (points) {
      case 20:
        this.header.className = 'sprint-container sprint-mode-1';
        break
      case 40:
        this.header.className = 'sprint-container sprint-mode-2';
        break
      case 80:
        this.header.className = 'sprint-container sprint-mode-3';
        break
      default:
        this.header.className = 'sprint-container';
        break

    }
  }
  animateTrue() {
    document.querySelector('.sprint-display').classList.add('sprint-display--green');
    setTimeout(() => { document.querySelector('.sprint-display').classList.remove('sprint-display--green') }, 200);

  }

  animateFalse() {
    document.querySelector('.sprint-display').classList.add('sprint-display--red');
    setTimeout(() => { document.querySelector('.sprint-display').classList.remove('sprint-display--red') }, 200);
  }

  showTime(time) {
    this.timer = document.querySelector('.sprint-timer');
    if (this.timer) { this.timer.innerHTML = time; }
  }

  showFinalStat(score, errors) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
    this.addCloseBtn();
    this.mainContainer.classList.remove('sprint-game-bgr');
    document.querySelector('.sprint-result-header').innerHTML = `Результат игры`
    document.querySelector('.sprint-final-score').innerHTML = `${score} очков`;
    if (errors.length > 0) {
      document.querySelector('.sprint-user-mistakes').innerHTML = `Ошибок ${errors.length}`;
      this.mistakesContainer = document.createElement('div')
      this.mistakesContainer.className = 'sprint-mistaken-words';
      document.querySelector('.sprint-statistics').appendChild(this.mistakesContainer);
      errors.forEach((el) => {
        const word = document.createElement('span');
        console.log(el.word);
        word.innerHTML = ` ${el.word} `;
        this.mistakesContainer.appendChild(word);

      })
    }
  }
  addCloseBtn() {
    this.mainContainer.insertAdjacentHTML('afterbegin', this.closeBtn);
    document.querySelector('.closeBtn').addEventListener('click', () => {
      this.mainContainer.innerHTML = '';

    })
  }
}
