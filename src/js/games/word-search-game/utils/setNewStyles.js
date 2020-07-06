const setNewStyle = () => {
  document.querySelector('.app__content__title').classList.add('app__content__title_word-search');
  document.querySelector('.app__content__text').classList.add('app__content__text_word-search');
  document.querySelector('.app__button').classList.add('app__button_word-search');
  document.querySelector('.app__button_close').classList.add('word-search_close');
  document.querySelector('.app__modal__box_cancel').classList.add('word-search_cancel');
  document.querySelector('.app__content').classList.add('word-search__content');
  Array.from(document.querySelectorAll('.text'))
    .map((text) => text.classList.add('word-search__text'));
  document.querySelector('.rating__container').classList.add('word-search__rating-container');
};

export default setNewStyle;
