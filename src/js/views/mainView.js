export default class MainView {
  constructor() {
    this.onLogOut = null;
  }

  addListeners() {
    this.addBtnLogOutClickHandler();
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
