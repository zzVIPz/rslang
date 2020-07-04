import getMediaUrl from '../../../utils/getMediaUrl';
import playAudio from '../../utils/playAudio';
import INITIAL_BACKGROUND_POSITIONY from '../constSavannah';
import getWordBoxTemplate from '../../utils/getWordBoxTemplateStat';
import {
  LOSE_ROUND_TITLE,
  WIN_ROUND_TITLE,
  STATISTICS_MODAL_LAYOUT,
} from '../../utils/statisticsModalConst';

class GameStatistics {
  constructor() {
    this.finalModal = document.createElement('div');
  }

  init(view, mainView, model, defaultHash) {
    this.setDefaultHash = defaultHash;
    this.mainView = mainView;
    this.view = view;
    this.model = model;
    this.finalModal.className = 'statistics statistics__container';
    this.finalModal.classList.add('hidden');
    this.finalModal.innerHTML = STATISTICS_MODAL_LAYOUT;
    this.view.appContainer.appendChild(this.finalModal);
    this.title = document.querySelector('.statistics__title');
    this.modalListeners();
  }

  loseRound() {
    this.title.textContent = LOSE_ROUND_TITLE;
  }

  winRound() {
    this.title.textContent = WIN_ROUND_TITLE;
  }

  modalListeners() {
    this.backToMain();
    this.continuePlaying();
    this.clickPlayIcon();
  }

  backToMain() {
    document.querySelector('.statistics__back').addEventListener('click', () => {
      this.view.finishGame();
      this.setDefaultHash();
      this.mainView.renderMain(this.view.currentUser);
    });
  }

  continuePlaying() {
    document.querySelector('.statistics__continue').addEventListener('click', () => {
      this.view.renderSavannah();
      this.model.setDefault();
      this.view.backgroundPositionY = INITIAL_BACKGROUND_POSITIONY;
    });
  }

  renderWrongAnswersTitle() {
    this.wrongTitle = document.querySelector('.wrong_title');
    this.wrongTitle.innerHTML = `Ошибок: ${this.model.wrongAnswerCounter}`;
  }

  renderCorrectAnswerTitle() {
    this.correctTitle = document.querySelector('.correct_title');
    this.correctTitle.innerHTML = `Знаю: ${this.model.rightAnswersCounter}`;
  }

  renderWord(word, translation, audio) {
    this.audioUrl = getMediaUrl(audio);
    this.wordBox = document.createElement('div');
    this.wordBox.className = 'wordBox';
    this.wordBox.innerHTML = getWordBoxTemplate(this.audioUrl, word, translation);
  }

  clickPlayIcon = () => {
    const statisticsContainer = document.querySelector('.statistics__container');

    statisticsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains('word-audio')) {
        playAudio(target.dataset.url);
      }
    });
  }

  appendWrongAnswer = (word, translation, audio) => {
    const wordsWrongBox = document.querySelector('.statistics__words-set_wrong');

    this.renderWord(word, translation, audio);
    wordsWrongBox.appendChild(this.wordBox);
  }

  appendCorrectAnswer = (word, translation, audio) => {
    const wordsCorrectBox = document.querySelector('.statistics__words-set_correct');

    this.renderWord(word, translation, audio);
    wordsCorrectBox.appendChild(this.wordBox);
  }
}

export default GameStatistics;
