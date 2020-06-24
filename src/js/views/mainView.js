import {
  MENU_ITEMS_NAMES,
  SETTING_MODAL_TEXT,
  MAIN_TEXT,
  SWIPER_TEMPLATE,
} from '../constants/constMainView';
import getMainTemplate from '../utils/getMainTemplate';
import getNavLinkTemplate from '../utils/getNavLinkTemplate';
import getModalSettingsTemplate from '../utils/getModalSettingsTemplate';
import toggleDisplay from '../utils/toggleDisplay';
import Card from '../components/card/cardController';

export default class MainView {
  constructor() {
    this.onLogOut = null;
    this.onBtnStartClick = null;
    this.onButtonAcceptClick = null;
    this.onButtonCancelClick = null;
    this.onBtnSettingsClick = null;
    this.onBurgerMenuClick = null;
    this.onLogOutClick = null;
    this.onOverlayClick = null;
    this.onBtnSpeakerClick = null;
    this.burgerMenu = document.querySelector('.burger-menu');
    this.header = document.querySelector('.header');
    this.headerNavigation = document.querySelector('.header__navigation');
    this.navigation = document.querySelector('.navigation');
    this.userTool = document.querySelector('.user-tool');
    this.speaker = document.querySelector('.user-tool__button-speaker');
    this.settings = document.querySelector('.user-tool__button-settings');
    this.main = document.querySelector('.main');
  }

  init() {
    this.renderMenu();
    this.links = document.querySelectorAll('.navigation__link');
    this.addListeners();
  }

  addListeners() {
    this.addBurgerMenuClickHandler();
    this.addNavigationLinkClickHandler();
    this.addOverlayClickHandler();
    this.addUserToolClickHandler();
    this.addBtnEnterHandler();
  }

  renderMain(user) {
    const formattedTemplate = getMainTemplate(user, MAIN_TEXT);
    this.main.innerHTML = formattedTemplate;
    this.btnStartLearning = document.querySelector('.btn-start');
    this.btnStartLearning.addEventListener('click', () => {
      this.onBtnStartClick(user);
    });
  }

  renderSwiperTemplate() {
    this.main.innerHTML = SWIPER_TEMPLATE;
  }

  setFocusToInput(currentSlide = this.getCurrentSlide()) {
    if (currentSlide) {
      setTimeout(() => {
        this.getCurrentInputNode(currentSlide).focus();
      }, 300);
    }
  }

  getCurrentSlide() {
    let card;
    if (this.swiper) {
      const ind = this.swiper.realIndex;
      card = this.swiper.slides[ind];
    }
    return card;
  }

  getUserAnswer(currentSlide = this.getCurrentSlide()) {
    return currentSlide ? this.getCurrentInputNode(currentSlide).value : null;
  }

  getCurrentInputNode = (currentSlide) => {
    let inputNode;
    const nodes = currentSlide.querySelectorAll('.card__input-container');
    nodes.forEach((node) => {
      if (!node.classList.contains('hidden')) {
        inputNode = node.querySelector('.card__input-text');
      }
    });
    return inputNode;
  };

  renderCards(words, user, swiper) {
    this.swiper = swiper;
    words.forEach((word) => {
      const card = new Card(word, user);
      this.swiper.appendSlide(card.renderTemplate());
    });
  }

  renderMenu() {
    Object.values(MENU_ITEMS_NAMES).forEach((link) => {
      const template = getNavLinkTemplate(link);
      this.navigation.innerHTML += template;
    });
  }

  showSettingsModal(user) {
    this.settings.classList.toggle('user-tool__button-settings--active');
    const formattedTemplate = getModalSettingsTemplate(user, SETTING_MODAL_TEXT);
    const modal = document.createElement('div');
    modal.classList.add('settings__overlay');
    modal.innerHTML = formattedTemplate;
    this.main.append(modal);
  }

  addSettingsModalListeners() {
    const modal = document.querySelector('.settings');
    modal.addEventListener('click', (e) => {
      this.onModalClick(e);
    });

    this.totalCards = document.getElementById('cards-amount');
    this.totalCards.addEventListener('focusout', () => {
      this.onInputComplete();
    });
    this.wordAmount = document.getElementById('word-amount');
    this.wordAmount.addEventListener('focusout', () => {
      this.onInputComplete();
    });
    this.btnAccept = document.querySelector('.btn-accept');
    this.btnAccept.addEventListener('click', () => {
      this.onButtonAcceptClick();
    });
    this.btnCancel = document.querySelector('.btn-cancel');
    this.btnCancel.addEventListener('click', () => {
      this.onButtonCancelClick();
    });
  }

  checkUserSettings() {
    if (this.totalCards.value > 100) {
      this.totalCards.value = 100;
    }
    if (this.totalCards.value < 5) {
      this.totalCards.value = 5;
    }
    if (+this.totalCards.value < this.wordAmount.value) {
      this.wordAmount.value = this.totalCards.value;
    }
    this.wordAmount.setAttribute('max', this.totalCards.value);
    if (this.wordAmount.value < 5) {
      this.wordAmount.value = 5;
    }
  }

  closeSettingsModal() {
    this.settings.classList.toggle('user-tool__button-settings--active');
    this.modal = document.querySelector('.settings__overlay');
    if (this.modal) {
      this.modal.remove();
    }
  }

  addUserToolClickHandler() {
    this.userTool.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains('user-tool__button-log-out')) {
        this.onLogOutClick();
      }
      if (target.classList.contains('user-tool__button-speaker')) {
        this.onBtnSpeakerClick();
      }
      if (target.classList.contains('user-tool__button-settings')) {
        this.onBtnSettingsClick();
      }
    });
  }

  addNavigationLinkClickHandler() {
    this.navigation.addEventListener('click', (e) => {
      this.onNavigationLinkClick(e);
      if (!e.target.classList.contains('navigation')) {
        this.toggleMenuProperty();
      }
    });
  }

  addOverlayClickHandler() {
    this.headerNavigation.addEventListener('click', (event) => {
      if (event.target.classList.contains('header__navigation--active')) {
        this.onOverlayClick();
      }
    });
  }

  addBurgerMenuClickHandler() {
    this.burgerMenu.addEventListener('click', () => {
      this.onBurgerMenuClick();
    });
  }

  addBtnEnterHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.onBtnEnterPress();
      }
    });
  }

  setActiveLink() {
    const hash = document.location.hash.slice(1);
    let checkState = 0;
    this.links.forEach((link) => {
      link.classList.remove('navigation__link--active');
      if (link.dataset.name === hash) {
        link.classList.add('navigation__link--active');
        checkState += 1;
      }
    });
    if (!checkState) {
      this.links[0].classList.add('navigation__link--active');
    }
  }

  toggleMenuProperty() {
    document.body.classList.toggle('overflow-hidden');
    this.burgerMenu.classList.toggle('burger-menu--active');
    this.navigation.classList.toggle('navigation--active');
    if (this.headerNavigation.classList.contains('header__navigation--active')) {
      setTimeout(() => {
        this.headerNavigation.classList.remove('header__navigation--active');
      }, 170);
    } else {
      // todo: think about overflow hidden
      // document.body.style.width = `${document.body.offsetWidth}px`;
      this.headerNavigation.classList.add('header__navigation--active');
    }
  }

  toggleCardsLayout = (e) => {
    const { target } = e;
    if (target.id === 'transcription') {
      toggleDisplay('.card__transcription');
    }
    if (target.id === 'translate') {
      toggleDisplay('.card__text-translate', 'translate-hidden');
    }
    if (target.id === 'associative-picture') {
      toggleDisplay('.card__image-container');
    }
    if (target.id === 'button-i-know') {
      toggleDisplay('.card__know');
    }
    if (target.id === 'button-difficult') {
      toggleDisplay('.card__study');
    }
  };

  changeBtnSpeakerIcon() {
    this.speaker.classList.toggle('user-tool__button-speaker--active');
  }

  showIndexPage = () => document.location.replace('../index.html');
}
