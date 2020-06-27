import Swiper from 'swiper';
import FirebaseModel from '../models/firebaseModel';
import MainView from '../views/mainView';
import MainModel from '../models/mainModel';
import getCurrentUserState from '../utils/getCurrentUserState';
import { MENU_ITEMS_NAMES, HASH_VALUES } from '../constants/constMainView';

export default class MainController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.mainModel = new MainModel();
    this.mainView = new MainView();
    this.swiper = null;
    this.slideIndex = 0;
  }

  async init() {
    this.setDefaultHash();
    this.firebaseModel.onAuthStateChangedHandler();
    this.mainModel.init();
    this.mainView.init();
    this.accessData = this.mainModel.getAccessData();
    this.user = await this.mainModel.getUser(this.accessData.userId, this.accessData.token);
    this.mainView.renderMain(this.user);
    if (this.accessData.username) {
      this.mainView.showSettingsModal(this.user);
      this.mainView.addSettingsModalListeners();
    }
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.mainView.onLogOut = () => {
      this.firebaseModel.onLogOut();
    };

    this.mainView.onBurgerMenuClick = () => {
      this.mainView.stopAudio();
      this.mainView.toggleMenuProperty();
      this.mainView.setActiveLink();
    };

    this.mainView.onNavigationLinkClick = (e) => {
      const dataName = e.target.dataset.name;
      switch (dataName) {
        case MENU_ITEMS_NAMES.dictionary:
          break;
        case MENU_ITEMS_NAMES.statistics:
          break;
        case MENU_ITEMS_NAMES.speakit:
          break;
        case MENU_ITEMS_NAMES.englishPuzzle:
          break;
        case MENU_ITEMS_NAMES.audiocall:
          break;
        case MENU_ITEMS_NAMES.savannah:
          break;
        case MENU_ITEMS_NAMES.sprint:
          break;
        case MENU_ITEMS_NAMES.newGame:
          break;
        case MENU_ITEMS_NAMES.promoPage:
          e.preventDefault();
          window.open('./promo.html');
          break;
        case MENU_ITEMS_NAMES.aboutTeam:
          e.preventDefault();
          window.open('./about.html');
          break;
        case MENU_ITEMS_NAMES.logOut:
          this.mainView.onLogOut();
          this.mainView.showIndexPage();
          break;
        default:
          e.preventDefault();
          this.setDefaultHash();
          this.mainView.renderMain(this.user);
      }
    };

    this.mainView.onBtnStartClick = async (user) => {
      this.slideIndex = 0;
      this.mainView.setSwiperDefaultState();
      const wordsList = await this.mainModel.getWords(
        user.currentPage,
        user.currentGroup,
        user.cardsTotal,
      );

      this.mainView.renderSwiperTemplate();
      this.initSwiper();
      this.mainView.renderCards(wordsList, user, this.swiper);
      this.mainView.disableSwiperNextSlide();
      this.mainView.setFocusToInput();
      window.location.hash = HASH_VALUES.training;
    };

    this.mainView.onButtonAcceptClick = () => {
      const currentUserState = getCurrentUserState();
      const copyUser = JSON.parse(JSON.stringify(this.user));
      Object.assign(copyUser, currentUserState);
      if (JSON.stringify(this.user) !== JSON.stringify(copyUser)) {
        this.user = copyUser;
        this.mainModel.updateUserSettings(copyUser);
        if (!window.location.hash) {
          this.mainView.renderMain(copyUser);
        }
      }
      this.mainView.closeSettingsModal();
    };

    this.mainView.onModalBtnCancelClick = () => {
      this.mainView.closeSettingsModal();
    };

    this.mainView.onBtnSettingsClick = () => {
      this.mainView.showSettingsModal(this.user);
      this.checkHashValue();
      this.mainView.addSettingsModalListeners();
    };

    this.mainView.onLogOutClick = () => {
      this.mainView.onLogOut();
      this.mainView.showIndexPage();
    };

    this.mainView.onOverlayClick = () => {
      this.mainView.toggleMenuProperty();
    };

    this.mainView.onBtnSpeakerClick = () => {
      this.mainView.changeBtnSpeakerIcon();
    };

    this.mainView.onInputComplete = () => {
      this.mainView.checkUserSettings();
    };

    this.mainView.onModalClick = (e) => {
      this.mainView.toggleCardsLayout(e);
    };

    this.mainView.onEnterPress = () => {
      this.checkUserAnswer();
    };

    this.mainView.onBtnCheckClick = () => {
      this.checkUserAnswer();
    };
    this.mainView.onBtnShowAnswerClick = () => {
      this.mainView.showCorrectAnswer(true);
      setTimeout(() => {
        this.allowAccessNextSlide();
      }, 1000);
    };
  }

  checkHashValue() {
    if (window.location.hash.slice(1) === HASH_VALUES.training) {
      this.mainView.disableStudyProfileProperties();
    }
  }

  setDefaultHash = () => {
    window.history.replaceState(null, null, ' ');
  };

  checkUserAnswer() {
    const userAnswer = this.mainView.getUserAnswer().toLowerCase();
    const correctValue = this.mainView.getCurrentInputNode().dataset.word.toLowerCase();

    if (userAnswer) {
      if (userAnswer === correctValue) {
        this.allowAccessNextSlide();
      } else {
        this.mainView.showCorrectAnswer();
      }
    }
    // todo show modal: need text
  }

  allowAccessNextSlide() {
    if (this.user.textPronunciation || this.user.wordPronunciation) {
      this.mainView.playAudio(this.user);
    }
    this.mainView.disableCurrentInput();
    if (this.slideIndex === this.swiper.realIndex) {
      this.slideIndex += 1;
      this.mainView.enableSwiperNextSlide();
      if (!this.user.textPronunciation && !this.user.wordPronunciation) {
        this.swiper.slideNext();
      }
      if (this.slideIndex === this.user.cardsTotal) {
        alert("It's finish!");
      }
    }
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        type: 'progressbar',
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.swiper.on('slideChange', () => {
      this.mainView.stopAudio();
      if (this.swiper.realIndex < this.slideIndex) {
        this.mainView.enableSwiperNextSlide();
      }
    });
    this.swiper.on('slideNextTransitionStart', () => {
      this.mainView.setFocusToInput();
      if (this.slideIndex === this.swiper.realIndex) {
        this.mainView.disableSwiperNextSlide();
      }
    });
  }
}
