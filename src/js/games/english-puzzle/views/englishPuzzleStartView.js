import templateStart from './templateStart';
import EnglishPuzzleController from '../controllers/englishPuzzleController';

export default class EnglishPuzzleView {
  constructor(user, mainView, setDefaultHash) {
    this.user = user;
    this.mainView = mainView;
    this.view = templateStart;
    this.setDefaultHash = setDefaultHash;
  }

  start() {
    document.querySelector('.main').innerHTML = this.view;
    document.querySelector('.ep-startScreen').classList.add('ep-background');

    document.getElementById('startButton').addEventListener('click', () => {
      const englishPuzzle = new EnglishPuzzleController(this.user,
        this.mainView, this.setDefaultHash);
      englishPuzzle.init();
    });

    document.getElementById('closeButton').addEventListener('click', () => {
      this.setDefaultHash();
      this.mainView.renderMain(this.user);
    });
  }
}