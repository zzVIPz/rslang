import {
  container,
  STATISTICS_MODAL_LAYOUT,
  SVG_URL,
  ID_OF_WORD,
} from './speak_it-constants';
import getMediaUrl from '../../utils/getMediaUrl';
import MainModel from '../../models/mainModel';

export default class ModalWindow {
  constructor(correct, uncorrect, user, parseLearningsWords) {
    this.cancelBtn = document.querySelector('.modal_cancel');
    this.backToMianBtn = document.querySelector('.modal_close');
    this.viewStatistic = document.querySelector('.modal_view');
    this.appModal = document.querySelector('.modal_container');
    this.statisticModalWindow = document.querySelector('.modal_statistic');
    this.correctWordsArray = correct;
    this.uncorrectWordsArray = uncorrect;
    this.user = user;
    this.mainModel = new MainModel();
    this.parseLearningsWords = parseLearningsWords;
  }

  runListeners(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.cancelBtn.onclick = () => this.toggelModalWindov();
    this.backToMianBtn.onclick = () => {
      this.stopGame();
    };
    this.viewStatisticMethod();
  }

  stopGame() {
    const missArrayId = [];
    for (let i = 0; i < this.uncorrectWordsArray.length; i += 1) {
      missArrayId.push(this.uncorrectWordsArray[i].id);
    }
    this.parseLearningsWords(missArrayId);
    container.innerHTML = '';
    this.mainView.renderMain(this.user);
    window.history.replaceState(null, null, ' ');
  }

  toggelModalWindov() {
    this.appModal.classList.toggle('not_display');
  }

  viewStatisticMethod() {
    this.viewStatistic.onclick = () => {
      this.statisticModalWindow.classList.toggle('not_display');
      this.statisticModalWindow.innerHTML = STATISTICS_MODAL_LAYOUT;
      this.backToGame = document.querySelector('.statistics__continue');
      this.closeGame = document.querySelector('.statistics__back');
      this.statisticWrongSet = document.querySelector('.statistics__words-set_wrong');
      this.statisticCorrectSet = document.querySelector('.statistics__words-set_correct');
      this.wrongTitle = this.statisticModalWindow.querySelector('.wrong_title');
      this.rightTitle = this.statisticModalWindow.querySelector('.correct_title');
      this.addStatisticToPage();
    };
  }

  addStatisticToPage() {
    this.addWords(this.uncorrectWordsArray, this.statisticWrongSet);
    this.addWords(this.correctWordsArray, this.statisticCorrectSet);
    this.wrongTitle.innerText += `: ${this.uncorrectWordsArray.length}`;
    this.rightTitle.innerText += `: ${this.correctWordsArray.length}`;
    this.addStatisticMethods();
  }

  addWords = (array, placeForPutting) => {
    for (let i = 0; i < array.length; i += 1) {
      const oneRow = document.createElement('div');
      oneRow.classList.add('wordBox');
      const soundBox = document.createElement('div');
      soundBox.classList.add('soundBox');
      const wordAudio = document.createElement('img');
      wordAudio.classList.add('word-audio');
      wordAudio.src = SVG_URL;
      wordAudio.id = getMediaUrl(array[i].soundURL);
      const wordEng = document.createElement('div');
      wordEng.classList.add('word-eng');
      wordEng.innerText = array[i].word;
      wordEng.title = ID_OF_WORD + array[i].id;
      const wordTrans = document.createElement('div');
      wordTrans.classList.add('word-trans');
      wordTrans.innerText = `- ${array[i].wordTranslate}`;
      soundBox.appendChild(wordAudio);
      oneRow.appendChild(soundBox);
      oneRow.appendChild(wordEng);
      oneRow.appendChild(wordTrans);
      placeForPutting.appendChild(oneRow);
    }
  }

  addStatisticMethods() {
    this.backToGame.addEventListener('click', () => {
      this.closeStatisticWindow();
    });
    this.closeGame.addEventListener('click', () => {
      this.stopGame();
    });
    const sounds = this.statisticModalWindow.querySelectorAll('.word-audio');
    sounds.forEach((sound) => sound.addEventListener('click', (e) => {
      this.playSound(e.target);
    }));
  }

  closeStatisticWindow() {
    this.statisticModalWindow.classList.toggle('not_display');
    this.statisticModalWindow.innerHTML = '';
  }

  playSound = (sound) => {
    const speaker = document.querySelector('.user-tool__button-speaker');
    if (speaker.classList.contains('user-tool__button-speaker--active')) {
      new Audio(sound.id).play();
    }
  }
}
