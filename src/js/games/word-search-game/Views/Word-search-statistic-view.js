import GameStatistics from '../../savannah-game/Views/gameStatView';

class WordSearchStatistics extends GameStatistics {
  constructor() {
    super();
    this.us = '';
  }

  renderWrongAnswersTitle() {
    this.wrongTitle = document.querySelector('.word-search__wrong-title');
    this.wrongTitle.innerHTML = `Неотгаданно: ${this.model.tenEngWordsArr.length}`;
  }
}

export default WordSearchStatistics;
