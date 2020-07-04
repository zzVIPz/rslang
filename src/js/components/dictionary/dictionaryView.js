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
    console.log(data);
    data.forEach((el) => {
      const line = document.createElement('div');
      line.textContent = el.word;
      this.domElements.wordsData.append(line);
    });
  }
}
