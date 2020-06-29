import { startLayout, gameLayout, finalStatLayout } from './layouts';
import {
  MIN_GAME_POINTS, MAX_GAME_POINTS, VALUE_TO_SWITCH, CORRECT_SOUND_URL, ERROR_SOUND_URL,
} from '../const/sprintConst';

export default class SprintView {
  constructor() {
    this.mainContainer = document.querySelector('.main');
    this.startLayout = startLayout;
    this.gameLayout = gameLayout;
    this.finalStatLayout = finalStatLayout;
    this.soundButton = document.querySelector('.user-tool__button-speaker');
    this.correctSound = new Audio(CORRECT_SOUND_URL);
    this.errorSound = new Audio(ERROR_SOUND_URL);
  }

  renderStartLayout(userName) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.startLayout);
    this.gameDescription = document.querySelector('.sprint-game-descr');
    this.gameDescription.innerHTML = `${userName}, за 1 минуту укажи правильно или не правильно переведены слова.`;
  }

  renderGameLayout() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.gameLayout);
    document.body.classList.add('sprint-game-bgr');
  }

  renderGameData(score, word, wordTranslate, points, rightAnswersCount) {
    document.querySelector('.sprint-score').innerHTML = score;
    document.querySelector('#word').innerHTML = word;
    document.querySelector('#translation').innerHTML = wordTranslate;
    document.querySelector('.sprint-points-line').innerHTML = `+${points} очков за слово`;
    const marks = document.querySelectorAll('.sprint-mark');
    const activatedMarks = document.querySelectorAll('.sprint-mark');
    if (rightAnswersCount > 0 && rightAnswersCount < VALUE_TO_SWITCH && points < MAX_GAME_POINTS) {
      marks[rightAnswersCount - 1].classList.add('activated');
    } else if (activatedMarks || rightAnswersCount === VALUE_TO_SWITCH) {
      activatedMarks.forEach((el) => el.classList.remove('activated'));
    }
    this.header = document.querySelector('.sprint-container');
    switch (points) {
      case (MIN_GAME_POINTS * 2):
        this.header.className = 'sprint-container sprint-mode-1';
        break;
      case (MIN_GAME_POINTS * 4):
        this.header.className = 'sprint-container sprint-mode-2';
        break;
      case MAX_GAME_POINTS:
        this.header.className = 'sprint-container sprint-mode-3';
        break;
      default:
        this.header.className = 'sprint-container';
        break;
    }
  }

  animateTrue() {
    this.display = document.querySelector('.sprint-display');
    this.display.classList.add('sprint-display--green');
    if (this.soundButton.classList.contains('user-tool__button-speaker--active')) {
      this.correctSound.play();
    }
    setTimeout(() => {
      if (this.display.classList.contains('sprint-display--green')) {
        this.display.classList.remove('sprint-display--green');
      }
    }, 200);
  }

  animateFalse() {
    this.display = document.querySelector('.sprint-display');
    this.display.classList.add('sprint-display--red');
    if (this.soundButton.classList.contains('user-tool__button-speaker--active')) {
      this.errorSound.play();
    }
    setTimeout(() => {
      if (this.display.classList.contains('sprint-display--red')) {
        this.display.classList.remove('sprint-display--red');
      }
    }, 200);
  }

  showTime(time) {
    this.timer = document.querySelector('.sprint-timer');
    if (this.timer) { this.timer.innerHTML = time; }
  }

  renderFinalStat(score, errors) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
    document.body.classList.remove('sprint-game-bgr');
    document.querySelector('.sprint-result-header').innerHTML = 'Результат игры';
    document.querySelector('.sprint-final-score').innerHTML = `${score} очков`;
    if (errors.length > 0) {
      document.querySelector('.sprint-user-mistakes').innerHTML = `Ошибок ${errors.length}`;
      this.mistakesContainer = document.createElement('div');
      this.mistakesContainer.className = 'sprint-mistaken-words';
      document.querySelector('.sprint-statistics').appendChild(this.mistakesContainer);
      errors.forEach((el) => {
        const word = document.createElement('span');
        word.innerHTML = ` ${el.word} `;
        this.mistakesContainer.appendChild(word);
      });
    }
  }

  clearMainContainer() {
    if (this.mainContainer.classList.contains('sprint-game-bgr')) {
      this.mainContainer.classList.remove('sprint-game-bgr');
    }
    this.mainContainer.innerHTML = '';
  }
}
