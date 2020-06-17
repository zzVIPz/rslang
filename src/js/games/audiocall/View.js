import AudiocallModel from './Model';

class AudiocallView {
    constructor() {
      this.template = `
      <div class="container-game">
            <div class="container-game__trainings-audiocall" style="background-position-y: 100%;">
                <div>
                    <div class="container-game__trainings-audiocall__close"></div>
                    <div class="container-game__trainings-audiocall__intro">
                        <div class="container-game__trainings-audiocall__intro-title">
                            <span>Аудиовызов</span>
                        </div>
                        <div class="container-game__trainings-audiocall__intro-text">
                            <span>Тренировка Аудиовызов улучшает восприятие английской речи на слух.
                                Прослушай аудио на английском и укажи верный перевод к слову.
                            </span>
                        </div>
                        <a class="container-game__trainings-audiocall__intro-btn">
                            <span>Начать</span>
                        </a>
                    </div>
                </div>
                <div class="container-game__trainings-audiocall__answers">
                    <div class="container-game__trainings-audiocall__speaker-container">
                        <div class="container-game__trainings-audiocall__circle"></div>
                        <i class="container-game__trainings-audiocall__sound-btn"></i>
                    </div>
                    <div class="container-game__trainings-audiocall__answer">восхищение
                        <span class="container-game__trainings-audiocall__number">1</span>
                    </div>
                    <div
                        class="container-game__trainings-audiocall__answer container-game__trainings-audiocall__answer__m-answer-false">
                        освещение
                        <span class="container-game__trainings-audiocall__number">2</span>
                    </div>
                    <div
                        class="container-game__trainings-audiocall__answer container-game__trainings-audiocall__answer__m-answer-true">
                        стремление
                        <span class="container-game__trainings-audiocall__number">3</span>
                    </div>
                    <div class="container-game__trainings-audiocall__answer">рассуждение
                        <span class="container-game__trainings-audiocall__number">4</span>
                    </div>
                    <a class="container-game__trainings-audiocall__answer-btn no-answer-btn">
                        <span>Не знаю :(</span>
                    </a>
                </div>
                <div class="container-game__kit-layer">
                    <div class="container-game__crossword-modal">
                        <div class="container-game__modal" id="modal-layout" style="display: none;">
                            <div class="container-game__modal__header"></div>
                            <div class="container-game__modal__body">
                                <div class="container-game__modal__close-body" id="modal-close"></div>
                                <div class="container-game__crossword-modal__cont">
                                    <div class="container-game__crossword-modal__title">
                                        <span>Тренировка не закончена!</span>
                                    </div>
                                    <div class="container-game__crossword-modal__text">
                                        <span>Если вы вернетесь к списку, ваши
                                            результаты не будут сохранены</span>
                                    </div>
                                    <div class="container-game__crossword-modal__btn-close">
                                        <span>Закрыть</span>
                                    </div>
                                    <div class="container-game__crossword-modal__cancel">
                                        <span>Отмена</span>
                                    </div>
                                </div>
                            </div>
                            <div class="container-game__modal__footer">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        // this.model = new AudiocallModel();
    }
    
    render() {
        document.querySelector('.main').innerHTML = this.template;
    }

    // addListeners() {
    //     this.closeBtn = document.querySelector('.container-game__trainings-audiocall__close');
    //     this.cancelBtn = document.querySelector('.container-game__crossword-modal__cancel');
    //     this.backToMianBtn = document.querySelector('.container-game__crossword-modal__btn-close');
    //     this.startBtn = document.querySelector('.container-game__trainings-audiocall__intro-btn');
    //     this.openModal();
    //     this.closeModal();
    //     this.backToMainPage();
    //     this.clickStartGameBtn();
    //   }
    
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
    
    //   clickStartGameBtn() {
    //     this.startBtn.addEventListener('click', () => {
          
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