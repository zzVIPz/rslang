import {
  container,
  STATISTICS_MODAL_LAYOUT,
  SVG_URL,
  ID_OF_WORD,
} from './speak_it-constants';
import getMediaUrl from '../../utils/getMediaUrl';
import MainModel from '../../models/mainModel';
import checkUserWords from '../../utils/checkUserWords';

export default class ModalWindow {
  constructor(correct, uncorrect, user) {
    this.cancelBtn = document.querySelector('.modal_cancel');
    this.backToMianBtn = document.querySelector('.modal_close');
    this.viewStatistic = document.querySelector('.modal_view');
    this.appModal = document.querySelector('.modal_container');
    this.statisticModalWindow = document.querySelector('.modal_statistic');
    this.correctWordsArray = correct;
    this.uncorrectWordsArray = uncorrect;
    this.user = user;
    this.mainModel = new MainModel();
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
    for (const el of this.uncorrectWordsArray) {
      missArrayId.push(el.id);
    }
    checkUserWords(missArrayId);
    const statisticObject = {
      learnedWords: 999,
      optional: {
        speak: 999,
        puzzle: 999,
        call: 999,
        savanna: 999,
        sprint: 999,
        newGame: 999,
      },
    };
    this.mainModel.setUserStatistic(statisticObject);
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
    for (const word of array) {
      const oneRow = document.createElement('div');
      oneRow.classList.add('wordBox');
      const soundBox = document.createElement('div');
      soundBox.classList.add('soundBox');
      const wordAudio = document.createElement('img');
      wordAudio.classList.add('word-audio');
      wordAudio.src = SVG_URL;
      wordAudio.id = getMediaUrl(word.soundURL);
      const wordEng = document.createElement('div');
      wordEng.classList.add('word-eng');
      wordEng.innerText = word.word;
      wordEng.title = ID_OF_WORD + word.id;
      const wordTrans = document.createElement('div');
      wordTrans.classList.add('word-trans');
      wordTrans.innerText = `- ${word.wordTranslate}`;
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
