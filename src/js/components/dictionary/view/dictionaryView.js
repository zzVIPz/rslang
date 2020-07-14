import dictionaryTemplate from './dictionaryTemplate';
import dictionaryModalTemplate from './dictionaryModalTemplate';
import { dictionaryLineTemplate, dictionaryLastRepeatWord } from './dictionaryLineTemplate';
import getMediaUrl from '../../../utils/getMediaUrl';
import CONSTANTS from '../dictionaryConstants';

export default class DictionaryController {
  constructor() {
    this.template = dictionaryTemplate;
    this.domElements = { main: document.querySelector('.main') };
    this.onStateChange = null;
    this.onWordRemove = null;
    this.onWordToDifficult = null;
    this.onWordRestore = null;
    this.onInfoRequest = null;
    this.audio = new Audio();
  }

  render() {
    this.domElements.main.innerHTML = this.template;
    this.domElements.dictControls = document.querySelector('.dictionary__controls');
    this.domElements.wordsData = document.querySelector('.wordsData');
    this.domElements.dictionary = document.querySelector('.dictionary');
  }

  renderLines(data, user, state) {
    this.hidePreloader(this.domElements.wordsData);
    let cardsNumderPerDay;
    if (user.studyMode === CONSTANTS.MIXED_MODE && state === CONSTANTS.STATE_MODE) {
      cardsNumderPerDay = user.cardsTotal - user.cardsNew;
    } else if (user.studyMode === CONSTANTS.REPEAT_MODE && state === CONSTANTS.STATE_MODE) {
      cardsNumderPerDay = user.cardsTotal;
    }
    this.domElements.wordsData.innerHTML = '';
    if (!data.length) {
      const noWords = document.createElement('div');
      noWords.classList.add('dict__no-words');
      noWords.textContent = CONSTANTS.DEFAULT_NO_WORDS_MESSAGE;
      this.domElements.wordsData.append(noWords);
    }
    let currentCard = 0;
    data.forEach((el) => {
      const audioSrc = getMediaUrl(el.audio);
      const line = dictionaryLineTemplate(el, audioSrc, user, state);
      this.domElements.wordsData.insertAdjacentHTML('beforeend', line);
      if (cardsNumderPerDay) {
        const repeatLine = dictionaryLastRepeatWord(cardsNumderPerDay, currentCard);
        const list = this.domElements.wordsData.querySelectorAll('.dict__optional');
        const lastInList = list[list.length - 1];
        lastInList.insertAdjacentHTML('beforeend', repeatLine);
      }
      currentCard += 1;
    });
  }

  addListeners() {
    this.domElements.dictControls.addEventListener('click', ({ target }) => {
      if (target.classList.contains('controlsBtn')) {
        const btns = document.querySelectorAll('.controlsBtn');
        btns.forEach((el) => {
          el.classList.remove('controlsBtn_active');
        });
        target.classList.add('controlsBtn_active');
        if (this.onStateChange !== null) {
          this.onStateChange(target.dataset.state);
        }
      }
    });

    this.domElements.wordsData.addEventListener('click', ({ target }) => {
      if (target.classList.contains('dict__word-audio')) {
        this.playAudio(target.childNodes[1]);
      }

      if (target.classList.contains('dict__word-information')) {
        if (this.onInfoRequest !== null) {
          this.onInfoRequest(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-remove')) {
        if (this.onWordRemove !== null) {
          this.onWordRemove(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-difficult')) {
        if (this.onWordToDifficult !== null) {
          this.onWordToDifficult(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-restore')) {
        if (this.onWordRestore !== null) {
          this.onWordRestore(target.dataset.id);
        }
      }
    });
  }

  playAudio(targetAudio) {
    if (this.audio === targetAudio) {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
        this.audio.currentTime = 0.0;
      }
    } else if (this.audio.paused) {
      this.audio = targetAudio;
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio.currentTime = 0.0;
      this.audio = targetAudio;
      this.audio.play();
    }
  }

  renderModal(data, user) {
    const imageSrc = getMediaUrl(data.image);
    const audioSrc = getMediaUrl(data.audio);
    const audioExample = getMediaUrl(data.audioExample);
    const audioMeaning = getMediaUrl(data.audioMeaning);
    const modal = dictionaryModalTemplate(data, imageSrc,
      audioSrc, audioExample, audioMeaning, user);
    this.domElements.dictionary.insertAdjacentHTML('beforeend', modal);
    this.addModalListeners();
  }

  addModalListeners() {
    const modal = document.querySelector('.dictModal');
    const modalCloseBtn = document.querySelector('.dictModal__closeBtn');

    modal.addEventListener('click', ({ target }) => {
      if (target.classList.contains('dict__word-audio')) {
        this.playAudio(target.childNodes[1]);
      }
    });

    modalCloseBtn.addEventListener('click', () => {
      this.removeModal();
    });
  }

  removeModal() {
    this.domElements.dictionary.removeChild(this.domElements.dictionary.lastChild.previousSibling);
  }

  showPreloader(parent) {
    this.domElements.preloader = document.createElement('div');
    this.domElements.preloader.classList.add('data-preloader');
    const parentElement = parent;
    parentElement.innerHTML = '';
    parent.append(this.domElements.preloader);
  }

  hidePreloader(parent) {
    if (document.querySelectorAll('.data-preloader').length) {
      parent.removeChild(this.domElements.preloader);
    }
  }
}
