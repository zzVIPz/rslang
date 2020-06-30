import MainModel from '../../models/mainModel';
import shuffle from './audiocall-utils/shuffle';

class AudiocallModel {
    constructor() {
      this.rightAnswer = [];
      this.wrongAnswer = [];
      this.indexPositionAnswer = [1, 2, 3, 4];
      this.mainModel = new MainModel();
    }

    async fetchWords(user, chosenLevel, chosenRound) {
        this.currentUser = user;
        this.currentUser.currentGroup = chosenLevel || 0;
        this.currentUser.currentPage = chosenRound || 0;
    
        console.log('My user:', this.currentUser);
        const data = await this.mainModel.getWords(this.currentUser.currentPage, this.currentUser.currentGroup);
        return data;
      }
      
      shuffleArray(data) {
        return shuffle(data);
      }

      async  getWordsForAnswers(words) {
        const oneWord = words.split(' ');
        const url = `https://rhymebrain.com/talk?function=getRhymes&lang=ru&maxResults=10&word=${oneWord}`;
        const res = await fetch(url);
        const dataWords = await res.json();
        return dataWords;
      }

      indexPositionAnswerEl() {
        return this.shuffleArray(this.indexPositionAnswer);
      }
}

export default AudiocallModel;