// import {View} from './view';
// import {Controller} from './controller';
// import {initionGamePage} from './page_game';
import {initionStartPage} from './page_start';
// import '../sass/speak-it.scss';
import '../sass/_savannah-startPage.scss';
// import {Model} from './model';

// import {Pagination} from './pagination';

// ------------------------------------speak recognition-----------------------------------
// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// recognition.interimResults = true;
// recognition.lang = 'en-US';
// recognition.maxAlternatives = 1;
// recognition.continuous = true;
// recognition.interimResults = false;
// }
// --------------------------------------------speak input microphone------------------------------
// class inputMic {
//     constructor(index, object) {
//         this.index = index;
//         this.word = object.datasWords[index];
//         this.audio = this.setAudioURL(object.datasAudios[index]);
//         this.wordMean = object.datasTextMeaning[index];
//         this.wordExplain = object.datasTextExample[index];
//         this.translateMean = object.datasTextMeaningTranslate[index];
//         this.tanslatyeExplain = object.datasTextExampleTranslate[index];
//         this.audioMeaning = this.setAudioURL(object.datasAudioMeaning[index]);
//         this.audioExample = this.setAudioURL(object.datasAudioExample[index]);
//     }

// }
//  ----------------------------view----------------------------------


// -------------------------------------model------------------------------------------

// --------------------------------controller--------------------------------------
export let model = {};
export let view = {};
export let controller = {};

export async function runSpeakItGame() { 
  initionStartPage()
//   initionGamePage()
//   controller = new Controller();
//   controller.onload();
//   model = new Model();
//   const gettingJson = await model.getJson(controller.startGroup, controller.startPage);
//   model.extractAllDatas(gettingJson);
//   view = new View();
//   view.selectCard();
  
//   controller.addListeners() 
}


//Use class for microphone input




// function checking(inputWord) {
//     console.log(inputWord);
//     let exampleword = example.innerText;
//     let checking = inputWord;

//     let arrExample = exampleword.split('')
//     let arr = checking.split('')
//     let mis = 0;

//     for (let i=0 ; i < arrExample.length ; i++){
//         if (arrExample[i] != arr[i]){
//             mis++
//         }
//     }

//     console.log('we get: ', mis, ' mistakes')
// }

// button.addEventListener('click', () => {
//     const word = inputing.innerText
//     checking(word)
// })
