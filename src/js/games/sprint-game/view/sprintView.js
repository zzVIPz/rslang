import mainLayout from './layouts';

export default class SprintView {
  constructor() {
    this.mainLayout = mainLayout;
  }

  renderGameLayout() {
    document.querySelector('.main')
      .insertAdjacentHTML('beforeend', this.mainLayout);
  }
}
