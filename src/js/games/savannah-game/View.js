import {
  savannahGame, preloader, lives, translations, sparkles,
} from './constSavannah';

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

  renderCountDownFinished(mainWord) {
    this.appContent = document.querySelector('.app__content');
    this.appContent.innerHTML = '';
    this.renderHeader();
    this.renderFlyingWord(mainWord);
    this.moveWord();
    this.renderTranslation();
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

  renderTranslation() {
    this.translationBox.className = 'app__content__translation-box';
    this.translationBox.innerHTML = translations;
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
}

export default SavannahView;
