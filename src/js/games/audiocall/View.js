import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';
import MainView from '../../views/mainView';
// import MainModel from '../../../assets/audio/';

class AudiocallView {
    constructor() {
      this.template = audiocallGame;
      this.model = new AudiocallModel();
      this.mainView = new MainView();
    }

    getViewUser(user, mainView) {
      this.currentUser = user;
      this.mainView = mainView;
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
      this.imageWord = document.querySelector('.container-game__trainings-audiocall__answers__header__image');
      this.choosenAnswer = document.querySelector('#choosen-answer');
      this.headerWord = document.querySelector('.container-game__trainings-audiocall__answers__header__word');
      
      this.clickStartGameBtn();
      this.openModal();
      this.closeModal();
      this.backToMainPage();
      this.getLevels();
      this.getRounds();
      this.playAudio();
      this.checkAnswer();
    }
        clickStartGameBtn() {
            this.startBtn.addEventListener('click', () => {
              this.chosenLevel = this.level;
              this.chosenRound = this.round;
              this.introPage.classList.add('hide');
              this.levelsContainer.classList.add('hide');
              this.roundContainer.classList.add('hide');
              this.loader.classList.add('show');
              this.initWords();
              
                setTimeout(() => {
                  this.loader.classList.remove('show');
                  this.gamePage.classList.add('show');
                  this.sound(this.audioArr[0]);
                  this.animationSpeaker();
                },7000);
            });
        }

        initWords() {
          this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
                .then((data) => {
                  console.log(data);
                  this.model.getMediaData(data);
                  this.wordsArr = this.model.wordsArr;
                  this.images = this.model.images;
                  this.audioArr = this.model.audioArr;
                  this.translate = this.model.translate;
                  this.lengthWordsArr = this.wordsArr.length;
                  this.model.getWordsForAnswers(this.translate[0])
                    .then((dataWords) => {
                      this.WrongWordsArray = [dataWords[0].word, dataWords[1].word, dataWords[4].word];
                      console.log(this.WrongWordsArray);
                      this.model.indexPositionAnswerEl();
                      console.log(this.model.indexPositionAnswer);
                      document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).childNodes[0].textContent = this.translate[0];
                      document.querySelector(`#answer-${this.model.indexPositionAnswer[1]}`).childNodes[0].textContent = this.WrongWordsArray[0];
                      document.querySelector(`#answer-${this.model.indexPositionAnswer[2]}`).childNodes[0].textContent = this.WrongWordsArray[1];
                      document.querySelector(`#answer-${this.model.indexPositionAnswer[3]}`).childNodes[0].textContent = this.WrongWordsArray[2];
                    });
                });
        }

        checkAnswer() {
          this.choosenAnswer.addEventListener('click', (event) => {
            if(event.target.id === `answer-${this.model.indexPositionAnswer[0]}`) {
              // this.sound('../../../assets/audio/correct.mp3');
              event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-true');
              this.showImageWord(this.images[0], this.wordsArr[0]);
              
              
            } else {
              // this.sound('../../../assets/audio/error.mp3');
              event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-false');
              document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).classList.add('container-game__trainings-audiocall__answer__m-answer-true');
              this.showImageWord(this.images[0], this.wordsArr[0]);
            }
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
          // this.mainView.renderMain(this.currentUser);
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

      showImageWord(src, words) {
        this.imageWord.setAttribute("src", src);
        this.imageWord.setAttribute("alt", words);
        this.imageWord.classList.add('show');
        this.headerWord.innerHTML = `<span>${words}</span>`;
      }

      playAudio() {
        this.playAudioBtn.addEventListener('click', () => {
          this.animationSpeaker();
          this.sound(this.audioArr[0]);
        });
      }

      animationSpeaker() {
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.53)';
          document.querySelector('.big-circle').style.transform = 'scale(0.81)';
        }, 200);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.61)';
          document.querySelector('.big-circle').style.transform = 'scale(0.9)';
        }, 500);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.51)';
            document.querySelector('.big-circle').style.transform = 'scale(0.82)';
      }, 1000);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.61)';
          document.querySelector('.big-circle').style.transform = 'scale(0.9)';
        }, 1200);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.67)';
          document.querySelector('.big-circle').style.transform = 'scale(0.98)';
        }, 1500);
        setTimeout(() => {
          document.querySelector('.small-circle').style.transform = 'scale(0.7)';
          document.querySelector('.big-circle').style.transform = 'scale(0.7)';
        }, 1800);
      }

      sound(src) {
        this.audio = new Audio(); 
        this.audio.crossOrigin = "anonymous"
        this.audio.src = src; 
        this.audio.autoplay = true;
      }
  }
  
  export default AudiocallView;