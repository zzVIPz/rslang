import Swiper from 'swiper';
import FirebaseModel from '../models/firebaseModel';
import MainView from '../views/mainView';
import MainModel from '../models/mainModel';
import getCurrentUserState from '../utils/getCurrentUserState';
import getWordsList from '../utils/getWordsList';
import SavannahController from '../games/savannah-game/Controller';
import {
  MENU_ITEMS_NAMES,
  HASH_VALUES,
  DELAY_NEXT_SLIDE_AUDIO_OFF,
  DELAY_NEXT_SLIDE_AUDIO_ON,
  WORDS_STATUS,
  PAGES_LINKS,
  REPEAT_NUMBER,
  AMOUNT_WORDS_PER_PAGE,
  AMOUNT_PAGES_PER_GROUP,
  WORDS_PER_PAGE,
} from '../constants/constMainView';
import EnglishPuzzleStart from '../games/english-puzzle/views/englishPuzzleStartView';
import DictionaryController from '../components/dictionary/dictionaryController';

export default class MainController {
  constructor() {
    this.firebaseModel = new FirebaseModel();
    this.mainModel = new MainModel();
    this.mainView = new MainView();
    this.swiper = null;
  }

  async init() {
    this.setDefaultHash();
    this.subscribeToEvents();
    this.firebaseModel.onAuthStateChangedHandler();
    this.mainModel.init();
    this.mainView.init();
    this.accessData = this.mainModel.getAccessData();
    this.user = await this.mainModel.getUser();
    this.user.token = this.accessData.token;
    this.mainView.renderMain(this.user);
    if (this.accessData.username) {
      this.mainView.showSettingsModal(this.user);
      this.mainView.addSettingsModalListeners();
    }
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
          this.dictionary = new DictionaryController(this.mainModel);
          this.dictionary.init();
          break;
        case MENU_ITEMS_NAMES.statistics:
          break;
        case MENU_ITEMS_NAMES.speakit:
          break;
        case MENU_ITEMS_NAMES.englishPuzzle:
          this.englishPuzzle = new EnglishPuzzleStart(this.user,
            this.mainView, this.setDefaultHash);
          this.englishPuzzle.start();
          break;
        case MENU_ITEMS_NAMES.audiocall:
          break;
        case MENU_ITEMS_NAMES.savannah:
          this.savannah = new SavannahController(this.user, this.mainView);
          this.savannah.init(this.setDefaultHash);
          break;
        case MENU_ITEMS_NAMES.sprint:
          break;
        case MENU_ITEMS_NAMES.newGame:
          break;
        case MENU_ITEMS_NAMES.promoPage:
          e.preventDefault();
          window.open(PAGES_LINKS.promo);
          break;
        case MENU_ITEMS_NAMES.aboutTeam:
          e.preventDefault();
          window.open(PAGES_LINKS.about);
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
      await this.setDefaultState();
      this.mainView.setSwiperDefaultState();
      const wordsList = await this.getWordsList();
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
      if (this.getCurrentHash() === HASH_VALUES.training) {
        this.checkUserAnswer();
      }
    };

    this.mainView.onBtnCheckClick = async () => {
      await this.checkUserAnswer();
    };

    this.mainView.onBtnDifficultClick = () => {
      this.mainView.disableToolButtons();
      this.saveWord(WORDS_STATUS.difficult);
    };

    this.mainView.onBtnKnowClick = async () => {
      this.increaseCounter();
      this.updateCorrectAnswersSeries();
      this.mainView.disableToolButtons();
      await this.saveWord(WORDS_STATUS.easy);
    };

    this.mainView.onBtnShowAnswerClick = () => {
      this.mainView.disableToolButtons();
      this.saveWord(WORDS_STATUS.repeat);
    };
  }

  async getWordsList() {
    const repeatWordsAmount = this.user.cardsTotal - this.user.cardsNew;
    this.newWordsAmount = this.user.cardsNew;
    let aggregatedWords = [];

    if (repeatWordsAmount) {
      aggregatedWords = await this.mainModel.getAggregatedWords(
        {
          [WORDS_STATUS.userWord]: `${WORDS_STATUS.repeat}`,
        },
        repeatWordsAmount,
      );
      aggregatedWords = aggregatedWords[0].paginatedResults;
      if (aggregatedWords.length < repeatWordsAmount) {
        this.newWordsAmount += repeatWordsAmount - aggregatedWords.length;
      }
    }

    const totalPagesRequest = Math.ceil(
      (this.newWordsAmount + this.user.currentWordNumber) / WORDS_PER_PAGE,
    );

    let wordsList = await getWordsList(this.user, totalPagesRequest, this.mainModel.getWords);

    wordsList = wordsList.splice(this.user.currentWordNumber, this.newWordsAmount);
    if (aggregatedWords.length) {
      aggregatedWords.forEach((word) => {
        wordsList.push(word);
      });
    }

    return wordsList;
  }

  updateUserSettings() {
    this.user.currentWordNumber += 1;
    if (this.user.currentWordNumber > AMOUNT_WORDS_PER_PAGE) {
      this.user.currentWordNumber = 0;
      this.user.currentPage += 1;
      if (this.user.currentPage > AMOUNT_PAGES_PER_GROUP) {
        this.user.currentPage = 0;
        this.user.currentGroup += 1;
      }
    }
    this.mainModel.updateUserSettings(this.user);
  }

  showCorrectAnswer() {
    this.mainView.showCorrectAnswer(true);
    setTimeout(() => {
      this.allowAccessNextSlide();
    }, DELAY_NEXT_SLIDE_AUDIO_OFF);
  }

  async saveWord(category, optional = {}) {
    if (this.slideIndex === this.swiper.realIndex) {
      const wordId = this.mainView.getWordId();
      const createRecord = async () => {
        await this.mainModel.createUserWord(wordId, {
          difficulty: WORDS_STATUS[category],
          optional,
        });
      };
      const wordById = await this.mainModel.getAggregatedWordById(wordId);
      if (wordById.userWord) {
        if (wordById.userWord.difficulty !== WORDS_STATUS[category]) {
          await this.mainModel.deleteUserWord(wordId);
          await createRecord();
        }
      } else {
        this.updateUserSettings();
        await createRecord();
      }
      this.showCorrectAnswer();
    } else {
      this.playAudio();
    }
  }

  async updateUserWord(category, optional = {}) {
    const wordId = this.mainView.getWordId();
    await this.mainModel.updateUserWord(wordId, {
      difficulty: WORDS_STATUS[category],
      optional,
    });
  }

  async checkUserAnswer() {
    const userAnswer = this.mainView.getUserAnswer().toLowerCase();
    const correctValue = this.mainView.getCurrentInputNode().dataset.word.toLowerCase();
    if (userAnswer) {
      if (userAnswer === correctValue) {
        if (this.mistakesMode) {
          await this.saveWord(WORDS_STATUS.repeat, { mistakesCounter: REPEAT_NUMBER });
        } else {
          this.increaseCounter();
          const currentMistakesCounter = await this.checkMistakesCounter();
          if (currentMistakesCounter) {
            await this.updateUserWord(WORDS_STATUS.repeat, {
              mistakesCounter: currentMistakesCounter,
            });
            this.allowAccessNextSlide();
          } else {
            await this.saveWord(WORDS_STATUS.easy);
          }
        }
        this.updateCorrectAnswersSeries();
        this.mistakesMode = false;
      } else {
        this.mistakesMode = true;
        this.currentSeries = 0;
        this.mainView.showCorrectAnswer();
      }
    } else {
      this.mainView.setFocusToInput();
    }
    // todo show modal: need text
  }

  async checkMistakesCounter() {
    const wordId = this.mainView.getWordId();
    if (this.allUserWordsId.includes(wordId)) {
      const wordInfo = await this.mainModel.getUsersWordById(wordId);
      if (
        wordInfo.difficulty === WORDS_STATUS.repeat
        && wordInfo.optional
        && wordInfo.optional.mistakesCounter
      ) {
        const { mistakesCounter } = wordInfo.optional;
        return mistakesCounter - 1;
      }
    }

    return false;
  }

  async getAllUsersWordsId() {
    let allUsersWords = await this.mainModel.getAllUsersWords();
    if (allUsersWords.length) {
      allUsersWords = allUsersWords.map((word) => word.wordId);
    }
    return allUsersWords;
  }

  allowAccessNextSlide() {
    this.playAudio();
    this.mainView.disableCurrentInput();
    if (this.slideIndex === this.swiper.realIndex) {
      this.slideIndex += 1;
      this.mainView.enableSwiperNextSlide();
      if (
        !this.user.textPronunciation
        && !this.user.wordPronunciation
        && this.user.automaticallyScroll
      ) {
        setTimeout(() => {
          this.swiper.slideNext();
        }, DELAY_NEXT_SLIDE_AUDIO_ON);
      }
      if (this.slideIndex === this.user.cardsTotal) {
        const percentageCorrectAnswers = Math.ceil(
          (100 * this.correctAnswersCounter) / this.user.cardsTotal,
        );
        this.mainView.renderShortStatistics({
          cardsTotal: this.user.cardsTotal,
          percentageCorrectAnswers,
          newWordsAmount: this.newWordsAmount,
          correctAnswersSeries: this.correctAnswersSeries,
        });
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
    this.slideIndex = 0;
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

  playAudio() {
    if (this.user.textPronunciation || this.user.wordPronunciation) {
      this.mainView.playAudio(this.user);
    }
  }

  async setDefaultState() {
    this.allUserWordsId = await this.getAllUsersWordsId();
    this.slideIndex = 0;
    this.mistakesMode = false;
    this.correctAnswersCounter = 0;
    this.currentSeries = 0;
    this.correctAnswersSeries = 0;
  }

  increaseCounter() {
    this.currentSeries += 1;
    this.correctAnswersCounter += 1;
  }

  updateCorrectAnswersSeries() {
    if (this.currentSeries > this.correctAnswersSeries) {
      this.correctAnswersSeries = this.currentSeries;
    }
  }

  checkHashValue() {
    if (this.getCurrentHash() === HASH_VALUES.training) {
      this.mainView.disableStudyProfileProperties();
    }
  }

  getCurrentHash = () => window.location.hash.slice(1);

  setDefaultHash = () => {
    window.history.replaceState(null, null, ' ');
  };
}
