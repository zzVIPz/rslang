import MainModel from '../../models/mainModel';

class AudiocallModel {
    constructor() {
      this.rightAnswer = 0;
      this.wrongAnswer = 0;
      this.indexPositionAnswer = [0, 1, 2, 3];
      this.mainModel = new MainModel();
    }

    async fetchWords(chosenLevel, chosenRound) {
        this.currentUser = await this.mainModel.getUser();
        if (chosenLevel) {
          this.currentUser.currentGroup = chosenLevel;
          this.currentUser.currentPage = chosenRound;
        }
    
        if (chosenRound) {
          this.currentUser.currentPage = chosenRound;
        }
    
        console.log('My user:', this.currentUser);
        //todo: для получения только по странице и группе
        this.currentUser.cardsTotal = undefined;
        const data = await this.mainModel.getWords(this.currentUser);
        return data;
      }

      getMediaData(data) {
        this.shuffle(data);
        this.wordsArr = data.map((el) => el.word);
        this.imageSrc = data.map((el) => el.image);
        this.images = this.imageSrc.map(el => this.mainModel.getMedia(el));
        this.audioSrc = data.map((el) => el.audio);
        this.audioArr = this.audioSrc.map(el => this.mainModel.getMedia(el));
        this.translate = data.map((el) => el.wordTranslate);
      }

      async  getWordsForAnswers(words) {
        const url = `https://rhymebrain.com/talk?function=getRhymes&lang=ru&maxResults=10&word=${words}`;
        const res = await fetch(url);
        const dataWords = await res.json();
        // console.log(data);
        return dataWords;
      }

      indexPositionAnswerEl() {
        return this.shuffle(this.indexPositionAnswer);
      }

      shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
}

export default AudiocallModel;