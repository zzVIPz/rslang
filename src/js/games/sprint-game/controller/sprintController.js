import SprintView from '../view/sprintView';
import SprintModel from '../model/sprintModel';
import addWord from '../utils/addWord';
import GLOBAL from '../../../constants/global';
import {
  MIN_GAME_POINTS,
  MAX_GAME_POINTS,
  VALUE_TO_SWITCH,
  GAME_TIME,
  COUNTDOWN_DELAY,
} from '../const/sprintConst';
import randomInteger from '../utils/randomInteger';

export default class SprintController {
  constructor(
    user,
    mainView,
    parseLearningsWords,
    dailyStatistics,
    setUserStatistic,
    getUserStatistic,
  ) {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.user = user;
    this.mainView = mainView;
    this.parseLearningsWords = parseLearningsWords;
    this.dailyStatistics = dailyStatistics;
    this.setUserStatistic = setUserStatistic;
    this.getUserStatistic = getUserStatistic;
  }

  init() {
    this.prelaunch();
  }

  prelaunch() {
    this.level = 0;
    this.round = 0;
    this.currentWordIndex = 0;
    this.score = 0;
    this.points = MIN_GAME_POINTS;
    this.accuracyCounter = 0;
    this.rightAnswersCount = 0;
    this.faultyWords = [];
    this.username = this.user.username;
    this.view.renderStartLayout(this.username);
    this.addCloseBtnHandler();
    this.addRatingHandler();
    this.addStartHandler();
    this.addNavigationClickListener();
  }

  addNavigationClickListener() {
    setTimeout(() => {
      this.navClick = this.navigationClickHandler.bind(this);
      document.addEventListener('click', this.navClick);
    }, 1000);
  }

  navigationClickHandler({ target }) {
    if (target.classList.contains('navigation__link')) {
      clearTimeout(this.timer);
      document.removeEventListener('keydown', this);
      document.removeEventListener('click', this.navClick);
    }
  }

  addRatingHandler() {
    document.querySelector('.sprint-rating').addEventListener('click', ({ target }) => {
      if (target.classList.contains('group')) {
        this.level = target.id;
      } else if (target.classList.contains('round')) {
        this.round = target.id * 5 + randomInteger(0, 4);
      }
    });
  }

  addStartHandler() {
    document.querySelector('.sprint-button--start').addEventListener('click', async () => {
      this.wordsArray = await this.model.getWordsArray(this.round, this.level);
      this.initialWordsArray = this.model.wordsArray;
      if (this.wordsArray.length) {
        this.startGame();
      }
    });
  }

  startGame() {
    this.dailyStatistics.gameStartsStat(GLOBAL.STAT_GAME_NAMES.sprint);
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
    if (code === 'ArrowRight') {
      this.rightBtn.click();
    }
    if (code === 'ArrowLeft') {
      this.wrongBtn.click();
    }
  }

  clickHandler({ target }) {
    this.answer = target.id === 'right' ? 1 : 0;
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
      addWord(this.faultyWords, this.wordsArray[this.currentWordIndex], this.initialWordsArray);
    }
  }

  async endGame() {
    clearTimeout(this.timer);
    document.removeEventListener('keydown', this);
    this.recordScore = await this.getRecordScore();
    this.view.renderFinalStat(this.recordScore, this.score, this.faultyWords);
    this.setRecordScore();
    const learningArray = this.faultyWords.map((word) => word.id);
    this.parseLearningsWords(learningArray);
    this.addCloseBtnHandler();
    document.querySelector('.sprint-button--repeat').addEventListener('click', () => {
      this.prelaunch();
    });
  }

  async getRecordScore() {
    this.gameStat = await this.getUserStatistic();
    if (!this.gameStat.optional.score) {
      this.gameStat.optional.score = { sprint: 0 };
    }

    return this.gameStat.optional.score.sprint;
  }

  setRecordScore() {
    if (this.score > this.gameStat.optional.score.sprint) {
      this.gameStat.optional.score.sprint = this.score;
      delete this.gameStat.id;
      this.setUserStatistic(this.gameStat);
    }
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
    const closeBtn = document.querySelector('.closeBtn');
    const closeModal = document.querySelector('.app__modal');
    if (closeModal) {
      closeBtn.addEventListener('click', () => {
        this.view.displayModal();
        document.querySelector('.app__modal__box_cancel').addEventListener('click', () => {
          this.view.hideModal();
        });
        document.querySelector('.app__button_close').addEventListener('click', () => {
          this.closeGameWindow();
          this.view.hideModal();
          this.mainView.renderMain(this.user);
        });
      });
    } else {
      closeBtn.addEventListener('click', () => {
        this.closeGameWindow();
        this.mainView.renderMain(this.user);
      });
    }
  }

  closeGameWindow() {
    clearTimeout(this.timer);
    document.removeEventListener('keydown', this);
    this.view.clearMainContainer();
    window.history.replaceState(null, null, ' ');
  }
}
