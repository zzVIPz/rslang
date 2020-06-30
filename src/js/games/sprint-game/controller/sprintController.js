import SprintView from '../view/sprintView';
import SprintModel from '../model/sprintModel';
import addWord from '../utils/addWord';
// eslint-disable-next-line import/no-cycle
import MainView from '../../../views/mainView';
import {
  MIN_GAME_POINTS, MAX_GAME_POINTS, VALUE_TO_SWITCH, GAME_TIME, COUNTDOWN_DELAY,
} from '../const/sprintConst';

export default class SprintController {
  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.mainView = new MainView();
    this.level = 0;
    this.round = 0;
  }

  init() {
    this.prelaunch();
  }

  async prelaunch() {
    this.currentWordIndex = 0;
    this.score = 0;
    this.points = MIN_GAME_POINTS;
    this.accuracyCounter = 0;
    this.rightAnswersCount = 0;
    this.faultyWords = [];

    this.user = await this.model.getCurrenttUser();
    console.log(this.user);
    this.username = this.user.username;
    this.wordsArray = await this.model.getWordsArray(this.level, this.round);
    console.log(this.wordsArray);
    if (this.wordsArray.length > 0) {
      this.view.renderStartLayout(this.username);
      this.addCloseBtnHandler();
      document.querySelector('.sprint-button--start')
        .addEventListener('click', () => {
          this.startGame();
        });
    }
  }

  startGame() {
    this.view.renderGameLayout();
    this.addCloseBtnHandler();
    this.wrongBtn = document.querySelector('.sprint-button--wrong');
    this.rightBtn = document.querySelector('.sprint-button--right');
    this.rightBtn.addEventListener('click', this.clickHandler.bind(this));
    this.wrongBtn.addEventListener('click', this.clickHandler.bind(this));
    document.addEventListener('keydown', this);

    this.view.renderGameData(
      this.score,
      this.wordsArray[this.currentWordIndex].word,
      this.wordsArray[this.currentWordIndex].wordTranslate,
      this.points,
      this.rightAnswersCount,
    );
    this.startCountdown(GAME_TIME);
  }

  handleEvent({ code }) {
    if (code === 'ArrowRight') { this.rightBtn.click(); }
    if (code === 'ArrowLeft') { this.wrongBtn.click(); }
  }

  clickHandler({ target }) {
    this.answer = (target.id === 'right') ? 1 : 0;
    this.accuracy = this.wordsArray[this.currentWordIndex].accuracy;
    this.checkAnswer();
    this.currentWordIndex += 1;
    if (this.currentWordIndex === this.wordsArray.length) {
      this.endGame();
      return;
    }
    this.view.renderGameData(
      this.score,
      this.wordsArray[this.currentWordIndex].word,
      this.wordsArray[this.currentWordIndex].wordTranslate,
      this.points,
      this.rightAnswersCount,
    );
  }

  checkAnswer() {
    if (this.answer === this.accuracy) {
      this.rightAnswersCount += 1;
      if (this.rightAnswersCount === VALUE_TO_SWITCH && this.points < MAX_GAME_POINTS) {
        this.points *= 2;
        this.rightAnswersCount = 0;
      }
      this.score += this.points;
      this.view.animateTrue();
    } else {
      this.points = MIN_GAME_POINTS;
      this.rightAnswersCount = 0;
      this.view.animateFalse();
      addWord(this.faultyWords, this.wordsArray[this.currentWordIndex]);
    }
  }

  endGame() {
    clearTimeout(this.timer);
    document.removeEventListener('keydown', this);
    this.view.renderFinalStat(this.score, this.faultyWords);
    this.addCloseBtnHandler();
    document.querySelector('.sprint-button--repeate')
      .addEventListener('click', () => { this.prelaunch(); });
  }

  startCountdown(gameTime) {
    this.gameTime = gameTime;
    this.gameTime -= 1;
    if (this.gameTime > 0) {
      this.view.showTime(this.gameTime);
      this.timer = setTimeout(this.startCountdown.bind(this), COUNTDOWN_DELAY, this.gameTime);
    } else {
      this.endGame();
    }
  }

  addCloseBtnHandler() {
    document.querySelector('.closeBtn').addEventListener('click', () => {
      clearTimeout(this.timer);
      document.removeEventListener('keydown', this);
      this.view.clearMainContainer();
      this.mainView.renderMain(this.user);
      window.history.replaceState(null, null, ' ');
    });
  }
}
