import addEventHandler from './addEventHandler';

export default class SpeechRecognitionClass {
  constructor(model, view) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ru';
    this.transcriptAnswer = '';
    this.model = model;
    this.view = view;
    this.recognitionNotStarted = true;
  }

  addListeners() {
    const microphoneImg = document.querySelector('.savannah-microphone');
    addEventHandler('click', microphoneImg, this.onMicrophoneClick.bind(this));
    addEventHandler('result', this.recognition, this.onRecognitionResult.bind(this));
    addEventHandler('end', this.recognition, this.onRecognitionEnd.bind(this));
  }

  removeListeners() {
    const microphoneImg = document.querySelector('.savannah-microphone');
    microphoneImg.removeEventListener('click', this.onMicrophoneClick.bind(this));
    this.recognition.removeEventListener('result', this.onRecognitionResult.bind(this));
    this.recognition.removeEventListener('end', this.onRecognitionEnd.bind(this));
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
    if (this.recognitionNotStarted) {
      this.recognitionNotStarted = false;
      const { transcript } = event.results[0][0];

      this.transcriptAnswer = transcript;
      this.isCorrectAnswer = this.checkCorrectTranslationFromRecognition();
      this.correctRecognitionAnswer();
    }
  }

  onRecognitionEnd = () => {
    if (this.recognitionNotStarted) {
      this.recognitionNotStarted = false;
      this.stopRecognition();
    }
  }

  checkCorrectTranslationFromRecognition() {
    return this.transcriptAnswer.toLowerCase() === this.model.correctAnswer;
  }

  correctRecognitionAnswer() {
    if (!this.model.isWordClicked) {
      if (this.isCorrectAnswer && this.view.pos < (this.view.marginTop)) {
        this.model.findCorrectAnswerId();
        const correctHTMLel = this.view.findCorrectAnswerHTMLel();

        if (this.model.audioOn) {
          this.view.correctSound.play();
        }

        this.model.rightAnswersCounter += 1;
        this.view.rightTranslationActions(correctHTMLel, true);
        setTimeout(() => { this.view.nextWord(); }, 1000);
      }
    }
  }

  stopRecognition() {
    this.recognition.stop();
  }
}
