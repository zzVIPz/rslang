import SprintView from '../view/sprintView';
import SprintModel from '../model/sprintModel';
import addWord from '../utils/addWord';

export default class SprintController {
  constructor() {
    this.view = new SprintView();
    this.model = new SprintModel();
    this.level = 0;
    this.round = 0;

  }

  init() {
    this.prelaunch();
  }

  async prelaunch() {
    clearTimeout(this.timer);

    this.currentWordIndex = 0;
    this.score = 0;
    this.points = 10;
    this.accuracyCounter = 0;
    this.rightAnswersCount = 0;
    this.faultyWords = [];

    this.userData = await this.model.getCurrenttUser();
    this.username = this.userData.username;
    this.wordsArray = await this.model.getWordsArray(this.level, this.round);
    console.log(this.wordsArray);
    if (this.wordsArray.length > 0) {
      this.view.renderStartLayout(this.username);
      document.querySelector('.sprint-button--start')
        .addEventListener('click', () => {
          this.startGame();
        });
    }

  }

  startGame() {
    this.view.renderGameLayout();
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
    this.startCountdown(60);
  }

  handleEvent(event) {
    if (event.code === 'ArrowRight') { this.rightBtn.click(); }
    if (event.code === 'ArrowLeft') { this.wrongBtn.click(); }
  }

  clickHandler(event) {
    this.answer = (event.target.id === 'right') ? 1 : 0;
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
      if (this.rightAnswersCount === 4 && this.points < 80) {
        this.points *= 2;
        this.rightAnswersCount = 0;
      }
      this.score += this.points;
      this.view.animateTrue();
    } else {
      this.points = 10;
      this.rightAnswersCount = 0;
      this.view.animateFalse();
      addWord(this.faultyWords, this.wordsArray[this.currentWordIndex]);
    }
  }

  endGame() {
    clearTimeout(this.timer);
    document.removeEventListener('keydown', this);
    this.view.showFinalStat(this.score, this.faultyWords);
    document.querySelector('.sprint-button--repeate')
      .addEventListener('click', () => { this.prelaunch(); });
  }

  startCountdown(from) {
    this.current = from;
    this.current -= 1;
    if (this.current > 0) {
      this.view.showTime(this.current);
      this.timer = setTimeout(this.startCountdown.bind(this), 1000, this.current);
      console.log(this.timer);
    } else {
      this.endGame();
    }
  }

}
