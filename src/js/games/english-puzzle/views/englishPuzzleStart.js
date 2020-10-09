import templateStart from './templateStart';
import EnglishPuzzleController from '../controllers/englishPuzzleController';
import GLOBAL from '../../../constants/global';

export default class EnglishPuzzleView {
  constructor(user, mainView, statistics, setDefaultHash) {
    this.user = user;
    this.stats = statistics;
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
      this.stats.gameStartsStat(GLOBAL.STAT_GAME_NAMES.englishPuzzle);
    });

    document.getElementById('closeButton').addEventListener('click', () => {
      this.setDefaultHash();
      this.mainView.renderMain(this.user);
    });
  }
}
