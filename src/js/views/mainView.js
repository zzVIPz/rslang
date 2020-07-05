import {
  MENU_ITEMS_NAMES,
  SETTING_MODAL_TEXT,
  MAIN_TEXT,
  SWIPER_TEMPLATE,
  DELAY_HIDE_MENU,
  DELAY_SET_FOCUS_ON_INPUT,
} from '../constants/constMainView';
import getMainTemplate from '../utils/getMainTemplate';
import getNavLinkTemplate from '../utils/getNavLinkTemplate';
import getModalSettingsTemplate from '../utils/getModalSettingsTemplate';
import toggleVisibility from '../utils/toggleVisibility';
import getPlaylist from '../utils/getPlaylist';
import getHintTemplate from '../utils/getHintTemplate';
import getShortStatisticsTemplate from '../utils/getShortStatisticsTemplate';
import getNotificationTemplate from '../utils/getNotificationTemplate';
import Card from '../components/card/cardController';

export default class MainView {
  constructor() {
    this.onLogOut = null;
    this.onBtnStartClick = null;
    this.onButtonAcceptClick = null;
    this.onModalBtnCancelClick = null;
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
    this.addEnterPressHandler();
    this.addCardBtnsClickHandler();
  }

  renderMain(user) {
    const formattedTemplate = getMainTemplate(user, MAIN_TEXT);
    this.main.innerHTML = formattedTemplate;
    this.btnStartLearning = document.querySelector('.btn-start');
    if (!user.wordPronunciation && !user.meaningPronunciation && !user.examplePronunciation) {
      this.speaker.classList.remove('user-tool__button-speaker--active');
    }
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
      }, DELAY_SET_FOCUS_ON_INPUT);
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

  disableSwiperNextSlide() {
    this.btnSliderNext = this.btnSliderNext || document.querySelector('.swiper-button-next');
    this.swiper.allowSlideNext = false;
    this.btnSliderNext.classList.add('swiper-button-disabled');
  }

  enableSwiperNextSlide() {
    this.swiper.allowSlideNext = true;
    this.btnSliderNext.classList.remove('swiper-button-disabled');
  }

  setSwiperDefaultState() {
    this.btnSliderNext = null;
  }

  disableStudyProfileProperties = () => {
    const totalCards = document.getElementById('cards-amount');
    const wordAmount = document.getElementById('word-amount');
    const selectStudyMode = document.querySelector('.settings__study-select');
    const selectTrainingMode = document.querySelector('.settings__text-select');
    totalCards.setAttribute('disabled', 'disabled');
    wordAmount.setAttribute('disabled', 'disabled');
    selectStudyMode.setAttribute('disabled', 'disabled');
    selectTrainingMode.setAttribute('disabled', 'disabled');
  };

  getUserAnswer(currentSlide = this.getCurrentSlide()) {
    return currentSlide ? this.getCurrentInputNode(currentSlide).value : null;
  }

  getCurrentInputNode = (currentSlide = this.getCurrentSlide()) => {
    let inputNode;
    const nodes = currentSlide.querySelectorAll('.card__input-container');
    nodes.forEach((node) => {
      if (!node.classList.contains('hidden')) {
        inputNode = node.querySelector('.card__input-text');
      }
    });
    return inputNode;
  };

  getWordId(currentSlide = this.getCurrentSlide()) {
    return currentSlide.dataset.id;
  }

  showAdditionalControlButtons(currentSlide = this.getCurrentSlide()) {
    currentSlide.querySelector('.card__buttons-container').classList.add('hidden');
    currentSlide.querySelector('.card__additional-buttons-container').classList.remove('hidden');
  }

  disableToolButtons(currentSlide = this.getCurrentSlide()) {
    const buttons = currentSlide.querySelectorAll('button');
    buttons.forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  }

  disableAdditionalControlButtons(currentSlide = this.getCurrentSlide()) {
    const buttons = currentSlide.querySelectorAll('.card__btn-additional');
    buttons.forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  }

  disableCurrentInput(currentSlide = this.getCurrentSlide()) {
    // todo: show all data, disable buttons
    const currentInput = this.getCurrentInputNode(currentSlide);
    currentInput.setAttribute('disabled', 'disabled');
    const nodes = currentSlide.querySelectorAll('.card__input-container');
    nodes.forEach((node) => {
      if (!node.classList.contains('hidden')) {
        node.querySelector('.card__text-translate').classList.remove('hidden');
      }
    });
  }

  playAudio = (user, currentSlide = this.getCurrentSlide()) => {
    this.stopAudio();
    if (this.speaker.classList.contains('user-tool__button-speaker--active')) {
      this.playlist = getPlaylist(user, currentSlide);
      if (this.playlist.length) {
        this.playlist[0].play();
        this.playlist.forEach((node, i, arr) => {
          node.addEventListener('ended', () => {
            if (node.duration === node.currentTime) {
              const nextAudio = arr[i + 1];
              if (nextAudio) {
                nextAudio.play();
              } else if (user.automaticallyScroll && !user.additionalControl) {
                this.swiper.slideNext();
              }
            }
          });
        });
      }
    }
  };

  showCorrectAnswer(param) {
    const currentInput = this.getCurrentInputNode();
    const answer = currentInput.value;
    const correctAnswer = currentInput.dataset.word;
    if (param) {
      currentInput.value = correctAnswer;
    } else {
      const setFocusOnInput = () => {
        currentInput.focus();
      };

      const removeHintContainer = () => {
        currentInput.removeEventListener('input', removeHintContainer);
        currentInput.removeEventListener('click', setFocusOnInput);
        this.hintContainer.remove();
      };

      if (this.hintContainer) {
        this.hintContainer.remove();
      }
      currentInput.value = '';
      const hintTemplate = getHintTemplate(answer, correctAnswer);
      currentInput.insertAdjacentHTML('afterend', hintTemplate);
      this.hintContainer = document.querySelector('.card__hint-container');
      this.hintContainer.classList.add('card__hint-container--invisible');
      currentInput.focus();
      this.hintContainer.addEventListener('click', setFocusOnInput);
      currentInput.addEventListener('input', removeHintContainer);
    }
  }

  renderCards(words, user, swiper) {
    console.log('words', words);
    this.swiper = swiper;
    words.forEach((word) => {
      const card = new Card(word, user);
      this.swiper.appendSlide(card.renderTemplate());
      this.swiper.update();
    });
  }

  addCardToRepeat(word, user) {
    console.log('word', word);
    const card = new Card(word, user);
    // this.swiper.addSlide(this.swiper.slides.length, card.renderTemplate());
    this.swiper.appendSlide(card.renderTemplate());
    console.log(this.swiper);
  }

  renderMenu() {
    Object.values(MENU_ITEMS_NAMES).forEach((link) => {
      const template = getNavLinkTemplate(link);
      this.navigation.innerHTML += template;
    });
  }

  renderShortStatistics(data) {
    const shortStatisticsTemplate = getShortStatisticsTemplate(data);
    this.showOverlay(shortStatisticsTemplate);
    // todo: to Dima: so you can see your modal
    debugger;
    this.hideOverlay();
  }

  showNotificationAboutRepeat(cardsAmount) {
    const notification = getNotificationTemplate(cardsAmount);
    this.showOverlay(notification);
    // debugger;
    // todo: to Dima: so you can see your modal
    this.hideOverlay();
  }

  showSettingsModal(user) {
    this.settings.classList.toggle('user-tool__button-settings--active');
    const formattedTemplate = getModalSettingsTemplate(user, SETTING_MODAL_TEXT);
    this.showOverlay(formattedTemplate);
  }

  showOverlay(modalTemplate) {
    const modal = document.createElement('div');
    modal.classList.add('settings__overlay');
    modal.innerHTML = modalTemplate;
    this.main.append(modal);
  }

  hideOverlay = () => {
    const modal = document.querySelector('.settings__overlay');
    if (modal) {
      modal.remove();
    }
  };

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
    document.querySelector('.btn-accept').addEventListener('click', () => {
      this.onButtonAcceptClick();
    });
    document.querySelector('.btn-cancel').addEventListener('click', () => {
      this.onModalBtnCancelClick();
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
    this.hideOverlay();
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

  addEnterPressHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.onEnterPress();
      }
    });
  }

  addCardBtnsClickHandler() {
    document.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains('card__btn-check')) {
        this.onBtnCheckClick();
      }
      if (target.classList.contains('card__btn-show-answer')) {
        this.onBtnShowAnswerClick();
      }
      if (target.classList.contains('card__btn-know-word')) {
        this.onBtnKnowClick();
      }
      if (target.classList.contains('card__btn-difficult-word')) {
        this.onBtnDifficultClick();
      }
      if (target.classList.contains('card__btn-easy-word')) {
        this.onBtnEasyWordClick();
      }
      if (target.classList.contains('card__btn-normal-word')) {
        this.onBtnNormalWordClick();
      }
      if (target.classList.contains('card__btn-complex-word')) {
        this.onBtnDifficultWordClick();
      }
      if (target.classList.contains('card__btn-repeat-again')) {
        this.onBtnRepeatAgainClick();
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
      }, DELAY_HIDE_MENU);
    } else {
      // todo: think about overflow hidden
      // document.body.style.width = `${document.body.offsetWidth}px`;
      this.headerNavigation.classList.add('header__navigation--active');
    }
  }

  toggleCardsLayout = (e) => {
    const { target } = e;
    if (target.id === 'transcription') {
      toggleVisibility('.card__transcription');
    }
    if (target.id === 'translate') {
      toggleVisibility('.card__text-translate', true);
    }
    if (target.id === 'associative-picture') {
      toggleVisibility('.card__image-container');
    }
    if (target.id === 'button-i-know') {
      toggleVisibility('.card__btn-know-word');
    }
    if (target.id === 'button-difficult') {
      toggleVisibility('.card__btn-difficult-word');
    }
    if (target.id === 'show-answer') {
      toggleVisibility('.card__btn-show-answer');
    }
  };

  changeBtnSpeakerIcon() {
    this.speaker.classList.toggle('user-tool__button-speaker--active');
    if (!this.speaker.classList.contains('user-tool__button-speaker--active')) {
      this.stopAudio();
    }
  }

  stopAudio() {
    if (this.playlist) {
      this.playlist.forEach((audio) => audio.pause());
    }
  }

  showIndexPage = () => document.location.replace('../index.html');
}
