import {
  savannahGame, preloader, lives, sparkles, groupRound,
} from '../constSavannah';
import getDifficultyLevelRoundId from '../savannah-utils/getDifficultyLevelID';
import GroupRoundView from './groupRoundView';
import randomIntegerForPages from '../savannah-utils/randomInteger';

class SavannahView {
  constructor(model) {
    this.savannahGame = savannahGame;
    this.preloader = preloader;
    this.groupRoundHtml = groupRound;
    this.livesBox = document.createElement('div');
    this.musicBox = document.createElement('div');
    this.flyingWordBox = document.createElement('div');
    this.translationBox = document.createElement('div');
    this.cristalBox = document.createElement('div');
    this.sparklesBox = document.createElement('div');
    this.muteLine = document.createElement('div');
    this.model = model;
    this.backgroundPositionY = 100;
    this.cristalWidth = 30;
    this.removeDigits = /\d/g;
  }

  displayModal() {
    this.appModal = document.querySelector('.app__modal');
    this.appModal.classList.add('app__modal_visible');
  }

  hideModal() {
    this.appModal.classList.remove('app__modal_visible');
  }

  renderGameLayout() {
    return this.savannahGame;
  }

  renderPreloader() {
    return this.preloader;
  }

  countTillOne(arr, translationArr) {
    this.preloaderNumber = Number(document.querySelector('.countdown').innerHTML);

    if (this.preloaderNumber > 0) {
      this.preloaderNumber -= 1;
    }

    if (this.preloaderNumber < 1) {
      this.randomWord = this.model.generateRandomWord(arr);
      this.renderCountDownFinished(this.randomWord, translationArr);
      console.log('Words Array:', arr);
      console.log('Random word:', this.randomWord);
    }

    return this.preloaderNumber;
  }

  renderCountDownFinished(mainWord, arr) {
    this.appContent = document.querySelector('.app__content');
    this.appContent.innerHTML = '';
    this.renderHeader();
    this.renderFlyingWord(mainWord);
    this.moveWord();
    this.renderTranslation(arr);
    this.rendercristal();
    this.renderSparkles();
    this.renderMuteMusicNote();
  }

  renderRating() {
    this.appContainer = document.querySelector('.app');
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.groupRoundView.init();
  }

  renderHeader() {
    this.appHeader = document.querySelector('.app__header');
    this.livesBox.className = 'lives';
    this.livesBox.innerHTML = lives;
    this.musicBox.className = 'music';
    this.musicBox.innerHTML = `
    <img class="music__icon" src="../src/assets/images/musical-note.png">`;
    this.muteLine.className = 'music__line';
    this.appHeader.appendChild(this.livesBox);
    this.appHeader.appendChild(this.musicBox);
    this.musicBox.appendChild(this.muteLine);

    return this.appHeader;
  }

  renderFlyingWord(mainWord) {
    this.flyingWordBox.className = 'flying-word';
    this.flyingWordBox.innerHTML = `
    <span id="main-word">${mainWord}</span>`;
    this.appContent.appendChild(this.flyingWordBox);
  }

  moveWord() {
    this.elem = document.querySelector('.flying-word');
    this.elem.classList.remove('flying-word_hide');
    this.pos = -100;
    this.id = setInterval(this.frame.bind(this), 20);
  }

  frame() {
    if (this.pos === 200) {
      clearInterval(this.id);
      this.elem.classList.add('flying-word_hide');
    } else {
      this.pos += 1;
      this.elem.style.top = `${this.pos}px`;
    }
  }

  renderTranslation(arr) {
    const fourAnswersWordsArr = this.model.generateTranslation(arr);
    this.translationBox.className = 'app__content__translation-box';
    const spanArr = [];

    fourAnswersWordsArr.forEach((item, index) => {
      spanArr.push(`<span class="translation-${index + 1}"><span class="keyboard-num">${index + 1}</span>${item}</span>`);
    });
    this.translationBox.innerHTML = spanArr.join('');
    this.appContent.appendChild(this.translationBox);
  }

  rendercristal() {
    this.appFooter = document.querySelector('.app__footer');
    this.cristalBox.className = 'cristal';
    this.cristalBox.innerHTML = `
    <img class="cristal__img" src="../src/assets/images/cristal.png">`;
    this.appContent.appendChild(this.cristalBox);
  }

  renderSparkles() {
    this.sparklesBox.className = 'sparkle-container';
    this.sparklesBox.innerHTML = sparkles;
    this.cristalBox.appendChild(this.sparklesBox);
  }

  renderMuteMusicNote() {
    this.musicIcon = document.querySelector('.music__icon');
    this.musicIcon.addEventListener('click', () => {
      this.muteLine.classList.toggle('visible');
    });
  }

  getLevelsId() {
    const stars = document.querySelector('.rating__group');
    stars.addEventListener('click', ({ target }) => {
      if (target.classList.contains('group')) {
        this.level = getDifficultyLevelRoundId(target);
      }
    });
  }

  getRound() {
    const starsRound = document.querySelector('.rating__round');
    starsRound.addEventListener('click', ({ target }) => {
      if (target.classList.contains('round')) {
        this.round = getDifficultyLevelRoundId(target);
        this.round = this.round * 5 + randomIntegerForPages();
      }
    });
  }

  moveBackground() {
    this.backgroundPositionY -= 5;
    document.body.style.backgroundPositionY = `${this.backgroundPositionY}%`;
  }

  resizeCristal() {
    this.cristalWidth += 1;
    this.cristalBox.style.width = `${this.cristalWidth}px`;
  }

  highlightAnswer(element, isRight) {
    if (isRight) {
      element.classList.add('correct-answer');
    } else {
      element.classList.add('wrong-answer');
    }

    return this;
  }

  removeHighlight(element, isRight) {
    if (isRight) {
      element.classList.remove('correct-answer');
    } else {
      element.classList.remove('wrong-answer');
    }

    return this;
  }

  getClickedWord(key) {
    this.keyCode = +key;
    if (this.keyCode >= 1 && this.keyCode <= 4) {
      return document.querySelector(`.translation-${this.keyCode}`);
    }

    return false;
  }

  removeLives(wrongAnswer) {
    if (wrongAnswer <= 5) {
      document.getElementById(`life-${wrongAnswer}`).classList.add('hidden');
    }

    return this;
  }
}

export default SavannahView;
