
import AudiocallController from './Controller';
import {
  audiocallGame, DELAY_BEFORE_GAME_START,
  NEXT, I_DO_NOT_KNOW, FAIL, WIN, REMOVE_ANIMATION_SPEAKER,
  EMPTY_ARRAY, DELAY_BEFORE_SHOW_WORDS,
  DELAY_BEFORE_SHOW_IMAGE_WORD, DELAY,
} from './constAudiocall';
import { HASH_VALUES } from '../../constants/constMainView';
import {
  SOUND_URL, CORRECT_SOUND, ERROR_SOUND,
  ROUND_STARTS_SOUND,
} from '../savannah-game/constSavannah';
import MainView from '../../views/mainView';
import getMediaUrl from '../../utils/getMediaUrl';
import playAudio from '../utils/playAudio';
import shuffle from '../utils/shaffle';

class AudiocallView {
  constructor(model, defaultHash, currentHash) {
    this.setDefaultHash = defaultHash;
    this.getCurrentHash = currentHash;
    this.template = audiocallGame;
    this.model = model;
    this.mainView = new MainView();
    this.correctSound = (SOUND_URL + CORRECT_SOUND);
    this.errorSound = (SOUND_URL + ERROR_SOUND);
    this.roundStartsSound = (SOUND_URL + ROUND_STARTS_SOUND);
    this.isGameOn = true;
    this.isPreloading = true;
    this.mainContainer = document.querySelector('.main');
  }

  checkAudiocallWindow() {
    if (!(this.getCurrentHash() === HASH_VALUES.audiocall)) {
      this.finishGame();
      this.audiocallContainer = document.querySelector('.container-game');

      if (this.audiocallContainer) {
        this.mainContainer.removeChild(this.audiocallContainer);
      }
    } else {
      setTimeout(() => { this.checkAudiocallWindow(); }, DELAY / 2);
    }
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
    this.roundContainer = document.querySelector('.select');
    this.levelButtons = document.querySelector('.rating');
    this.roundButtons = document.querySelector('.select__content');
    this.introPage = document.querySelector('.container-game__trainings-audiocall__intro');
    this.loader = document.querySelector('.container-game__preload');
    this.startBtn = document.querySelector('.container-game__trainings-audiocall__intro-btn');
    this.gamePage = document.querySelector('.container-game__trainings-audiocall__answers');
    this.responseBlock = document.querySelectorAll('.container-game__trainings-audiocall__answer');
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
    this.playAudioWord();
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
      playAudio(this.roundStartsSound);
      this.loader.classList.add('show');
      this.initWords();
      setTimeout(() => {
        if (this.isGameOn) {
          this.loader.classList.remove('show');
          this.gamePage.classList.add('show');
          playAudio(getMediaUrl(this.wordsArray[0].audio));
          this.animationSpeaker();
          this.removePointerEvents();
        }
      }, DELAY_BEFORE_GAME_START);
    });
  }

  initWords() {
    this.model.fetchWords(this.currentUser, this.chosenLevel, this.chosenRound)
      .then((data) => {
        shuffle(data);
        this.wordsArray = data;
        this.addWordsEl(this.wordsArray);
      });
  }

  addWordsEl = async (wordsArray) => {
    if (wordsArray.length && this.isGameOn) {
      const dataWords = await this.model.getWordsForAnswers(wordsArray[0].wordTranslate);
      if (dataWords.length !== 0) {
        this.WrongWordsArray = [dataWords[0].word, dataWords[1].word, dataWords[4].word];
      } else {
        this.WrongWordsArray = EMPTY_ARRAY;
      }

      shuffle(this.model.positionAnswerArray);
      this.imageWord.setAttribute('src', getMediaUrl(this.wordsArray[0].image));
      this.imageWord.setAttribute('alt', wordsArray[0].word);
      document.querySelector(`#answer-${this.model.positionAnswerArray[0]}`).childNodes[0].textContent = wordsArray[0].wordTranslate;
      document.querySelector(`#answer-${this.model.positionAnswerArray[1]}`).childNodes[0].textContent = this.WrongWordsArray[0];
      document.querySelector(`#answer-${this.model.positionAnswerArray[2]}`).childNodes[0].textContent = this.WrongWordsArray[1];
      document.querySelector(`#answer-${this.model.positionAnswerArray[3]}`).childNodes[0].textContent = this.WrongWordsArray[2];
    } else {
      this.gamePage.classList.remove('show');
      this.closeBtnGame.classList.add('hide');

      if (!this.model.wrongAnswer.length) {
        this.winRound();
      } else {
        this.loseRound();
      }

      this.createEl(this.model.rightAnswer, this.answersValid);
      this.createEl(this.model.wrongAnswer, this.answersInvalid);
      this.invalidTitle.insertAdjacentHTML('beforeend', this.model.wrongAnswer.length);
      this.validTitle.insertAdjacentHTML('beforeend', this.model.rightAnswer.length);

      this.finalWindow.classList.add('show-flex');
    }
  }

  addPointerEvents() {
    this.responseBlock.forEach((el) => {
      el.classList.add('unclickable');
    });
  }

  removePointerEvents() {
    this.responseBlock.forEach((el) => {
      el.classList.remove('unclickable');
    });
  }

  onCorrectAnswer(id) {
    playAudio(this.correctSound);
    document.querySelector(`#answer-${id}`).classList.add('audiocall__answer--correct');
    this.model.rightAnswer.push(this.wordsArray[0]);
    this.setAnswer();
  }

  onIncorrectAnswer(id) {
    playAudio(this.errorSound);
    document.querySelector(`#answer-${id}`).classList.add('audiocall__answer--incorrect');
    this.wrong();
  }

    checkAnswer = () => {
      document.querySelector('body').addEventListener('keydown', (event) => {
        if (event.keyCode === 49 || event.keyCode === 50
           || event.keyCode === 51 || event.keyCode === 52
           || event.keyCode === 13) {
          if (this.getCurrentHash() === HASH_VALUES.audiocall) {
            const answer = document.querySelector('#answer-1');

            if (!(answer.classList.contains('unclickable'))) {
              if (event.keyCode !== 13 && this.answerBtn.innerText !== NEXT) {
                this.addPointerEvents();
              }
              if (event.keyCode === 49) {
                if (document.querySelector('#answer-1').id === `answer-${this.model.positionAnswerArray[0]}`) {
                  this.onCorrectAnswer(1);
                } else {
                  this.onIncorrectAnswer(1);
                }
              } else if (event.keyCode === 50) {
                if (document.querySelector('#answer-2').id === `answer-${this.model.positionAnswerArray[0]}`) {
                  this.onCorrectAnswer(2);
                } else {
                  this.onIncorrectAnswer(2);
                }
              } else if (event.keyCode === 51) {
                if (document.querySelector('#answer-3').id === `answer-${this.model.positionAnswerArray[0]}`) {
                  this.onCorrectAnswer(3);
                } else {
                  this.onIncorrectAnswer(3);
                }
              } else if (event.keyCode === 52) {
                if (document.querySelector('#answer-4').id === `answer-${this.model.positionAnswerArray[0]}`) {
                  this.onCorrectAnswer(4);
                } else {
                  this.onIncorrectAnswer(4);
                }
              } else if (event.keyCode === 13) {
                if (this.answerBtn.innerText === NEXT) {
                  this.nextWord();
                }
              }
            } else if (event.keyCode === 13) {
              if (this.answerBtn.innerText === NEXT) {
                this.nextWord();
              } else {
                this.removePointerEvents();
              }
            }
          }
        }
      });

      this.choosenAnswer.addEventListener('click', ({ target }) => {
        this.addPointerEvents();
        if (target.classList.contains('container-game__trainings-audiocall__answer')) {
          if (target.id === `answer-${this.model.positionAnswerArray[0]}`) {
            playAudio(this.correctSound);
            target.classList.add('audiocall__answer--correct');
            this.model.rightAnswer.push(this.wordsArray[0]);
            this.setAnswer();
          } else {
            playAudio(this.errorSound);
            target.classList.add('audiocall__answer--incorrect');
            this.wrong();
          }
        }
      });

      this.answerBtn.addEventListener('click', () => {
        if (this.answerBtn.innerText === NEXT) {
          this.nextWord();
        } else {
          this.addPointerEvents();
          playAudio(this.errorSound);
          this.wrong();
        }
      });
    }

    nextWord() {
      this.gamePage.classList.add('animation');
      this.answerBtn.innerText = I_DO_NOT_KNOW;
      this.imageWord.classList.remove('visuallyshow');
      setTimeout(() => {
        if (this.isGameOn) {
          this.gamePage.classList.remove('animation');
          this.headerWord.innerText = '';
          this.removePointerEvents();
          if (this.wordsArray.length !== 0) {
            playAudio(getMediaUrl(this.wordsArray[0].audio));
            this.animationSpeaker();
          }
        }
      }, DELAY_BEFORE_SHOW_WORDS);
      this.wordsArray.shift();
      document.querySelectorAll('#choosen-answer .audiocall__answer--incorrect').forEach((el) => el.classList.remove('audiocall__answer--incorrect'));
      document.querySelector(`#answer-${this.model.positionAnswerArray[0]}`).classList.remove('audiocall__answer--correct');
      this.addWordsEl(this.wordsArray);
    }

    wrong() {
      document.querySelector(`#answer-${this.model.positionAnswerArray[0]}`).classList.add('audiocall__answer--correct');
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

    finishGame() {
      this.isGameOn = false;
      this.isPreloading = false;
      this.removePointerEvents();
    }

    createEl = (array, div) => {
      for (let i = 0; i < array.length; i += 1) {
        const finalGame = `<div class="container-game__final__slider-answers__answer">
                        <span class="container-game__final__sound">
                          <audio preload="metadata">
                            <source src='${getMediaUrl(array[i].audio)}' type= 'audio/mp3'>
                          </audio>
                        </span>
                        <div class="container-game__final__slider-answers__answer-eng">${array[i].word}</div>
                        <span class="container-game__final__tr">— </span>
                        <div class="container-game__final__slider-answers__answer-ru">${array[i].wordTranslate}</div>
                    </div>`;
        div.insertAdjacentHTML('beforeend', finalGame);
      }

      document.querySelectorAll('.container-game__final__sound').forEach((item) => {
        item.addEventListener('click', ({ target }) => {
          target.querySelector('audio').play();
        });
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
        this.finishGame();
        this.mainView.renderMain(this.currentUser);
      });

      this.finalBackBtn.addEventListener('click', () => {
        this.setDefaultHash();
        this.finishGame();
        this.mainView.renderMain(this.currentUser);
      });
    }

    getLevels() {
      if (this.getCurrentHash() === HASH_VALUES.audiocall) {
      this.levelButtons.addEventListener('click', ({ target }) => {
        this.level = target.dataset.level;
        console.log(this.level);
      });
      }
    }

    getRounds() {
      if (this.getCurrentHash() === HASH_VALUES.audiocall) {
      this.roundButtons.addEventListener('click', ({ target }) => {
        this.round = target.dataset.round;
        console.log(this.round);
      });
      }
    }

    continueGame() {
      this.finalContinueBtn.addEventListener('click', () => {
        this.audiocall = new AudiocallController(this.user, this.mainView);
          this.audiocall.init(this.setDefaultHash, this.getCurrentHash);
        // this.model.setDefault();
        // this.render();
      });
    }

    showImageWord(words) {
      setTimeout(() => {
        this.imageWord.classList.add('visuallyshow');
      }, DELAY_BEFORE_SHOW_IMAGE_WORD);
      this.headerWord.innerHTML = `<span>${words}</span>`;
    }

    playAudioWord() {
      this.playAudioBtn.addEventListener('click', () => {
        this.animationSpeaker();
        playAudio(getMediaUrl(this.wordsArray[0].audio));
      });
    }

    animationSpeaker = () => {
      if (this.isGameOn) {
        document.querySelector('.small-circle').classList.add('animation-small');
        document.querySelector('.big-circle').classList.add('animation-big');
        setTimeout(() => {
          document.querySelector('.small-circle').classList.remove('animation-small');
          document.querySelector('.big-circle').classList.remove('animation-big');
        }, REMOVE_ANIMATION_SPEAKER);
      }
    }

    loseRound() {
      this.finalTitle.textContent = FAIL;
    }

    winRound() {
      this.finalTitle.textContent = WIN;
    }
}

export default AudiocallView;
