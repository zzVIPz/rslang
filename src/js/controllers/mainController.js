import Swiper from 'swiper';
import FirebaseModel from '../models/firebaseModel';
import MainView from '../views/mainView';
import MainModel from '../models/mainModel';
import getCurrentUserState from '../utils/getCurrentUserState';
import { MENU_ITEMS_NAMES, HASH_VALUES } from '../constants/constMainView';
import { startSpeakItGame } from '../games/speak_it/speak_it-main';

export default class MainController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.mainModel = new MainModel();
    this.mainView = new MainView();
    this.swiper = null;
  }

  async init() {
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
      this.mainView.toggleMenuProperty();
      this.mainView.setActiveLink();
    };

    this.mainView.onNavigationLinkClick = (e) => {
      const dataName = e.target.dataset.name;
      if (dataName === MENU_ITEMS_NAMES.mainPage) {
        this.mainView.renderMain(this.user);
      }
      if (dataName === MENU_ITEMS_NAMES.dictionary) {
        // add dictionary
      }
      if (dataName === MENU_ITEMS_NAMES.statistics) {
        // add statistics
      }
      if (dataName === MENU_ITEMS_NAMES.speakit) {
        startSpeakItGame();
      }
      if (dataName === MENU_ITEMS_NAMES.englishPuzzle) {
        // add englishPuzzle
      }
      if (dataName === MENU_ITEMS_NAMES.audiocall) {
        // add audiocall
      }
      if (dataName === MENU_ITEMS_NAMES.savannah) {
        // add savannah
      }
      if (dataName === MENU_ITEMS_NAMES.sprint) {
        // add sprint
      }
      if (dataName === MENU_ITEMS_NAMES.newGame) {
        // add newGame
      }
      if (dataName === MENU_ITEMS_NAMES.promoPage) {
        window.open('./promo.html');
      }

      if (dataName === MENU_ITEMS_NAMES.aboutTeam) {
        window.open('./about.html');
      }
      if (dataName === MENU_ITEMS_NAMES.logOut) {
        this.mainView.onLogOut();
        this.mainView.showIndexPage();
      }
    };

    this.mainView.onBtnStartClick = async (user) => {
      const wordsList = await this.mainModel.getWords(
        user.currentPage,
        user.currentGroup,
        user.cardsTotal,
      );

      this.mainView.renderSwiperTemplate();
      this.initSwiper();
      this.mainView.renderCards(wordsList, user, this.swiper);
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

    this.mainView.onButtonCancelClick = () => {
      this.mainView.closeSettingsModal();
    };

    this.mainView.onBtnSettingsClick = () => {
      this.mainView.showSettingsModal(this.user);
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

    this.mainView.onBtnEnterPress = () => {
      const userAnswer = this.mainView.getUserAnswer();
      // todo: stop here this.mainView.checkUserAnswer();
    };
  }

  initSwiper() {
    if (!this.swiper) {
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
        this.mainView.setFocusToInput();
      });
    } else {
      this.swiper.removeAllSlides();
    }
  }
}
