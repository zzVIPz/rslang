import GameStatistics from '../../savannah-game/Views/gameStatView';

class WordSearchStatistics extends GameStatistics {
  constructor() {
    super();
    this.us = '';
  }

  renderWrongAnswersTitle() {
    this.wrongTitle = document.querySelector('.word-search__wrong-title');
    this.wrongTitle.innerHTML = `Неотгадано: ${this.model.tenEngWordsArr.length}`;
  }

  changeClassName = () => {
    if (document.querySelector('.statistics')) {
      document.querySelector('.statistics').classList.add('word-search__statistics');
      document.querySelector('.wrong_title').classList.add('word-search__wrong-title');
      document.querySelector('.statistics__continue').classList.add('word-search__continue');
      document.querySelector('.statistics__back').classList.add('word-search__back');
      document.querySelector('.statistics__title').classList.add('word-search__statistics-title');
    }
  }
}

export default WordSearchStatistics;
