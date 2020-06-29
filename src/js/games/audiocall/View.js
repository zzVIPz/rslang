import AudiocallModel from './Model';
import {
  audiocallGame, soundURL, DELAY_BEFORE_GAME_START, 
  NEXT, I_DO_NOT_KNOW, FAIL, WIN, REMOVE_ANIMATION_SPEAKER, 
  EMPTY_ARRAY
} from './constAudiocall';
import MainView from '../../views/mainView';
import getMediaUrl from '../../utils/getMediaUrl';
import sound from './audiocall-utils/sound';

class AudiocallView {
    constructor(defaultHash) {
      this.setDefaultHash = defaultHash;
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
      this.answerBtn = document.querySelector('.container-game__trainings-audiocall__answer-btn');
      this.finalWindow = document.querySelector('.container-game__final');
      this.finalTitle = document.querySelector('.container-game__final__title');
      this.answersInvalid = document.querySelector('.container-game__final__slider-answers__invalid');
      this.answersValid = document.querySelector('.container-game__final__slider-answers__valid');
      this.invalidTitle = document.querySelector('.container-game__final__slider-answers__invalid__title');
      this.validTitle = document.querySelector('.container-game__final__slider-answers__valid__title');
      this.finalContinueBtn = document.querySelector('.container-game__final__continue');
      this.finalBackBtn = document.querySelector('.container-game__final__back');
      
      this.clickStartGameBtn();
      this.openModal();
      this.closeModal();
      this.backToMainPage();
      this.getLevels();
      this.getRounds();
      this.playAudio();
      this.checkAnswer();
      this.continueGame();
    }
    clickStartGameBtn() {
      this.startBtn.addEventListener('click', () => {
        this.chosenLevel = this.level;
        this.chosenRound = this.round;
        this.introPage.classList.add('hide');
        this.levelsContainer.classList.add('hide');
        this.roundContainer.classList.add('hide');
        sound(soundURL,'round-starts.mp3');
        this.loader.classList.add('show');
        this.initWords();
        
        setTimeout(() => {
          this.loader.classList.remove('show');
          this.gamePage.classList.add('show');
          sound(getMediaUrl(this.wordsArray[0].audio));
          this.animationSpeaker();
        }, DELAY_BEFORE_GAME_START);
      });
    }

    initWords() {
      this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
        .then((data) => {
          this.model.shuffleArray(data);
          this.wordsArray = data;
          this.addWordsEl(this.wordsArray);
        });
    }

    addWordsEl(wordsArray) {
      if(wordsArray.length) {
        this.model.getWordsForAnswers(wordsArray[0].wordTranslate)
          .then((dataWords) => {
            if(dataWords.length !== 0) {
              this.WrongWordsArray = [dataWords[0].word, dataWords[1].word, dataWords[4].word];
            } else {
              this.WrongWordsArray = EMPTY_ARRAY;
            }
            this.model.indexPositionAnswerEl();
            this.imageWord.setAttribute("src", getMediaUrl(this.wordsArray[0].image));
            this.imageWord.setAttribute("alt", wordsArray[0].word);
            document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).childNodes[0].textContent = wordsArray[0].wordTranslate; 
            document.querySelector(`#answer-${this.model.indexPositionAnswer[1]}`).childNodes[0].textContent = this.WrongWordsArray[0];
            document.querySelector(`#answer-${this.model.indexPositionAnswer[2]}`).childNodes[0].textContent = this.WrongWordsArray[1];
            document.querySelector(`#answer-${this.model.indexPositionAnswer[3]}`).childNodes[0].textContent = this.WrongWordsArray[2];
          });
      } else {
          this.gamePage.classList.remove('show');
          this.closeBtnGame.classList.add('hide');

          if(this.model.wrongAnswer.length === 0) {
            this.winRound();
          } else {
            this.loseRound();
          }

          this.createEl(this.model.rightAnswer, this.answersValid);
          this.createEl(this.model.wrongAnswer, this.answersInvalid);
          this.invalidTitle.insertAdjacentHTML('beforeend',this.model.wrongAnswer.length);
          this.validTitle.insertAdjacentHTML('beforeend',this.model.rightAnswer.length);

          this.finalWindow.classList.add('show-flex');
        }
    }

    checkAnswer() {
      this.choosenAnswer.addEventListener('click', (event) => {
        if(event.target.classList.contains('container-game__trainings-audiocall__answer')) {
          if(event.target.id === `answer-${this.model.indexPositionAnswer[0]}`) {
            sound(soundURL, 'correct.mp3');
            event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-true');
            this.model.rightAnswer.push(this.wordsArray[0]);
            this.setAnswer();
          } else {
              sound('error.mp3');
              event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-false');
              this.wrong();
            }
        }
      });
      
      this.answerBtn.addEventListener('click', () => {
        if(this.answerBtn.innerText === NEXT) {
          this.gamePage.classList.add('animation');
          setTimeout(() => {
            this.gamePage.classList.remove('animation');
            this.imageWord.classList.remove('show');
            this.imageWord.classList.remove('visuallyshow');
            this.headerWord.innerText = '';
            this.answerBtn.innerText = I_DO_NOT_KNOW;
            try {
              sound(getMediaUrl(this.wordsArray[0].audio));
            } catch(e) {
              console.log(e.stack);
            }
            
          }, 1000);
          this.wordsArray.shift();
          document.querySelectorAll('#choosen-answer .container-game__trainings-audiocall__answer__m-answer-false').forEach(el => el.classList.remove('container-game__trainings-audiocall__answer__m-answer-false'));
          document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).classList.remove('container-game__trainings-audiocall__answer__m-answer-true');
          this.addWordsEl(this.wordsArray);
        } else {
            sound(soundURL, 'error.mp3');
            this.wrong();
          }
      });
    }

    wrong() {
      document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).classList.add('container-game__trainings-audiocall__answer__m-answer-true');
      this.model.wrongAnswer.push(this.wordsArray[0]);
      this.setAnswer();
    }
    
    setAnswer() {
      this.showImageWord(this.wordsArray[0].word);
      this.answerBtn.innerText = NEXT;
    }

    openModal() {
      this.closeBtnGame.addEventListener('click', () => {
        this.modalWindow.classList.add('show-flex');
      });
    }

    createEl(array, div) {
      for(let i = 0; i < array.length; i++) {
        this.finalGame = `<div class="container-game__final__slider-answers__answer">
                        <span class="container-game__final__sound">
                          <audio preload="metadata">
                            <source src='${getMediaUrl(array[i].audio)}' type= 'audio/mp3'>
                          </audio>
                        </span>
                        <div class="container-game__final__slider-answers__answer-eng">${array[i].word}</div>
                        <span class="container-game__final__tr">— </span>
                        <div class="container-game__final__slider-answers__answer-ru">${array[i].wordTranslate}</div>
                    </div>`;
        div.insertAdjacentHTML('beforeend', this.finalGame);
      }

      for (let item of document.querySelectorAll('.container-game__final__sound')) {
        item.addEventListener('click', (event) => {
          event.preventDefault();

          event.target.querySelector('audio').play();
        });
      }
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
        this.setDefaultHash;
        this.mainView.renderMain(this.currentUser);
      });

      this.finalBackBtn.addEventListener('click', () => {
        this.setDefaultHash;
        this.mainView.renderMain(this.currentUser);
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

    continueGame() {
      this.finalContinueBtn.addEventListener('click', () => {
        this.render();
      });
    }

    showImageWord(words) {
      this.imageWord.classList.add('show');
      setTimeout(() => {
        this.imageWord.classList.add('visuallyshow');
      }, 100);
      this.headerWord.innerHTML = `<span>${words}</span>`;
    }

    playAudio() {
      this.playAudioBtn.addEventListener('click', () => {
        this.animationSpeaker();
        sound(getMediaUrl(this.wordsArray[0].audio));
      });
    }

    animationSpeaker() {
      document.querySelector('.small-circle').classList.add('animation-small');
      document.querySelector('.big-circle').classList.add('animation-big');
      setTimeout(() => {
        document.querySelector('.small-circle').classList.remove('animation-small');
        document.querySelector('.big-circle').classList.remove('animation-big');
      }, REMOVE_ANIMATION_SPEAKER);
    }

    loseRound() {
      this.finalTitle.textContent = FAIL;
    }
  
    winRound() {
      this.finalTitle.textContent = WIN;
    }

}
  
export default AudiocallView;