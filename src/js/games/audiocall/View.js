import AudiocallModel from './Model';
import audiocallGame from './constAudiocall';
import MainView from '../../views/mainView';
import getMediaUrl from '../../utils/getMediaUrl';

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
    this.mainContainer = document.querySelector('.main');
    this.levelsContainer = document.querySelector('.container-game__levels-container');
    this.roundContainer = document.querySelector('.container-game__round-container');
    this.levelButtons = document.querySelector('.rating');
    this.roundButtons = document.querySelector('.rating-round');
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
      this.sound('https://raw.githubusercontent.com/staceysych/rslang-data/master/round-starts.mp3');
      this.loader.classList.add('show');
      this.initWords();

      setTimeout(() => {
        this.loader.classList.remove('show');
        this.gamePage.classList.add('show');
        this.sound(getMediaUrl(this.wordsArray[0].audio));
        this.animationSpeaker();
      }, 5500);
    });
  }

  initWords() {
    this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
      .then((data) => {
        console.log(data);
        this.model.shuffle(data);
        this.wordsArray = data;
        this.addWordsEl(this.wordsArray);
      });
  }

  addWordsEl(wordsArray) {
    if (wordsArray.length >= 1) {
      this.model.getWordsForAnswers(wordsArray[0].wordTranslate)
        .then((dataWords) => {
          this.WrongWordsArray = [dataWords[0].word, dataWords[1].word, dataWords[4].word];
          console.log(this.WrongWordsArray);
          this.model.indexPositionAnswerEl();
          console.log(this.model.indexPositionAnswer);
          this.imageWord.setAttribute('src', getMediaUrl(this.wordsArray[0].image));
          this.imageWord.setAttribute('alt', wordsArray[0].word);
          document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).childNodes[0].textContent = wordsArray[0].wordTranslate;
          document.querySelector(`#answer-${this.model.indexPositionAnswer[1]}`).childNodes[0].textContent = this.WrongWordsArray[0];
          document.querySelector(`#answer-${this.model.indexPositionAnswer[2]}`).childNodes[0].textContent = this.WrongWordsArray[1];
          document.querySelector(`#answer-${this.model.indexPositionAnswer[3]}`).childNodes[0].textContent = this.WrongWordsArray[2];
        });
    } else {
      console.log('Wordsright', this.model.rightAnswer);
      console.log('Words wrong', this.model.wrongAnswer);
    }
  }

  checkAnswer() {
    this.choosenAnswer.addEventListener('click', (event) => {
      if (event.target.classList.contains('container-game__trainings-audiocall__answer')) {
        if (event.target.id === `answer-${this.model.indexPositionAnswer[0]}`) {
          this.sound('https://raw.githubusercontent.com/staceysych/rslang-data/master/correct.mp3');
          event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-true');
          this.model.rightAnswer.push(this.wordsArray[0]);
          this.setAnswer();
          console.log(this.wordsArray);
        } else {
          this.sound('https://raw.githubusercontent.com/staceysych/rslang-data/master/error.mp3');
          event.target.classList.add('container-game__trainings-audiocall__answer__m-answer-false');
          this.wrong();
          console.log(this.wordsArray);
        }
      }
    });

    this.answerBtn.addEventListener('click', () => {
      if (this.answerBtn.innerText === 'Далее') {
        this.gamePage.classList.add('animation');
        setTimeout(() => {
          this.gamePage.classList.remove('animation');
          this.imageWord.classList.remove('show');
          this.imageWord.classList.remove('visuallyshow');
          this.headerWord.innerText = '';
          this.answerBtn.innerText = 'Не знаю :(';
          this.sound(getMediaUrl(this.wordsArray[0].audio));
        }, 1000);
        this.wordsArray.shift();
        document.querySelectorAll('#choosen-answer .container-game__trainings-audiocall__answer__m-answer-false').forEach((el) => el.classList.remove('container-game__trainings-audiocall__answer__m-answer-false'));
        document.querySelector(`#answer-${this.model.indexPositionAnswer[0]}`).classList.remove('container-game__trainings-audiocall__answer__m-answer-true');
        this.addWordsEl(this.wordsArray);
        console.log(this.wordsArray);
      } else {
        this.sound('https://raw.githubusercontent.com/staceysych/rslang-data/master/error.mp3');
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
    this.answerBtn.innerText = 'Далее';
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
      this.setDefaultHash();
      this.mainView.renderMain(this.currentUser);
    });
  }

  getLevels() {
    this.levelButtons.addEventListener('click', (event) => {
      event.preventDefault();

      this.level = event.target.dataset.level;
      console.log(this.level);
    });
  }

  getRounds() {
    this.roundButtons.addEventListener('click', (event) => {
      event.preventDefault();

      this.round = event.target.dataset.round;
      console.log(this.round);
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
      this.sound(getMediaUrl(this.wordsArray[0].audio));
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
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = src;
    this.audio.autoplay = true;
  }
}

export default AudiocallView;
