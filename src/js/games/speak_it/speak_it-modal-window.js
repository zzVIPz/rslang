import {
  container,
  STATISTICS_MODAL_LAYOUT
} from './speak_it-constants';
import getMediaUrl from '../../utils/getMediaUrl';

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

  runListeners(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.cancelBtn.onclick = () => this.toggelModalWindov();
    this.backToMianBtn.onclick = () => {
      this.stopGame();
    }
    this.viewStatisticMethod();
  }
  stopGame() {
      container.innerHTML = '';
      // container.classList.remove('speakIt');
      // document.body.classList.remove('speakIt_background');
      this.mainView.renderMain(this.user);
  }

  toggelModalWindov() {
    this.appModal.classList.toggle('not_display');
  }

  viewStatisticMethod() {
    this.viewStatistic.onclick = () => {
      this.statisticModalWindow.classList.toggle('not_display');
      this.statisticModalWindow.innerHTML = STATISTICS_MODAL_LAYOUT;
      this.backToGame = document.querySelector('.statistics__continue')
      this.closeGame = document.querySelector('.statistics__back')
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
    this.wrongTitle.innerText += ': ' + this.uncorrectWordsArray.length;
    this.rightTitle.innerText += ': ' + this.correctWordsArray.length;
    this.addStatisticMethods()
  }

  addWords(array, container) {
    for (let word of array) {
      let oneRow = document.createElement('div');
    oneRow.classList.add('wordBox');
    let soundBox = document.createElement('div');
    soundBox.classList.add('soundBox');
    let wordAudio = document.createElement('img');
    wordAudio.classList.add('word-audio')
    wordAudio.src = "../src/assets/svg/speaker-for-final-modal.svg";
    wordAudio.id = getMediaUrl(word.soundURL);
    let wordEng = document.createElement('div');
    wordEng.classList.add('word-eng');
    wordEng.innerText = word.word;
    wordEng.title = 'id of this word is: ' + word.id;
    let wordTrans = document.createElement('div')
    wordTrans.classList.add('word-trans');
    wordTrans.innerText = '- ' + word.wordTranslate;
    soundBox.appendChild(wordAudio);
    oneRow.appendChild(soundBox);
    oneRow.appendChild(wordEng);
    oneRow.appendChild(wordTrans);
    container.appendChild(oneRow);
    }
  };

  addStatisticMethods() {
    this.backToGame.addEventListener('click', () => {
      this.closeStatisticWindow();
    })
    this.closeGame.addEventListener('click', () => {
      this.stopGame();
    })
    const sounds = this.statisticModalWindow.querySelectorAll('.word-audio');
    sounds.forEach(sound => sound.addEventListener('click', (e) => {
      this.playSound(e.target)
    }));
  }

  closeStatisticWindow() {
    this.statisticModalWindow.classList.toggle('not_display');
    this.statisticModalWindow.innerHTML = '';
  }

  playSound(sound) {
    new Audio(sound.id).play();
  }
}
