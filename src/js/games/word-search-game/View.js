import { gameLayout, groupRound } from './constants';
import GroupRoundView from '../savannah-game/Views/groupRoundView';
import SavannahView from '../savannah-game/Views/View';

class WordSearchView {
  constructor(model, defaultHash) {
    this.model = model;
    this.savannahView = new SavannahView();
    this.setDefaultHash = defaultHash;
    this.WordSearchLayout = gameLayout;
    this.mainContainer = document.querySelector('.main');
    this.appContainer = document.querySelector('.word-search__app');
    this.groupRoundHtml = groupRound;
  }

  init() {
    this.renderStartPage();
    this.addListeners();
  }

  renderStartPage() {
    this.mainContainer.innerHTML = this.WordSearchLayout;
    document.body.classList.add('word-search__background');
    this.renderRating();
  }

  renderRating() {
    this.appContainer = document.querySelector('.word-search__app');
    this.groupRoundView = new GroupRoundView(this.groupRoundHtml, this.appContainer);
    this.setNewColor();
    this.groupRoundView.init();
    this.stars = Array.from(document.querySelectorAll('.star'));
    this.stars.map((star) => star.classList.add('word-search_color'));
  }

  setNewColor() {
    document.querySelector('.app__content__title').classList.add('app__content__title_word-search');
    document.querySelector('.app__content__text').classList.add('app__content__text_word-search');
    document.querySelector('.app__button').classList.add('app__button_word-search');
    document.querySelector('.app__button_close').classList.add('app__button_close_word-search');
    document.querySelector('.app__modal__box_cancel').classList.add('app__modal__box_cancel_word-search');
    return this;
  }

  addListeners() {
    this.savannahView.addListeners();
  }
}

export default WordSearchView;
