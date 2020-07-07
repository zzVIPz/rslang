import dictionaryTemplate from './dictionaryTemplate';
import dictionaryModalTemplate from './dictionaryModalTemplate';
import dictionaryLineTemplate from './dictionaryLineTemplate';
import getMediaUrl from '../../utils/getMediaUrl';

export default class DictionaryController {
  constructor() {
    this.template = dictionaryTemplate;
    this.domElements = {};
    this.onStateChange = null;
    this.onWordRemove = null;
    this.onWordToDifficult = null;
    this.onWordRestore = null;
    this.onInfoRequest = null;
    this.audio = new Audio();
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.dictControls = document.querySelector('.dictionary__controls');
    this.domElements.wordsData = document.querySelector('.wordsData');
    this.domElements.dictionary = document.querySelector('.dictionary');
  }

  renderLines(data, user, state) {
    this.domElements.wordsData.innerHTML = '';
    if (data.length === 0) {
      const noWords = document.createElement('div');
      noWords.classList.add('dict__no-words');
      noWords.textContent = 'There is no words to view';
      this.domElements.wordsData.append(noWords);
    }
    data.forEach((el) => {
      const audioSrc = getMediaUrl(el.audio);
      const line = dictionaryLineTemplate(el, audioSrc, user, state);
      this.domElements.wordsData.insertAdjacentHTML('beforeend', line);
    });
  }

  addListeners() {
    this.domElements.dictControls.addEventListener('click', ({ target }) => {
      if (target.classList.contains('controlsBtn')) {
        const btns = document.querySelectorAll('.controlsBtn');
        [].forEach.call(btns, (el) => {
          el.classList.remove('controlsBtn_active');
        });
        target.classList.add('controlsBtn_active');
        if (this.onStateChange != null) {
          this.onStateChange(target.dataset.state);
        }
      }
    });

    this.domElements.wordsData.addEventListener('click', ({ target }) => {
      if (target.classList.contains('dict__word-audio')) {
        this.playAudio(target.childNodes[1]);
      }

      if (target.classList.contains('dict__word-information')) {
        if (this.onInfoRequest != null) {
          this.onInfoRequest(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-remove')) {
        if (this.onWordRemove != null) {
          this.onWordRemove(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-difficult')) {
        if (this.onWordToDifficult != null) {
          this.onWordToDifficult(target.dataset.id);
        }
      }

      if (target.classList.contains('dict__word-restore')) {
        if (this.onWordRestore != null) {
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
}
