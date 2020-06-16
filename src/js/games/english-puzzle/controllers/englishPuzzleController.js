// import EnglishPuzzleModel from '../models/englishPuzzleModel';
import EnglishPuzzleView from '../views/englishPuzzleView';

export default class EnglishPuzzleController {
  constructor() {
    this.englishPuzzleView = new EnglishPuzzleView();
    // this.englishPuzzleModel = new EnglishPuzzleModel();
  }

  init() {
    this.englishPuzzleView.render();
  }
}
