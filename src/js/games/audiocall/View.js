// import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';
// import MainModel from '../../models/mainModel';

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
      this.raitingContainer =  document.querySelector('.raiting-container');
      this.levelButtons =  document.querySelector('.rating');
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
                this.raitingContainer.classList.add('hide');
                this.gamePage.classList.add('show');
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

      levelSelection() {
        this.levelButtons.addEventListener('click', (event) => {
          event.preventDefault();
          
          console.log(event.target.dataset.level);
        });
      }


      playAudio() {
        this.playAudioBtn.addEventListener('click', () => {
          this.sound('/* тут ссылка на слово */');
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
      
      sound(src) {
        let audio = new Audio(); 
        audio.src = src; 
        audio.autoplay = true; 
        audio.onloadedmetadata = function() {
            console.log(audio.duration);
          };
      }
  }
  
  export default AudiocallView;