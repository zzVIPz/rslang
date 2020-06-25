import { speakItStartPage, 
    preloader, 
    speakItGame,
    oneCard,
    container,
    timeForPreloader } from './speak_it-constants';
import {StartingClass} from './speak_it-starting-page';
import {Controller} from './speak_it-controller';

export function startSpeakItGame() {
    document.body.classList.add('app__background');
    container.style.display = 'block';
    container.innerHTML = preloader;
    setTimeout(runStartPage(), timeForPreloader)
}
function runStartPage() {
    container.innerHTML = speakItStartPage;
    const preload = new StartingClass();
    preload.addListeners();
    document.querySelector('.app__button').onclick = () => runGamePage(preload.choosenGroup, preload.choosenPage)
}

function runGamePage(group, round) {
    container.innerHTML = speakItGame;
    const wordsContainer = document.querySelector('.words_container');
    for(var j = 0; j < 10; j++) {
        wordsContainer.innerHTML += oneCard;
    }
    const controller = new Controller(group, round);
    controller.addListeners();
}