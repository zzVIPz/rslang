import {runSpeakItGame} from './speak_it';


export class Model {
  constructor() {
    this.arrayNumders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.datasWords = [];
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
    this.recognitionMod = false
  }

  createURL(link) {
    return `url('https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}')`
  }

  createSoundURL(link) {
  return `https://raw.githubusercontent.com/vitali30/rslang-data/master/${link}`
  }

  getJson(group, page) {
    return fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`)
      .then(response => response.json())
  }

  resetDatas() {
    this.datasWords = [];
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

  extractAllDatas(json) {
    this.shuffle(this.arrayNumders);
    for (let i = 0 ; i < json.length ; i++){
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
    };
  }

  SpeechRecognition() {
    this.recognitionMod = !this.recognitionMod;
    if (this.recognitionMod){
      recognition.addEventListener('result', e => {
        const result = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        view.recognition(result);
        recognition.stop();
        this.checkResult();
      })
      recognition.start()
      }else{
      recognition.stop();
    }
  }

}