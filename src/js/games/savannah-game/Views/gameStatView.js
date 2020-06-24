class GameStatistics {
  constructor() {
    this.finalModal = document.createElement('div');
  }

  init(view, mainView) {
    this.mainView = mainView;
    this.view = view;
    this.finalModal.className = 'statistics statistics__container';
    this.finalModal.innerHTML = this.view.statisticsLayout;
    this.view.appContainer.appendChild(this.finalModal);
    this.title = document.querySelector('.statistics__title');
    this.modalListeners();
  }

  loseRound() {
    this.title.textContent = 'В этот раз не получилось, но продолжай тренироваться!';
  }

  winRound() {
    this.title.textContent = `
    Так держать! Испытай себя на следующем раунде или уровне.`;
  }

  modalListeners() {
    this.backToMain();
    this.continuePlaying();
  }

  backToMain() {
    document.querySelector('.statistics__back').addEventListener('click', () => {
      this.view.renderBackToMain();
      this.mainView.renderMain(this.view.currentUser);
    });
  }

  continuePlaying() {
    document.querySelector('.statistics__continue').addEventListener('click', () => {
      this.view.renderSavannah();
    });
  }
}

export default GameStatistics;
