import {
  START_PAGE,
  PRELOADER,
  GAME_PAGE,
  ONE_CARD,
  container,
  PRELOADING_TIME,
  QUANTITY_WORDS_IN_PAGE,
} from './speak_it-constants';
import StartingClass from './speak_it-starting-page';
import Controller from './speak_it-controller';
import GLOBAL from '../../constants/global';

function runGamePage(group, round, user, mainView, parseLearningsWords, dailyStatistics) {
  container.innerHTML = PRELOADER;
  setTimeout(() => {
    dailyStatistics.gameStartsStat(GLOBAL.STAT_GAME_NAMES.speakit);
    container.innerHTML = GAME_PAGE;
    const wordsContainer = document.querySelector('.words_container');
    for (let j = 0; j < QUANTITY_WORDS_IN_PAGE; j += 1) {
      wordsContainer.innerHTML += ONE_CARD;
    }
    const controller = new Controller(group, round, user, mainView, parseLearningsWords);
    controller.initGame();
  }, PRELOADING_TIME);
}

export default function startSpeakItGame(user, mainView, parseLearningsWords, dailyStatistics) {
  container.innerHTML = START_PAGE;
  const preload = new StartingClass(user, mainView);
  preload.addListeners();
  document.querySelector('.app__button').onclick = () => {
    runGamePage(preload.choosenGroup,
      preload.choosenPage,
      user,
      mainView,
      parseLearningsWords,
      dailyStatistics);
  };
}
