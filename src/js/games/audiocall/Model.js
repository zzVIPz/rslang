import MainModel from '../../models/mainModel';

class AudiocallModel {
    constructor() {
        this.difficultyLevel = {
            level: 0,
          };
          this.wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words?';
          this.rightAnswer = 0;
          this.wrongAnswer = 0;
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

      shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
}

export default AudiocallModel;