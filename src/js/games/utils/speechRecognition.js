import addEventHandler from './addEventHandler';
import {
  DELAY_NEXT_WORD,
} from '../savannah-game/constSavannah';

export default class SpeechRecognitionClass {
  constructor(model, view) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ru';
    this.transcriptAnswer = '';
    this.model = model;
    this.view = view;
  }

  addListeners() {
    this.microphoneImg = document.querySelector('.savannah-microphone');
    this.microphoneClick = this.onMicrophoneClick.bind(this);
    this.resultFunc = this.onRecognitionResult.bind(this);
    this.endFunc = this.onRecognitionEnd.bind(this);

    addEventHandler('click', this.microphoneImg, this.microphoneClick);
    addEventHandler('result', this.recognition, this.resultFunc);
    addEventHandler('end', this.recognition, this.endFunc);
  }

  removeListeners() {
    this.microphoneImg.removeEventListener('click', this.microphoneClick);
    this.recognition.removeEventListener('result', this.resultFunc);
    this.recognition.removeEventListener('end', this.endFunc);
  }

  onMicrophoneClick() {
    const microphone = document.querySelector('.microphone');
    if (microphone) {
      if (microphone.classList.contains('microphone_active')) {
        this.stopRecognition();
        document.querySelector('.microphone').classList.remove('microphone_active');
      } else {
        document.querySelector('.microphone').classList.add('microphone_active');
        this.turnOnMicrophone();
      }
    }
  }

  turnOnMicrophone() {
    this.recognition.start();
  }

  onRecognitionResult = (event) => {
    const { transcript } = event.results[0][0];

    this.transcriptAnswer = transcript;
    this.isCorrectAnswer = this.checkCorrectTranslationFromRecognition();
    this.correctRecognitionAnswer();
  }

  onRecognitionEnd = () => {
    this.stopRecognition();
  }

  checkCorrectTranslationFromRecognition() {
    return this.transcriptAnswer.toLowerCase() === this.model.correctAnswer;
  }

  correctRecognitionAnswer() {
    const correctAnswer = true;

    if (!this.model.isWordClicked) {
      if (this.isCorrectAnswer && this.view.pos < (this.view.marginTop)) {
        this.model.findCorrectAnswerId();
        const correctHTMLel = this.view.findCorrectAnswerHTMLel();

        if (this.model.audioOn) {
          this.view.correctSound.play();
        }

        this.model.rightAnswersCounter += 1;
        this.view.rightTranslationActions(correctHTMLel, correctAnswer);
        setTimeout(() => { this.view.nextWord(); }, DELAY_NEXT_WORD);
      }
    }
  }

  stopRecognition() {
    this.recognition.stop();
  }
}
