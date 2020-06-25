import { soundURL, imageURL } from './speak_it-constants';

export class View {
    constructor() {
        this.image = document.querySelector('.image');
        this.translation = document.querySelector('.translation');
        this.input = document.querySelector('.inner');
        this.inputContainer = document.querySelector('.inner_container');
        this.listens = Array.from(document.querySelectorAll('.word_listen'));
        this.words = Array.from(document.querySelectorAll('.word'));
        this.transcriptions = Array.from(document.querySelectorAll('.transcription'));
        this.cards = Array.from(document.querySelectorAll('.card'));
        this.textMean = document.querySelector('.text_mean');
        this.textExplain = document.querySelector('.text_explain');
        this.translateMean = document.querySelector('.translate_mean');
        this.translateExplain = document.querySelector('.tarnslate_explain');
        this.audios = [];
        this.result = document.querySelector('.result');
        this.groups = Array.from(document.querySelectorAll('.group'));
        this.rounds = Array.from(document.querySelectorAll('.round'));
        this.resultForNextRound = 0;
        return this;
       
    }
    selectCard(card, model) {
        let numerCardInArray;
        if(card){
            numerCardInArray = card.querySelector('.word').id;
        }else{
            numerCardInArray = model.arrayNumders[0];
            this.cards[0].classList.add('choosen');
            this.viewWords(model.datasWords, model.datasTranscription, model.datasAudios, model.arrayNumders, model.id);
        }
        let imageURL = this.createURL(model.datasImages[numerCardInArray]);
        this.image.style.backgroundImage = imageURL;
        this.translation.innerText = model.datasWordTranslate[numerCardInArray];
        this.textMean.innerHTML = model.datasTextMeaning[numerCardInArray];
        let speakURL = this.createSoundURL(model.datasAudioMeaning[numerCardInArray]);
        this.textMean.id = speakURL;
        this.textExplain.innerHTML = model.datasTextExample[numerCardInArray];
        speakURL = this.createSoundURL(model.datasAudioExample[numerCardInArray]);
        this.textExplain.id = speakURL;
        this.translateMean.innerHTML = model.datasTextMeaningTranslate[numerCardInArray];
        this.translateExplain.innerHTML = model.datasTextExampleTranslate[numerCardInArray];
    }
    viewWords(arrayWords, arrayTranscripts, arrayAudios, numbers, id) {
        for(let i = 0 ; i < 10 ; i++){
            this.words[i].innerText = arrayWords[numbers[i]];
            this.words[i].id = `${numbers[i]}`;
            this.cards[i].id = id[numbers[i]];
            this.transcriptions[i].innerText = arrayTranscripts[numbers[i]];
            let audioURL = this.createSoundURL(arrayAudios[numbers[i]])
            this.listens[i].id = audioURL;
        }
    }
    createSoundURL(link) {
        return soundURL + link
    }
    createURL(link) {
        return imageURL + link + `')`
    }
    changeInput() {
        this.input.innerText = '';
        this.translation.classList.toggle('not_display');
        this.inputContainer.classList.toggle('not_display');
    }
    setStarsTop(group, round) {
        this.rounds.forEach(star => star.classList.remove('gold'));
        this.rounds.forEach(star => star.classList.add('star'));
        for(let i=0 ; i <= group ; i++){
            this.groups[i].classList.remove('star');
            this.groups[i].classList.add('gold');
        }
        for(let i=0 ; i <= round ; i++){
            this.rounds[i].classList.remove('star');
            this.rounds[i].classList.add('gold');
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
    recognition(record) {
        this.input.innerText = record;
    }
}