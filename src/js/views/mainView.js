import { CONST_MAIN_VIEW as constMainView, getModalTemplate } from '../constants/constMainView';

export default class MainView {
  constructor() {
    this.onLogOut = null;
    this.burgerMenu = document.querySelector('.burger-menu');
    this.header = document.querySelector('.header');
    this.headerNavigation = document.querySelector('.header__navigation');
    this.navigation = document.querySelector('.navigation');
    this.userTool = document.querySelector('.user-tool');
    this.speaker = document.querySelector('.user-tool__button-speaker');
    this.settings = document.querySelector('.user-tool__button-settings');
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
      const template = getModalTemplate(link);
      this.navigation.innerHTML += template;
    });
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

  onBtnSettingsClick() {
    this.settings.classList.toggle('user-tool__button-settings--active');
  }

  onLogOutClick() {
    this.onLogOut();
    document.location.replace('../index.html');
  }
}
