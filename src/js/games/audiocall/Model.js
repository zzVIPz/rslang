import MainModel from '../../models/mainModel';
import getMediaUrl from '../../utils/getMediaUrl';

class AudiocallModel {
    constructor() {
      this.rightAnswer = 0;
      this.wrongAnswer = 0;
      this.indexPositionAnswer = [1, 2, 3, 4];
      this.mainModel = new MainModel();
      // this.media = new getMediaUrl();
    }

    async fetchWords(user, chosenLevel, chosenRound) {
        this.currentUser = user;
        this.currentUser.currentGroup = chosenLevel || 0;
        this.currentUser.currentPage = chosenRound || 0;
    
        console.log('My user:', this.currentUser);
        const data = await this.mainModel.getWords(this.currentUser.currentPage, this.currentUser.currentGroup);
        return data;
      }
      
      getMediaData(data) {
        this.shuffle(data);
        this.wordsArr = data.map((el) => el.word);
        this.imageSrc = data.map((el) => el.image);
        this.images = this.imageSrc.map(el => getMediaUrl(el));
        this.audioSrc = data.map((el) => el.audio);
        this.audioArr = this.audioSrc.map(el => getMediaUrl(el));
        this.translate = data.map((el) => el.wordTranslate);
      }

      async  getWordsForAnswers(words) {
        const oneWord = words.split(' ');
        const url = `https://rhymebrain.com/talk?function=getRhymes&lang=ru&maxResults=10&word=${oneWord}`;
        const res = await fetch(url);
        const dataWords = await res.json();
        return dataWords;
      }

      indexPositionAnswerEl() {
        return this.shuffle(this.indexPositionAnswer);
      }

      shuffle(array) {
        // array.sort(() => Math.random() - 0.5);
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
}

export default AudiocallModel;