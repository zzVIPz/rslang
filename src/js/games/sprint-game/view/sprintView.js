import {
  startLayout, gameLayout, finalStatLayout, closeModal,
} from './layouts';
import addEventHandlerOnRating from '../utils/eventHandlerOnRating';
import {
  MIN_GAME_POINTS,
  MAX_GAME_POINTS,
  VALUE_TO_SWITCH,
  CORRECT_SOUND,
  ERROR_SOUND,
  ANSWER_ANIMATION_DELAY,
  GAME_TIME,
} from '../const/sprintConst';
import getMediaUrl from '../../../utils/getMediaUrl';
import getWordBoxTemplate from '../../utils/getWordBoxTemplateStat';
import playAudio from '../../utils/playAudio';

export default class SprintView {
  constructor() {
    this.mainContainer = document.querySelector('.main');
    this.startLayout = startLayout;
    this.gameLayout = gameLayout;
    this.finalStatLayout = finalStatLayout;
    this.closeModal = closeModal;
    this.soundButton = document.querySelector('.user-tool__button-speaker');
    this.correctSound = new Audio(getMediaUrl(CORRECT_SOUND));
    this.errorSound = new Audio(getMediaUrl(ERROR_SOUND));
  }

  renderStartLayout(userName) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.startLayout);
    this.addCloseModal();

    document.querySelector('.sprint-main-wrapper').classList.add('sprint-game-bgr');

    this.group = document.querySelectorAll('.group');
    addEventHandlerOnRating(this.group);

    this.round = document.querySelectorAll('.round');
    addEventHandlerOnRating(this.round);

    this.gameDescription = document.querySelector('.sprint-game-descr');
    this.gameDescription.innerHTML = `${userName}, за 1 минуту укажи правильно или неправильно переведены слова.`;
  }

  renderGameLayout() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.gameLayout);
    this.addCloseModal();
    document.querySelector('.sprint-main-wrapper').classList.add('sprint-game-bgr');
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
    const display = document.querySelector('.sprint-display');
    display.classList.add('sprint-display--green');

    if (this.soundButton.classList.contains('user-tool__button-speaker--active')) {
      this.correctSound.play();
    }
    setTimeout(() => {
      if (display.classList.contains('sprint-display--green')) {
        display.classList.remove('sprint-display--green');
      }
    }, ANSWER_ANIMATION_DELAY);
  }

  animateFalse() {
    const display = document.querySelector('.sprint-display');
    display.classList.add('sprint-display--red');

    if (this.soundButton.classList.contains('user-tool__button-speaker--active')) {
      this.errorSound.play();
    }
    setTimeout(() => {
      if (display.classList.contains('sprint-display--red')) {
        display.classList.remove('sprint-display--red');
      }
    }, ANSWER_ANIMATION_DELAY);
  }

  showTime(time) {
    this.timerElement = document.querySelector('.sprint-timer');
    this.circle = document.querySelector('.progress-ring__circle');
    if (this.timerElement) {
      this.radius = this.circle.r.baseVal.value;
      this.circumference = 2 * this.radius * Math.PI;
      this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
      this.timeStep = this.circumference / GAME_TIME;
      this.timerElement.innerHTML = time;
      this.circle.style.strokeDashoffset -= this.timeStep;
    }
  }

  renderFinalStat(record, score, errors) {
    this.mainContainer.innerHTML = '';
    this.mainContainer.insertAdjacentHTML('beforeend', this.finalStatLayout);
    document.querySelector('.sprint-main-wrapper').classList.add('sprint-game-bgr');
    document.querySelector('.sprint-result-header').innerHTML = 'Результат игры';
    document.querySelector('.sprint-final-score').innerHTML = `${score} очков`;
    if (record && (record > score)) {
      document.querySelector('.sprint-final-record').innerHTML = ` Ваш рекорд - ${record} очков, есть к чему стремиться`;
    } else if (record) {
      document.querySelector('.sprint-final-record').innerHTML = 'Это ваш новый рекорд, так держать!!!';
    }

    if (errors.length) {
      document.querySelector('.sprint-user-mistakes').innerHTML = `Ошибок ${errors.length}`;
      this.mistakesContainer = document.createElement('div');
      this.mistakesContainer.className = 'sprint-mistaken-words';
      document.querySelector('.sprint-statistics').appendChild(this.mistakesContainer);
      errors.forEach((el) => {
        this.audioUrl = getMediaUrl(el.audio);
        this.wordBox = document.createElement('div');
        this.wordBox.className = 'wordBox wordBox_sprint';
        this.wordBox.innerHTML = getWordBoxTemplate(this.audioUrl, el.word, el.wordTranslate);
        this.mistakesContainer.append(this.wordBox);
      });
      this.mistakesContainer.addEventListener('click', ({ target }) => {
        if (target.classList.contains('word-audio')) {
          playAudio(target.dataset.url);
        }
      });
    }
  }

  clearMainContainer() {
    this.gameContainer = document.querySelector('.sprint-main-wrapper');
    if (this.gameContainer && this.gameContainer.classList.contains('sprint-game-bgr')) {
      this.gameContainer.classList.remove('sprint-game-bgr');
      this.gameContainer.remove();
    }
  }

  addCloseModal() {
    this.mainContainer.insertAdjacentHTML('beforeend', this.closeModal);
  }

  displayModal() {
    this.appModal = document.querySelector('.app__modal');
    this.appModal.classList.add('app__modal_visible');
  }

  hideModal() {
    this.appModal.classList.remove('app__modal_visible');
  }
}
