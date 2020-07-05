import templateControls from './templateControls';

export default class DictionaryController {
  constructor() {
    this.templateControls = templateControls;
    this.domElements = {};
  }

  render() {
    document.querySelector('.main').innerHTML = this.templateControls;
    this.domElements.wordsData = document.querySelector('.wordsData');
  }

  renderData(data) {
    data.forEach((el) => {
      const line = document.createElement('div');
      line.classList.add('dict__word-line');

      const soundBox = document.createElement('div');
      soundBox.classList.add('dict__word-audio');
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
  }
}
