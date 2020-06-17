import CONST_INDEX_VIEW from '../constants/constMainView';

export default class MainView {
  constructor() {
    this.onLogOut = null;
    this.constMainView = CONST_INDEX_VIEW;
    this.burgerMenu = document.querySelector('.burger-menu');
    this.header = document.querySelector('.header');
    this.headerNavigation = document.querySelector('.header__navigation');
    this.navigation = document.querySelector('.navigation');
  }

  init() {
    this.renderMenu();
    this.links = document.querySelectorAll('.navigation__link');
    this.addListeners();
  }

  addListeners() {
    this.addBtnLogOutClickHandler();
    this.addBurgerMenuClickHandler();
    this.addNavigationLinkClickHandler();
  }

  renderMenu() {
    this.constMainView.menuItems.forEach((link) => {
      const template = this.constMainView.getModalTemplate(link);
      this.navigation.innerHTML += template;
    });
  }

  addNavigationLinkClickHandler() {
    this.navigation.addEventListener('click', (event) => {
      const dataName = event.target.dataset.name;
      // todo refactor after final menu elements
      if (dataName === 'log-out') {
        this.onLogOut();
        this.showIndexPage();
      }
      this.toggleMenuProperty();
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
      document.body.style.width = `${document.body.offsetWidth}px`;
      this.headerNavigation.classList.add('header__navigation--active');
    }
  }

  addBtnLogOutClickHandler() {
    const btn = document.querySelector('.log-out');
    btn.addEventListener('click', () => {
      this.onLogOut();
      this.showIndexPage();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showIndexPage() {
    document.location.replace('../index.html');
  }
}
