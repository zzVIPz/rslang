// import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';
import CONST_MAIN_VIEW from '../../constants/constMainView';

class AudiocallView {
    constructor() {
      this.template = audiocallGame;
        // this.model = new AudiocallModel();
    }
    
    render() {
        document.querySelector('.main').innerHTML = this.template;
    }

    addListeners() {
      this.mainContainer =  document.querySelector('.main');
      this.introPage = document.querySelector('.container-game__trainings-audiocall__intro');
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
      this.playAudio();
    }
        clickStartGameBtn() {
            this.startBtn.addEventListener('click', () => {
                this.introPage.classList.add('hide');
                this.gamePage.classList.add('show');
                this.getWords(2,0);
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
          this.mainContainer.innerHTML = '';
        });
      }

      playAudio() {
        this.playAudioBtn.addEventListener('click', () => {
          // sound('surprised.mp3');
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
        });
      }

      async getWords(page, group) {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
      };
  }
  
  export default AudiocallView;