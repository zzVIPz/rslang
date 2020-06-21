import {runSpeakItGame, model, controller} from './speak_it';

export class View {
  constructor() {
    this.image = document.querySelector('.image');
    this.translation = document.querySelector('.translation');
    this.input = document.querySelector('.inner');
    this.container = document.querySelector('.words_container');
    this.listens = Array.from(document.querySelectorAll('.listen'));
    this.words = Array.from(document.querySelectorAll('.word'));
    this.transcriptions = Array.from(document.querySelectorAll('.transcription'));
    this.spinner = document.querySelector('.spiner');
    this.textMean = document.querySelector('.text_mean');
    this.textExplain = document.querySelector('.text_explain');
    this.translateMean = document.querySelector('.translate_mean');
    this.translateExplain = document.querySelector('.tarnslate_explain');
    this.audios = []
  }

  showImage(url) {
    this.image.style.backgroundImage = url;
  }

  showTranslation(translate) {
    this.translation.innerText = translate;
  }

  changeInput() {
    this.input.value = '';
    this.translation.classList.toggle('not_display');
    this.input.classList.toggle('not_display');
  }

  checkInput() {
    this.input.value = '';
    if (model.recognitionMod){
      view.translation.classList.toggle('not_display');
      view.input.classList.toggle('not_display');
      model.recognitionMod = false;
    }
    }

    playSound(sound) {
        if (this.audios.length > 0){
            this.audios.forEach(el => el.muted = true);
            this.audios = [];
        }
        let audio = new Audio(sound);
        this.audios.push(audio)
        audio.play();
        
    }

    viewWords(arrayWords, arrayTranscripts, arrayAudios) {
        for(let i = 0 ; i < 10 ; i++){
            this.words[i].innerText = arrayWords[model.arrayNumders[i]];
            this.words[i].id = `${model.arrayNumders[i]}`;
            this.transcriptions[i].innerText = arrayTranscripts[model.arrayNumders[i]];
            let audioURL = model.createSoundURL(arrayAudios[model.arrayNumders[i]])
            this.listens[i].src = audioURL;
        }
    }

    recognition(record) {
        this.input.value = record;
    }

    addDatasToPage(data) {
        document.querySelector('.card').classList.add('choosen')
        let imageURL = model.createURL(data.datasImages[0]);
        this.showImage(imageURL);
        this.showTranslation(data.datasWordTranslate[0]);
        this.viewWords(data.datasWords, data.datasTranscription, data.datasAudios);
    }

    selectCard(card) {
        let numerCardInArray;
        if(card){
            numerCardInArray = card.querySelector('.word').id;
            let audio = card.querySelector('.listen').src
        this.playSound(audio);
        }else{
            numerCardInArray = model.arrayNumders[0];
            controller.cards[0].classList.add('choosen');
            this.showTranslation(model.datasWordTranslate[numerCardInArray]);
            this.viewWords(model.datasWords, model.datasTranscription, model.datasAudios);
        }
        let imageURL = model.createURL(model.datasImages[numerCardInArray]);
        this.showImage(imageURL);
        this.showTranslation(model.datasWordTranslate[numerCardInArray]);
        this.textMean.innerHTML = model.datasTextMeaning[numerCardInArray];
        let speakURL = model.createSoundURL(model.datasAudioMeaning[numerCardInArray]);
        this.textMean.id = speakURL;
        this.textExplain.innerHTML = model.datasTextExample[numerCardInArray];
        speakURL = model.createSoundURL(model.datasAudioExample[numerCardInArray]);
        this.textExplain.id = speakURL;
        this.translateMean.innerHTML = model.datasTextMeaningTranslate[numerCardInArray];
        this.translateExplain.innerHTML = model.datasTextExampleTranslate[numerCardInArray];
        controller.addListenersPlayExamles();
    }
}
