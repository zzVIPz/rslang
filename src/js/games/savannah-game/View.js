import {
  savannahGame, preloader, lives, sparkles,
} from './constSavannah';
import getDifficultyLevelId from './savannah-utils/getDifficultyLevelID';
import SavannahModel from './Model';

class SavannahView {
  constructor() {
    this.savannahGame = savannahGame;
    this.preloader = preloader;
    this.livesBox = document.createElement('div');
    this.musicBox = document.createElement('div');
    this.flyingWordBox = document.createElement('div');
    this.translationBox = document.createElement('div');
    this.cristalBox = document.createElement('div');
    this.sparklesBox = document.createElement('div');
    this.muteLine = document.createElement('div');
    this.model = new SavannahModel();
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
      spanArr.push(`<span id="tranlastion-${index + 1}">${index + 1} ${item}</span>`);
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
    this.appContent.appendChild(this.sparklesBox);
  }

  renderMuteMusicNote() {
    this.musicIcon = document.querySelector('.music__icon');
    this.musicIcon.addEventListener('click', () => {
      this.muteLine.classList.toggle('visible');
    });
  }

  // Working with Data
  getLevelsId() {
    this.stars = document.querySelector('.rating');
    this.stars.addEventListener('click', ({ target }) => {
      if (target.classList.contains('rating__input')) {
        this.level = getDifficultyLevelId(target);
      }
    });
  }
}

export default SavannahView;
