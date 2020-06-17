import savannahGame from './constSavannah';

class SavannahView {
  constructor() {
    this.savannahGame = savannahGame;

    this.preloader = `
    <div class="preloader__conatiner"> 
        <div class="countdown">3</div>
        <div class="preloader">
          <div class="item-1"></div>
          <div class="item-2"></div>
          <div class="item-3"></div>
          <div class="item-4"></div>
          <div class="item-5"></div>
        </div>
        <div class="preloader__info">
          <img class="keyboard" src="../src/assets/images/keyboard.png">
          <span class="preloader__info_text">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</span>
        </div>
    </div>`;
  }

  displayModal() {
    this.appModal = document.querySelector('.app__modal');
    this.appModal.classList.add('.app__modal_visible');
  }

  hideModal() {
    this.appModal.classList.remove('.app__modal_visible');
  }

  renderGameLayout() {
    return this.savannahGame;
  }

  renderPreloader() {
    return this.preloader;
  }
}

export default SavannahView;
