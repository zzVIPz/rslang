import templateControls from './templateControls';
import getMediaUrl from '../../utils/getMediaUrl';

export default class DictionaryController {
  constructor() {
    this.templateControls = templateControls;
    this.domElements = {};
    this.onStateChange = null;
  }

  render() {
    document.querySelector('.main').innerHTML = this.templateControls;
    this.domElements.dictControls = document.querySelector('.dictionary__controls');
    this.domElements.wordsData = document.querySelector('.wordsData');
    this.addListeners();
  }

  renderData(data) {
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
      line.append(wordInfo);

      const wordRemove = document.createElement('div');
      wordRemove.classList.add('dict__word-remove');
      line.append(wordRemove);

      this.domElements.wordsData.append(line);
    });
    this.domElements.wordsData.addEventListener('click', ({ target }) => {
      if (target.classList.contains('dict__word-audio')) {
        target.firstChild.play();
      }
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
  }
}
