/* eslint-disable no-underscore-dangle */
import dictionaryTemplate from './dictionaryTemplate';
import getMediaUrl from '../../utils/getMediaUrl';
import CONSTANTS from './dictionaryConstants';

export default class DictionaryController {
  constructor() {
    this.template = dictionaryTemplate;
    this.domElements = {};
    this.onStateChange = null;
    this.onWordRemove = null;
    this.onWordRestore = null;
    this.onInfoRequest = null;
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.domElements.dictControls = document.querySelector('.dictionary__controls');
    this.domElements.wordsData = document.querySelector('.wordsData');
    this.domElements.dictionary = document.querySelector('.dictionary');
    this.domElements.modal = document.querySelector('.dictModal');
    this.domElements.modalImg = document.querySelector('.dictModal__image');
    this.domElements.modalTextMeaning = document.querySelector('.dictModal__textMeaning');
    this.domElements.modalTextMeaningTranslate = document.querySelector('.dictModal__textMeaningTranslate');
    this.domElements.modalInfoClose = document.querySelector('.dict-info-close');
  }

  renderData(data, state) {
    this.domElements.wordsData.innerHTML = '';
    data.forEach((el) => {
      const line = document.createElement('div');
      line.classList.add('dict__word-line');
      const soundBox = document.createElement('div');
      soundBox.classList.add('dict__word-audio');
      const audio = new Audio();
      audio.src = getMediaUrl(el.audio);
      soundBox.append(audio);
      line.append(soundBox);

      const wordEngTrans = document.createElement('div');
      wordEngTrans.classList.add('dict__word-eng-trans');

      const wordEng = document.createElement('div');
      wordEng.classList.add('dict__word-english');
      wordEng.textContent = el.word;
      wordEngTrans.append(wordEng);

      const wordTrans = document.createElement('div');
      wordTrans.classList.add('dict__word-translate');
      wordTrans.textContent = `— ${el.wordTranslate}`;
      wordEngTrans.append(wordTrans);

      line.append(wordEngTrans);

      const wordInfo = document.createElement('div');
      wordInfo.classList.add('dict__word-information');
      wordInfo.dataset.id = el._id;
      line.append(wordInfo);

      if (state === CONSTANTS.DICT_STATES.LEARNING) {
        const wordRemove = document.createElement('div');
        wordRemove.classList.add('dict__word-remove');
        wordRemove.dataset.id = el._id;
        line.append(wordRemove);
      }

      if (state === CONSTANTS.DICT_STATES.REMOVED) {
        const wordRestore = document.createElement('div');
        wordRestore.classList.add('dict__word-restore');
        wordRestore.dataset.id = el._id;
        line.append(wordRestore);
      }

      this.domElements.wordsData.append(line);
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
        target.firstChild.play();
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

      if (target.classList.contains('dict__word-restore')) {
        if (this.onWordRestore != null) {
          this.onWordRestore(target.dataset.id);
        }
      }
    });

    this.domElements.modalInfoClose.addEventListener('click', () => {
      this.hideModal();
    });
  }

  showModal(data) {
    const img = document.createElement('img');
    img.src = getMediaUrl(data.image);
    this.domElements.modalImg.append(img);
    this.domElements.modalTextMeaning.textContent = data.textMeaning;
    this.domElements.modalTextMeaningTranslate.textContent = data.textMeaningTranslate;
    this.domElements.modal.classList.remove('dictModal_hidden');
  }

  hideModal() {
    this.domElements.modalImg.innerHTML = '';
    this.domElements.modalTextMeaning.textContent = '';
    this.domElements.modalTextMeaningTranslate.textContent = '';
    this.domElements.modal.classList.add('dictModal_hidden');
  }
}
