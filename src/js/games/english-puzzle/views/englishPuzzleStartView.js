import templateStart from './templateStart';
import EnglishPuzzleController from '../controllers/englishPuzzleController';

export default class EnglishPuzzleView {
  constructor(user, mainView) {
    this.user = user;
    this.mainView = mainView;
    this.view = templateStart;
    this.domElements = {};
  }

  /* TODO: add and remove 'ep-background' class to 'english-puzzle' div, check this class styles */
  start() {
    document.querySelector('.main').innerHTML = this.view;
    document.querySelector('.ep-startScreen').classList.add('ep-background');
    this.domElements.startButton = document.getElementById('startButton');
    this.domElements.closeButton = document.getElementById('closeButton');

    this.domElements.startButton.addEventListener('click', () => {
      const englishPuzzle = new EnglishPuzzleController(this.user, this.mainView);
      englishPuzzle.init();
    });

    this.domElements.closeButton.addEventListener('click', () => {
      document.querySelector('.ep-startScreen').classList.remove('ep-background');
      this.mainView.renderMain(this.user);
    });
  }
}
