import {
  SPEAK_MODE,
  VIEW_MODE,
} from './speak_it-constants';
import getMediaUrl from '../../utils/getMediaUrl';

export default class View {
  constructor() {
    this.image = document.querySelector('.image');
    this.translation = document.querySelector('.translation');
    this.input = document.querySelector('.inner');
    this.inputContainer = document.querySelector('.inner_container');
    this.listens = Array.from(document.querySelectorAll('.word_listen'));
    this.words = Array.from(document.querySelectorAll('.word'));
    this.transcriptions = Array.from(document.querySelectorAll('.transcription'));
    this.cards = Array.from(document.querySelectorAll('.speak_card'));
    this.textMean = document.querySelector('.text_mean');
    this.textExplain = document.querySelector('.text_explain');
    this.translateMean = document.querySelector('.translate_mean');
    this.translateExplain = document.querySelector('.tarnslate_explain');
    this.audios = [];
    this.result = document.querySelector('.result');
    this.groups = Array.from(document.querySelectorAll('.group'));
    this.rounds = Array.from(document.querySelectorAll('.round'));
    this.resultForNextRound = 0;
    this.mic = document.querySelector('.mic');
    this.buttonSpeak = document.querySelector('.speak');
    this.speaker = document.querySelector('.user-tool__button-speaker');
    return this;
  }

  selectCard(card, model) {
    let numerCardInArray;
    if (card) {
      numerCardInArray = card.querySelector('.word').id;
    } else {
      [numerCardInArray] = model.arrayNumders;
      this.cards[0].classList.add('choosen');
      this.viewWords(model.datasWords, model.datasTranscription, model.datasAudios,
        model.arrayNumders, model.id);
    }
    const imageURL = this.createImageURL(model.datasImages[numerCardInArray]);
    this.image.style.backgroundImage = imageURL;
    this.translation.innerText = model.datasWordTranslate[numerCardInArray];
    this.textMean.innerHTML = model.datasTextMeaning[numerCardInArray];
    let speakURL = getMediaUrl(model.datasAudioMeaning[numerCardInArray]);
    this.textMean.id = speakURL;
    this.textExplain.innerHTML = model.datasTextExample[numerCardInArray];
    speakURL = getMediaUrl(model.datasAudioExample[numerCardInArray]);
    this.textExplain.id = speakURL;
    this.translateMean.innerHTML = model.datasTextMeaningTranslate[numerCardInArray];
    this.translateExplain.innerHTML = model.datasTextExampleTranslate[numerCardInArray];
  }

  viewWords(arrayWords, arrayTranscripts, arrayAudios, numbers, id) {
    for (let i = 0; i < 10; i += 1) {
      this.words[i].innerText = arrayWords[numbers[i]];
      this.words[i].id = `${numbers[i]}`;
      this.cards[i].id = id[numbers[i]];
      this.transcriptions[i].innerText = arrayTranscripts[numbers[i]];
      const audioURL = getMediaUrl(arrayAudios[numbers[i]]);
      this.listens[i].id = audioURL;
    }
  }

  createImageURL = (link) => `url('${getMediaUrl(link)}')`

  changeInput() {
    this.input.innerText = '';
    this.translation.classList.toggle('not_display');
    this.inputContainer.classList.toggle('not_display');
    const inner = this.buttonSpeak.innerText;
    this.buttonSpeak.innerText = inner === SPEAK_MODE ? VIEW_MODE : SPEAK_MODE;
  }

  setStarsTop(group, round) {
    this.rounds.forEach((star) => star.classList.remove('gold'));
    this.rounds.forEach((star) => star.classList.add('star'));
    for (let i = 0; i <= group; i += 1) {
      this.groups[i].classList.remove('star');
      this.groups[i].classList.add('gold');
    }
    for (let i = 0; i <= round; i += 1) {
      this.rounds[i].classList.remove('star');
      this.rounds[i].classList.add('gold');
    }
  }

  playSound(sound) {
    if (this.audios.length > 0) {
      this.audios.forEach((el) => {
        const element = el;
        element.muted = true;
      });
      this.audios = [];
    }
    const audio = new Audio(sound);
    this.audios.push(audio);
    if (this.speaker.classList.contains('user-tool__button-speaker--active')) {
      audio.play();
    }
  }

  recognition(record) {
    this.input.innerText = record;
  }

  clearTranslation() {
    this.input.innerText = '';
  }

  toggleMicrophone() {
    this.mic.classList.toggle('mic_active');
  }
}
