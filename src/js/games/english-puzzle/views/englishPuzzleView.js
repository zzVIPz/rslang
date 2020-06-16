import EnglishPuzzleModel from '../models/englishPuzzleModel';

export default class EnglishPuzzleView {
  constructor() {
    this.template = `
      <div>
      <h1>ПРЮВЭТ!!</h1>
        <div class="mockData"></div>
      </div>
      `;
    this.englishPuzzleModel = new EnglishPuzzleModel();
  }

  render() {
    document.querySelector('.main').innerHTML = this.template;
    this.englishPuzzleModel.data.forEach((el) => {
      const elem = document.createElement('div');
      elem.textContent = el.word;
      console.log(elem);
      document.querySelector('.mockData').append(elem);
    });
  }
}
