import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';

class AudiocallView {
    constructor() {
      this.template = audiocallGame;
        // this.model = new AudiocallModel();
    }
    
    render() {
        document.querySelector('.main').innerHTML = this.template;
    }

    addListeners() {
        // this.introPage = document.querySelector('.container-game__trainings-audiocall__intro');
        // this.startBtn = document.querySelector('.container-game__trainings-audiocall__intro-btn');
        // this.gamePage = document.querySelector('.container-game__trainings-audiocall__answers');
        // this.closeBtnGame = document.querySelector('.container-game__trainings-audiocall__close');
        // this.modalWindow = document.querySelector('.container-game__modal');
        // this.closeModalWindow = document.querySelector('.container-game__modal__close-body');
        // this.cancelModalWindow = document.querySelector('.container-game__crossword-modal__cancel');
        // this.clickStartGameBtn();
        console.log(1);
        // this.closeBtn = document.querySelector('.container-game__trainings-audiocall__close');
        // this.cancelBtn = document.querySelector('.container-game__crossword-modal__cancel');
        // this.backToMianBtn = document.querySelector('.container-game__crossword-modal__btn-close');
        // this.startBtn = document.querySelector('.container-game__trainings-audiocall__intro-btn');
        // this.openModal();
        // this.closeModal();
        // this.backToMainPage();
      }
        // clickStartGameBtn() {
        //     this.startBtn.addEventListener('click', () => {
        //         // hide(this.introPage);
        //         // show(this.gamePage);
        //         console.log(1);
        //     });
        // }

        // hide(elem) {
        //     elem.style.display = 'none';
        // }

        // show(elem) {
        //     elem.style.display = 'block';
        // }

    //   openModal() {
    //     this.closeBtn.addEventListener('click', () => {
    //       this.view.displayModal();
    //     });
    //   }
    
    //   closeModal() {
    //     this.cancelBtn.addEventListener('click', () => {
    //       this.view.hideModal();
    //     });
    //   }
    
    //   backToMainPage() {
    //     this.backToMianBtn.addEventListener('click', () => {
    //       this.mainContainer.innerHTML = '';
    //     });
    //   }
    
    //   clickAudiocallBtn() {
    //     this.audiocallBtn = document.querySelector('.audiocall-game');
    //     this.audiocallBtn.addEventListener('click', () => {
    //       this.init();
    //     });
    //   }

    // displayModal() {
    //   this.appModal = document.querySelector('.container-game__modal');
    //   this.appModal.style.display = 'flex';
    // }
  
    // hideModal() {
    //   this.appModal.style.display = 'none';
    // }
  
    // renderGameLayout() {
    //   return this.audiocallGame;
    // }
  
  }
  
  export default AudiocallView;