import { NumberOfMisForCorrectAnwser, fetchURL, container } from './speak_it-constants';
import {recognition} from './speak_it-recognition'

export class Model {
    constructor() {
        this.arrayNumders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.datasWords = [];
        this.id = [];
        this.datasImages = [];
        this.datasAudios = [];
        this.datasAudioMeaning = [];
        this.datasAudioExample = [];
        this.datasTextMeaning = [];
        this.datasTextExample = [];
        this.datasTranscription = [];
        this.datasTextExampleTranslate = [];
        this.datasTextMeaningTranslate = [];
        this.datasWordTranslate = [];
        this.recognitionMod = false;
        this.correct = [];
        this.uncorrect = [];
        return this
    }
    getJson(group, page) {
        return fetch(fetchURL + page + '&group=' + group)
        .then(response => response.json())
    }
    extractAllDatas(json) {
        this.shuffle(this.arrayNumders);
        for (let i = 0 ; i < json.length ; i ++){
            this.datasWords.push(json[i].word);
            this.datasImages.push(json[i].image);
            this.datasAudios.push(json[i].audio);
            this.datasAudioMeaning.push(json[i].audioMeaning);
            this.datasAudioExample.push(json[i].audioExample);
            this.datasTextMeaning.push(json[i].textMeaning);
            this.datasTextExample.push(json[i].textExample);
            this.datasTranscription.push(json[i].transcription);
            this.datasTextExampleTranslate.push(json[i].textExampleTranslate);
            this.datasTextMeaningTranslate.push(json[i].textMeaningTranslate);
            this.datasWordTranslate.push(json[i].wordTranslate);
            this.id.push(json[i].id)

            this.chooseWord = '';
        };
    }

    reset() {
        this.arrayNumders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.datasWords = [];
        this.id = [];
        this.datasImages = [];
        this.datasAudios = [];
        this.datasAudioMeaning = [];
        this.datasAudioExample = [];
        this.datasTextMeaning = [];
        this.datasTextExample = [];
        this.datasTranscription = [];
        this.datasTextExampleTranslate = [];
        this.datasTextMeaningTranslate = [];
        this.datasWordTranslate = [];
    }
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    SpeechRecognition() {
        this.recognitionMod = !this.recognitionMod;
        if (this.recognitionMod){
            recognition.start()
        }else{
            recognition.stop();
            return false;
        }
    }
    checkResult(checkingWord){
        let arrExample = this.chooseWord.toUpperCase().split('');
        let arrCheck = checkingWord.toUpperCase().split('');
        let mis = 0;
        for (let i=0 ; i < arrExample.length ; i++){
            if (arrExample[i] != arrCheck[i]){
                mis++
            }
        }
        if(mis <= NumberOfMisForCorrectAnwser){
            return true
        }
    }
    setRandomStartPage(round) {
        let max = round * 5;
        let min = max + 4;
        return Math.floor(Math.random() * (max - min)) + min;
    }

}