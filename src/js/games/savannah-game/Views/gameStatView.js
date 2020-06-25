class GameStatistics {
  constructor() {
    this.finalModal = document.createElement('div');
  }

  init(view, mainView, model) {
    this.mainView = mainView;
    this.view = view;
    this.model = model;
    this.finalModal.className = 'statistics statistics__container hidden';
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
      this.model.setDefault();
      this.view.backgroundPositionY = 100;
    });
  }

  renderWrongAnswersTitle() {
    this.wrongTitle = document.querySelector('.wrong_title');
    this.wrongTitle.innerHTML = `Ошибок: ${this.model.wrongAnswer}`;
  }

  renderCorrectAnswerTitle() {
    this.correctTitle = document.querySelector('.correct_title');
    this.correctTitle.innerHTML = `Знаю: ${this.model.rightAnswer}`;
  }

  renderWord(word, translation) {
    this.wordBox = document.createElement('div');
    this.wordBox.className = 'wordBox';
    this.wordBox.innerHTML = `
    <div class="soundBox">
      <a href="#"><img src="../src/assets/images/audio.png"></a>
    </div>
    <div class="word-eng">${word}</div>
    <div class="word-trans">— ${translation}</div>
    `;
  }

  appendWrongAnswer(word, translation) {
    this.wordsWrongBox = document.querySelector('.statistics__words-set_wrong');
    this.renderWord(word, translation);
    this.wordsWrongBox.appendChild(this.wordBox);
  }

  appendCorrectAnswer(word, translation) {
    this.wordsCorrectBox = document.querySelector('.statistics__words-set_correct');
    this.renderWord(word, translation);
    this.wordsCorrectBox.appendChild(this.wordBox);
  }
}

export default GameStatistics;
