import {
  QUANTITY_STARS_NEXT_LEVEL,
  ONE_START,
  QUANTITY_ROUNDS_LEVELS,
  CORRECT_MP3,
  MISS_MP3,
  MICROPHONE_TIME,
  QUANTITY_MISS_RIGHT_ANWS,
  COLORS,
} from './speak_it-constants';
import View from './speak_it-view';
import Model from './speak_it-model';
import ModalWindow from './speak_it-modal-window';
import getMediaUrl from '../../utils/getMediaUrl';
import MainModel from '../../models/mainModel';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default class Controller {
  constructor(group, round, user, mainView) {
    this.startPage = 0;
    this.startGroup = group;
    this.startRound = round;
    this.buttonRestart = document.querySelector('.restart');
    this.buttonSpeak = document.querySelector('.speak');
    this.containerOver = document.querySelector('.container_over');
    this.examples = Array.from(document.querySelectorAll('.examples'));
    this.microphone = document.querySelector('.mic');
    this.clear = document.querySelector('.clear');
    this.closeBtn = document.querySelector('.close');
    this.speaker = document.querySelector('.user-tool__button-speaker');
    this.corectAns = 0;
    this.choosenWordIndex = 0;
    this.recognitionMod = false;
    this.correctAudio = new Audio(getMediaUrl(CORRECT_MP3));
    this.uncorrectAudio = new Audio(getMediaUrl(MISS_MP3));
    this.user = user;
    this.mainModel = new MainModel();
    this.mainView = mainView;
  }

  initGame() {
    this.createSpeachrecognition();
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
    this.playWordsPronunciation();
    this.speechRecognition();
    this.clear.onclick = () => {
      this.view.input.innerText = '';
      return true;
    };
    this.closeStartPage();
  }

  createSpeachrecognition() {
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }

  async onload() {
    this.view.renderCardsStyles();
    this.cards = Array.from(document.querySelectorAll('.speak_card'));
    this.startPage = this.model.setRandomStartPage(this.startRound);
    const gettingJson = await this.mainModel.getWords(this.startPage, this.startGroup);
    this.model.extractAllDatas(gettingJson);
    this.view.selectCard(false, this.model);
    this.model.chooseWord = this.model.datasWords[this.model.arrayNumders[0]];
    this.examples.forEach((example) => example.addEventListener('click', () => this.view.playSound(example.id)));
    this.choosenWordIndex = 0;
  }

  chooseCard() {
    this.cards = Array.from(document.querySelectorAll('.speak_card'));
    this.cards.forEach((card) => card.addEventListener('click', () => {
      if (this.cards.includes(card)) {
        this.view.clearTranslation();
        this.model.chooseWord = card.querySelector('.speak_word').innerText;
        this.cards.forEach((allCards) => allCards.classList.remove('choosen'));
        card.classList.add('choosen');
        this.view.selectCard(card, this.model);
        this.choosenWordIndex = card.querySelector('.speak_word').id;
      }
    }));
  }

  rotateCard() {
    this.containerOver.onmouseover = () => {
      document.querySelector('.card_over').classList.add('rotate');
    };
    this.containerOver.onmouseout = () => {
      document.querySelector('.card_over').classList.remove('rotate');
    };
  }

  getResultOfSpeak() {
    this.recognition.addEventListener('result', (e) => {
      const result = e.results[0][0].transcript;
      this.view.recognition(result);
      const word = this.model.datasWords[this.choosenWordIndex];
      const id = this.model.id[this.choosenWordIndex];
      const soundURL = this.model.datasAudios[this.choosenWordIndex];
      const wordTranslate = this.model.datasWordTranslate[this.choosenWordIndex];
      const objectWithResult = {
        word, id, soundURL, wordTranslate,
      };
      const choosenElement = document.querySelector('.choosen');
      const mistakesArray = this.model.checkResult(result);
      const lengthCorrectWord = this.model.chooseWord.length;
      if (mistakesArray.length <= QUANTITY_MISS_RIGHT_ANWS) {
        if (this.model.isCardAnswered(choosenElement, this.cards)) {
          this.view.setLettersColor(mistakesArray, lengthCorrectWord, COLORS.right);
          this.addToCorrectArray(objectWithResult, word);
          this.view.result.innerHTML += ONE_START;
          this.playAudio(this.correctAudio);
          this.cards = this.view.removeChoosenCardStiles(choosenElement, this.cards);
          this.addedRightAnwser();
        }
      } else {
        this.addToWrongArray(objectWithResult, word);
        this.playAudio(this.uncorrectAudio);
        this.view.setLettersColor(mistakesArray, lengthCorrectWord, COLORS.wrong);
      }
    });
    this.recognition.stop();
  }

  addToCorrectArray(obj, word) {
    if (this.isThereRepeat(this.model.correct, word)) {
      this.model.correct.push(obj);
    }
  }

  addToWrongArray(obj, word) {
    if (this.isThereRepeat(this.model.uncorrect, word)) {
      this.model.uncorrect.push(obj);
    }
  }

  isThereRepeat = (array, word) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].word === word) {
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
      const modal = new ModalWindow(this.model.correct,
        this.model.uncorrect,
        this.setDefaultHash,
        this.user);
      modal.runListeners(this.user, this.mainView);
      modal.toggelModalWindov();
    };
  }

  playAudio(audio) {
    if (this.speaker.classList.contains('user-tool__button-speaker--active')) {
      audio.play();
    }
  }

  speechRecognition() {
    this.microphone.onclick = () => {
      this.recognitionMod = !this.recognitionMod;
      if (this.recognitionMod) {
        this.recognition.start();
        this.view.toggleMicrophone();
        setTimeout(() => {
          this.recognition.stop();
          this.view.toggleMicrophone();
          this.recognitionMod = !this.recognitionMod;
          return false;
        }, MICROPHONE_TIME);
      } else {
        this.recognition.stop();
        this.view.toggleMicrophone();
        return false;
      }
      return true;
    };
  }

  playWordsPronunciation() {
    this.view.listens.forEach((pronunciation) => pronunciation.addEventListener('click', () => {
      if (pronunciation.classList.contains('word_listen_active')) {
        this.view.playSound(pronunciation.id);
      }
    }));
  }
}
