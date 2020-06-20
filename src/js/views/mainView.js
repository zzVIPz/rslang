import {
  CONST_MAIN_VIEW as constMainView,
  getNavLinkTemplate,
  getModalSettingsTemplate,
} from '../constants/constMainView';

export default class MainView {
  constructor(model) {
    this.onLogOut = null;
    this.model = model;
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
    this.addOverlayPressHandler();
    this.addUserToolHandler();
  }

  renderMenu() {
    constMainView.menuItems.forEach((link) => {
      const template = getNavLinkTemplate(link);
      this.navigation.innerHTML += template;
    });
  }

  showSettingsModal(user) {
    this.settings.classList.toggle('user-tool__button-settings--active');
    this.user = user;
    const formattedTemplate = getModalSettingsTemplate(user);
    const modal = document.createElement('div');
    modal.classList.add('settings__overlay');
    modal.innerHTML = formattedTemplate;
    this.main.append(modal);
    this.totalCards = document.getElementById('cards-amount');
    this.wordAmount = document.getElementById('word-amount');
    this.totalCards.addEventListener('focusout', () => {
      this.setCorrectValue();
    });
    this.wordAmount.addEventListener('focusout', () => {
      this.setCorrectValue();
    });
    this.onButtonAcceptPress();
    this.onButtonCancelPress();
  }

  setCorrectValue() {
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

  onButtonAcceptPress() {
    this.btnAccept = document.querySelector('.btn-accept');
    this.btnAccept.addEventListener('click', () => {
      const userState = this.checkUserState();
      if (userState) {
        this.model.updateUserSettings(userState);
      }
      this.closeSettingsModal();
    });
  }

  onButtonCancelPress() {
    this.btnCancel = document.querySelector('.btn-cancel');
    this.btnCancel.addEventListener('click', () => {
      this.closeSettingsModal();
    });
  }

  closeSettingsModal() {
    this.settings.classList.toggle('user-tool__button-settings--active');
    this.modal = document.querySelector('.settings__overlay');
    if (this.modal) {
      this.modal.remove();
    }
  }

  checkUserState() {
    const totalCards = document.getElementById('cards-amount');
    const wordAmount = document.getElementById('word-amount');
    const modeSelect = document.querySelector('.settings__study-select');
    const textSelect = document.querySelector('.settings__text-select');
    const transcription = document.getElementById('transcription');
    const associativePicture = document.getElementById('associative-picture');
    const btnKnow = document.getElementById('button-i-know');
    const btnDifficult = document.getElementById('button-difficult');
    const user = {
      username: this.user.username,
      cardsTotal: +totalCards.value,
      cardsNew: +wordAmount.value,
      studyMode: modeSelect.options[modeSelect.selectedIndex].value,
      learningWordsMode: textSelect.options[textSelect.selectedIndex].value,
      transcription: transcription.checked,
      associativePicture: associativePicture.checked,
      btnKnow: btnKnow.checked,
      btnDifficult: btnDifficult.checked,
    };
    if (JSON.stringify(this.user) !== JSON.stringify(user)) return user;
    return false;
  }

  addUserToolHandler() {
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
    this.navigation.addEventListener('click', (event) => {
      const dataName = event.target.dataset.name;
      // todo refactor after final menu elements
      if (dataName === 'log-out') {
        this.onLogOutClick();
        this.showIndexPage();
      }
      if (!event.target.classList.contains('navigation')) {
        this.toggleMenuProperty();
      }
    });
  }

  addOverlayPressHandler() {
    this.headerNavigation.addEventListener('click', (event) => {
      if (event.target.classList.contains('header__navigation--active')) {
        this.toggleMenuProperty();
      }
    });
  }

  addBurgerMenuClickHandler() {
    this.burgerMenu.addEventListener('click', () => {
      this.toggleMenuProperty();
      this.setActiveLink();
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

  onBtnSpeakerClick() {
    this.speaker.classList.toggle('user-tool__button-speaker--active');
  }

  async onBtnSettingsClick() {
    this.user = await this.model.getUser();
    this.showSettingsModal(this.user);
  }

  onLogOutClick() {
    this.onLogOut();
    document.location.replace('../index.html');
  }
}
