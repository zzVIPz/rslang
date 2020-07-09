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

function runGamePage(group, round, user, mainView) {
  container.innerHTML = PRELOADER;
  setTimeout(() => {
    container.innerHTML = GAME_PAGE;
    const wordsContainer = document.querySelector('.words_container');
    for (let j = 0; j < QUANTITY_WORDS_IN_PAGE; j += 1) {
      wordsContainer.innerHTML += ONE_CARD;
    }
    const controller = new Controller(group, round, user, mainView);
    controller.initGame();
  }, PRELOADING_TIME);
}

export default function startSpeakItGame(user, mainView) {
  container.innerHTML = START_PAGE;
  const preload = new StartingClass(user, mainView);
  preload.addListeners();
  document.querySelector('.app__button').onclick = () => {
    runGamePage(preload.choosenGroup, preload.choosenPage, user, mainView);
  };
}
