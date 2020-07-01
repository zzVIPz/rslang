import templateStart from './templateStart';
import EnglishPuzzleController from '../controllers/englishPuzzleController';

export default class EnglishPuzzleView {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.view = templateStart;
  }

  start() {
    document.querySelector('.main').innerHTML = this.view;
    document.querySelector('.ep-startScreen').classList.add('ep-background');

    document.getElementById('startButton').addEventListener('click', () => {
      const englishPuzzle = new EnglishPuzzleController(this.user, this.mainView);
      englishPuzzle.init();
    });

    document.getElementById('closeButton').addEventListener('click', () => {
      this.mainView.renderMain(this.user);
    });
  }
}
