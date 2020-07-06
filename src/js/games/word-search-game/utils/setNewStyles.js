const setNewStyle = () => {
  document.querySelector('.app__content__title').classList.add('word-search__main-title');
  document.querySelector('.app__content__text').classList.add('word-search__description');
  document.querySelector('.app__button').classList.add('word-search__start-btn');
  document.querySelector('.app__button_close').classList.add('word-search_close');
  document.querySelector('.app__modal__box_cancel').classList.add('word-search_cancel');
  document.querySelector('.app__content').classList.add('word-search__start-content');
  Array.from(document.querySelectorAll('.text'))
    .map((text) => text.classList.add('word-search__rating_text'));
  document.querySelector('.rating__container').classList.add('word-search__rating-container');
};

export default setNewStyle;
