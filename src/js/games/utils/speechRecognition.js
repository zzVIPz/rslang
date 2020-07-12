import addEventHandler from './addEventHandler';

export default class SpeechRecognitionClass {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ru';
    this.transcriptAnswer = '';
  }

  addListeners() {
    const microphoneImg = document.querySelector('.savannah-microphone');
    addEventHandler('click', microphoneImg, this.onMicrophoneClick.bind(this));
    addEventHandler('result', this.recognition, this.onRecognitionEnd.bind(this));
  }

  onMicrophoneClick() {
    this.recognition.start();
  }

  onRecognitionEnd = (event) => {
    const { transcript } = event.results[0][0];

    this.transcriptAnswer = transcript;
  }
}
