import {
  container,
  CORRECT_WORDS,
  UNCORRECT_WORDS,
  IDS_TEXT,
  BACK,
} from './speak_it-constants';

export class ModalWindow {
  constructor(correct, uncorrect) {
    this.cancelBtn = document.querySelector('.modal_cancel');
    this.backToMianBtn = document.querySelector('.modal_close');
    this.viewStatistic = document.querySelector('.modal_view');
    this.appModal = document.querySelector('.modal_container');
    this.statisticModalWindow = document.querySelector('.modal_statistic');
    this.correctWordsArray = correct;
    this.uncorrectWordsArray = uncorrect;
  }

  runListeners() {
    this.returnToGame();
    this.stopGame();
    this.viewStatisticMethod();
  }

  stopGame() {
    this.backToMianBtn.onclick = () => {
      container.innerHTML = '';
      container.classList.remove('speakIt');
      document.body.classList.remove('speakIt_background');
    };
  }

  returnToGame() {
    this.cancelBtn.onclick = () => this.toggelModalWindov();
  }

  toggelModalWindov() {
    this.appModal.classList.toggle('not_display');
  }

  viewStatisticMethod() {
    this.viewStatistic.onclick = () => {
      this.statisticModalWindow.classList.toggle('not_display');
      this.addStatisticToPage();
      const buttonClose = document.createElement('button');
      buttonClose.className = 'button close_statistic';
      buttonClose.innerText = BACK;
      this.statisticModalWindow.appendChild(buttonClose);
      this.closeStatistic();
    };
  }

  addStatisticToPage() {
    this.statisticModalWindow.innerHTML = '';
    const titleCorrect = document.createElement('h2');
    titleCorrect.innerText = CORRECT_WORDS;
    this.statisticModalWindow.appendChild(titleCorrect);
    this.appendWordsToStatistic(this.correctWordsArray);

    const titleUncorrect = document.createElement('h2');
    titleUncorrect.innerText = UNCORRECT_WORDS;
    this.statisticModalWindow.appendChild(titleUncorrect);
    this.appendWordsToStatistic(this.uncorrectWordsArray);
  }

  appendWordsToStatistic(array) {
    for (const element of array) {
      const wordString = document.createElement('p');
      wordString.title = IDS_TEXT + element.id;
      wordString.innerText = element.word;
      this.statisticModalWindow.appendChild(wordString);
    }
  }

  closeStatistic() {
    document.querySelector('.close_statistic').onclick = () => {
      this.statisticModalWindow.classList.toggle('not_display');
    };
  }
}
