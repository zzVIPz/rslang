import {
  QUANTITY_STARS_NEXT_LEVEL,
  ONE_START,
  QUANTITY_ROUNDS_LEVELS,
  CORRECT_MP3,
  MISS_MP3,
  MICROPHONE_TIME,
} from './speak_it-constants';
import { View } from './speak_it-view';
import { Model } from './speak_it-model';
import { recognition } from './speak_it-recognition';
import { ModalWindow } from './speak_it-modal-window';
import getMediaUrl from '../../utils/getMediaUrl';
import MainModel from '../../models/mainModel';
import MainView from '../../views/mainView';

export class Controller {
  constructor(group, round, user) {
    this.startPage = 0;
    this.startGroup = group;
    this.startRound = round;
    this.buttonRestart = document.querySelector('.restart');
    this.buttonSpeak = document.querySelector('.speak');
    this.containerOver = document.querySelector('.container_over');
    this.examples = Array.from(document.querySelectorAll('.examples'));
    this.microphone = document.querySelector('.mic');
    this.clear = document.querySelector('.clear');
    this.groups = Array.from(document.querySelectorAll('.hard_level > p'));
    this.rounds = Array.from(document.querySelectorAll('.page_level > p'));
    this.closeBtn = document.querySelector('.close');
    this.corectAns = 0;
    this.choosenWordIndex = 0;
    this.recognitionMod = false;
    this.correctAudio = new Audio(getMediaUrl(CORRECT_MP3));
    this.uncorrectAudio = new Audio(getMediaUrl(MISS_MP3));
    this.user = user;
    this.mainModel = new MainModel();
    this.mainView = new MainView();
  }

  initGame() {
    this.model = new Model();
    this.view = new View();
    this.view.setStarsTop(this.startGroup, this.startRound);
    this.onload();
    this.chooseCard();
    this.rotateCard();
    this.getResultOfSpeak();
    this.buttonRestart.onclick = () => {
      this.model.reset();
      this.onload();
    };
    this.buttonSpeak.onclick = () => this.view.changeInput();
    this.view.listens.forEach((word) => word.addEventListener('click', () => this.view.playSound(word.id)));
    this.speechRecognition();
    this.clear.onclick = () => {
      this.view.input.innerText = '';
      return true;
    };
    this.closeStartPage();
  }

  async onload() {
    this.cards = Array.from(document.querySelectorAll('.card'));
    this.cards.forEach((card) => card.classList.remove('choosen'));
    this.startPage = this.model.setRandomStartPage(this.startRound);
    const gettingJson = await this.mainModel.getWords(this.startPage, this.startGroup);
    this.model.extractAllDatas(gettingJson);
    this.view.selectCard(false, this.model);
    this.model.chooseWord = this.model.datasWords[this.model.arrayNumders[0]];
    this.examples.forEach((example) => example.addEventListener('click', () => this.view.playSound(example.id)));
    this.choosenWordIndex = 0;
  }

  chooseCard() {
    this.cards.forEach((card) => card.addEventListener('click', () => {
      if (this.cards.includes(card)) {
        this.view.clearTranslation();
        this.model.chooseWord = this.model.datasWords[card.querySelector('.word').id];
        Array.from(document.querySelectorAll('.card')).forEach((cardSelected) => cardSelected.classList.remove('choosen'));
        card.classList.add('choosen');
        this.view.selectCard(card, this.model);
        this.choosenWordIndex = card.querySelector('.word').id
      }
    }));
  }

  rotateCard() {
    this.containerOver.onmouseover = function () {
      this.querySelector('.card_over').classList.add('rotate');
    };
    this.containerOver.onmouseout = function () {
      this.querySelector('.card_over').classList.remove('rotate');
    };
  }

  getResultOfSpeak() {
    recognition.addEventListener('result', (e) => {
      const result = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join('');
      this.view.recognition(result);
      recognition.stop();
      let num = this.choosenWordIndex;
      let arr = this.model;
      if (this.model.checkResult(result)) {
        this.addToCorrectArray(arr.id[num], arr.datasWords[num], arr.datasAudios[num], arr.datasWordTranslate[num]);
        this.view.result.innerHTML += ONE_START;
        console.log(arr.datasWords[num]);
        this.addedRightAnwser();
        this.playCorrectAnwser();
        const correctelement = document.querySelector('.choosen');
        for (let i = 0; i < this.cards.length; i += 1) {
          if (this.cards[i] === correctelement) {
            delete this.cards[i];
          }
        }
        this.cards;
      } else {
        this.addToWrongArray(arr.id[num], arr.datasWords[num], arr.datasAudios[num], arr.datasWordTranslate[num]);
        console.log(arr.datasWords[num]);
        
        this.playWrongAnwser();
      }
      return false;
    });
  }

  addToCorrectArray(id, word, soundURL, wordTranslate) {
    const obj = { word, id, soundURL, wordTranslate};
    if (this.isThereRepeat(this.model.correct, word)) {
      this.model.correct.push(obj);
    }
  }

  addToWrongArray(id, word, soundURL, wordTranslate) {
    const obj = { word, id, soundURL, wordTranslate };
    if (this.isThereRepeat(this.model.uncorrect, word)) {
      this.model.uncorrect.push(obj);
    }
  }

  isThereRepeat(array, word) {
    for (const elem of array) {
      if (elem.word === word) {
        return false;
      }
    }
    return true;
  }

  addedRightAnwser() {
    this.corectAns += 1;
    if (this.corectAns === QUANTITY_STARS_NEXT_LEVEL) {
      this.startRound += 1;
      this.corectAns = 0;
      if (this.startRound === QUANTITY_ROUNDS_LEVELS) {
        this.startGroup += 1;
        this.startRound = 0;
      }
      this.view.setStarsTop(this.startGroup, this.startRound);
      this.onload();
      this.view.result.innerHTML = '';
    }
  }

  closeStartPage() {
    this.closeBtn.onclick = () => {
      const modal = new ModalWindow(this.model.correct, this.model.uncorrect);
      modal.runListeners(this.user, this.mainView);
      modal.toggelModalWindov();
    };
  }

  playCorrectAnwser() {
    this.correctAudio.play();
  }

  playWrongAnwser() {
    this.uncorrectAudio.play();
  }

  speechRecognition() {
    this.microphone.onclick = () => {
      this.recognitionMod = !this.recognitionMod;
      if (this.recognitionMod) {
        recognition.start();
        this.view.toggleMicrophone();
        setTimeout(() => {
          recognition.stop();
          this.view.toggleMicrophone();
          this.recognitionMod = !this.recognitionMod;
          return false;
        }, MICROPHONE_TIME);
      } else {
        recognition.stop();
        this.view.toggleMicrophone();
        return false;
      }
    };
  }
}
