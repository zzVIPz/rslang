import EnglishPuzzleModel from '../models/englishPuzzleModel';

export default class EnglishPuzzleView {
  constructor() {
    this.template = `
      <div class="english-puzzle">
        <div class="controls">
          <div class="controls__left-side">
            <label>
              Level
              <select name="levelSelect">
                <option value="value1">1</option> 
                <option value="value2" selected>2</option>
                <option value="value3">3</option>
              </select>
            </label>
            <label>
              Page
              <select name="pageSelect">
                <option value="value1">1</option> 
                <option value="value2">2</option>
                <option value="value3" selected>3</option>
              </select>
            </label>
          </div>
          <div class="controls__right-side">
            <div class="controls__btn"></div>
            <div class="controls__btn"></div>
            <div class="controls__btn"></div>
            <div class="controls__btn"></div>
          </div>
        </div>
        <div class="tips">
          <div class="controls__btn"></div>
          <p class="text-translate">Some text<p>
        </div>
        <div class="mockData"></div>
        <div class="playground"></div>
        <div class="play-buttons">
          <button class="english-puzzle__btn" name="skip">I don't know</button>
          <button class="english-puzzle__btn" name="check">Check</button>
        </div>
      </div>
      `;
    this.englishPuzzleModel = new EnglishPuzzleModel();
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    const sentences = this.englishPuzzleModel.getSentences();
    sentences.forEach((el) => {
      const elem = document.createElement('div');
      elem.classList.add('sentences');
      elem.textContent = el;
      document.querySelector('.mockData').append(elem);
    });
  }
}
