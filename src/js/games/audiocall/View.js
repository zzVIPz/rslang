import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';
import MainView from '../../views/mainView';
// import MainModel from '../../models/mainModel';

class AudiocallView {
    constructor() {
      this.template = audiocallGame;
      this.model = new AudiocallModel();
      this.mainView = new MainView();
    }
    
    render() {
        document.querySelector('.main').innerHTML = this.template;
    }

    addListeners() {
      this.mainContainer =  document.querySelector('.main');
      this.levelsContainer =  document.querySelector('.container-game__levels-container');
      this.roundContainer =  document.querySelector('.container-game__round-container');
      this.levelButtons =  document.querySelector('.rating');
      this.roundButtons =  document.querySelector('.rating-round');
      this.introPage = document.querySelector('.container-game__trainings-audiocall__intro');
      this.loader = document.querySelector('.container-game__preload');
      this.startBtn = document.querySelector('.container-game__trainings-audiocall__intro-btn');
      this.gamePage = document.querySelector('.container-game__trainings-audiocall__answers');
      this.closeBtnGame = document.querySelector('.container-game__trainings-audiocall__close');
      this.modalWindow = document.querySelector('.container-game__modal');
      this.closeModalWindow = document.querySelector('.container-game__modal__close-body');
      this.cancelModalWindow = document.querySelector('.container-game__crossword-modal__cancel');
      this.closeBtnModalGame = document.querySelector('.container-game__crossword-modal__btn-close');
      this.playAudioBtn = document.querySelector('.container-game__trainings-audiocall__speaker-container');
      
      this.clickStartGameBtn();
      this.openModal();
      this.closeModal();
      this.backToMainPage();
      this.getLevels();
      this.getRounds();
      this.playAudio();
    }
        clickStartGameBtn() {
            this.startBtn.addEventListener('click', () => {
              this.chosenLevel = this.level;
              this.chosenRound = this.round;
              this.introPage.classList.add('hide');
              this.levelsContainer.classList.add('hide');
              this.roundContainer.classList.add('hide');
              this.loader.classList.add('show');

              this.model.fetchWords(this.chosenLevel, this.chosenRound)
                .then((data) => {
                  console.log(data);
                  this.model.getMediaData(data);
                  this.wordsArr = this.model.wordsArr;
                  this.images = this.model.images;
                  this.audioArr = this.model.audioArr;
                  this.translate = this.model.translate;
                  this.lengthWordsArr = this.wordsArr.length;
                });
                setTimeout(() => {
                  this.loader.classList.remove('show');
                  this.gamePage.classList.add('show');
                },7000);
            });
        }

        openModal() {
          this.closeBtnGame.addEventListener('click', () => {
            this.modalWindow.classList.add('show-flex');
          });
        }

        closeModal() {
          this.closeModalWindow.addEventListener('click', () => {
            this.modalWindow.classList.remove('show-flex'); 
            this.modalWindow.classList.add('hide'); 
          });
          this.cancelModalWindow.addEventListener('click', () => {
            this.modalWindow.classList.remove('show-flex'); 
            this.modalWindow.classList.add('hide'); 
          });
        }
    
      backToMainPage() {
        this.closeBtnModalGame.addEventListener('click', () => {
          // this.mainView.renderMain(this.user)
          this.mainContainer.innerHTML = '';
        });
      }

      getLevels() {
        this.levelButtons.addEventListener('click', (event) => {
          event.preventDefault();
          
          this.level = event.target.dataset.level;
          console.log(this.level)
        });
      }

      getRounds() {
        this.roundButtons.addEventListener('click', (event) => {
          event.preventDefault();
          
          this.round = event.target.dataset.round;
          console.log(this.round)
        });
      }


      playAudio() {
        this.playAudioBtn.addEventListener('click', () => {
          // this.sound('/* тут ссылка на слово */');
          this.animationSpeaker();
        });
      }

      animationSpeaker() {
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.53)';
          document.querySelector('.big-circle').style.transform = 'scale(0.81)';
        }, 500);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.61)';
          document.querySelector('.big-circle').style.transform = 'scale(0.9)';
        }, 900);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.51)';
            document.querySelector('.big-circle').style.transform = 'scale(0.82)';
      }, 1300);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.61)';
          document.querySelector('.big-circle').style.transform = 'scale(0.9)';
        }, 1700);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.67)';
          document.querySelector('.big-circle').style.transform = 'scale(0.98)';
        }, 2100);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.7)';
          document.querySelector('.big-circle').style.transform = 'scale(0.7)';
        }, 2500);
      }
      
      sound(src) {
        let audio = new Audio(); 
        audio.src = src; 
        audio.autoplay = true; 
      }
  }
  
  export default AudiocallView;