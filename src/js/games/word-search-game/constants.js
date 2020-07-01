const GAME_LAYOUT = `
<div class="app word-search__app">
    <div class="app__header">
      <div class="close"></div>
    </div>
    <div class="rating__container"></div>
    <div class="app__content">
      <div class="app__content__title">Найди слово</div>
      <div class="app__content__text">Игра "Найди слово" не только развивает словарный запас, но и тренирует внимательность. Попробуй сам.</div>
      <button class="app__button">Начать</button>
    </div>
    <div class="app__modal">
      <div class="app__modal__box">
        <div class="app__modal__box_title">Тренировка не закончена!</div>
        <div class="app__modal__box_text">Если вы вернетесь к списку, ваши результаты не будут сохранены</div>
        <div class="app__button app__button_close">Закрыть</div>
        <div class="app__modal__box_cancel">Отмена</div>
      </div>
    </div>
  </div>`;

const GROUP_ROUND = `
  <div class="rating__row rating__group">
    <label class="group star" id="0"></label>
    <label class="group star" id="1"></label>
    <label class="group star" id="2"></label>
    <label class="group star" id="3"></label>
    <label class="group star" id="4"></label>
    <label class="group star" id="5"></label>
  </div>
  <div class="text">Уровень сложности</div>
  <div class="rating__row rating__round">
    <label class="round star" id="0"></label>
    <label class="round star" id="1"></label>
    <label class="round star" id="2"></label>
    <label class="round star" id="3"></label>
    <label class="round star" id="4"></label>
    <label class="round star" id="5"></label>
  </div>
  <div class="text text_round">Раунд</div>
`;

const PRELOADER_INFO = `
  Выбери буквы от первой до последней, чтобы составить правильное английское слово к переводу
`;

export {
  GAME_LAYOUT,
  GROUP_ROUND,
  PRELOADER_INFO,
};
