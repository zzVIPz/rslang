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

const WORD_SEARCH_TITLE = `
    <span class='word-search__title_box W'>W</span>
    <span class='word-search__title_box O'>O</span>
    <span class='word-search__title_box R'>R</span>
    <span class='word-search__title_box D'>D</span>
    <span class='word-search__title_search'>SEARCH</span>
`;

const WORD_SEARCH_CONTENT = `
    <div class="word-search__board">
        <div class="word-search__board_inner">
            <div class="word-search__template">
                <div class="word-search-grid"></div>
            </div>
        </div>
    </div>
`;

const ROWS = `
        <div class="row row-0"></div>
        <div class="row row-1"></div>
        <div class="row row-2"></div>
        <div class="row row-3"></div>
        <div class="row row-4"></div>
        <div class="row row-5"></div>
        <div class="row row-6"></div>
        <div class="row row-7"></div>
        <div class="row row-8"></div>
        <div class="row row-9"></div>
    `;

const WORDS_CONTAINER = '<ul class="word-search__words"></ul>';

const CHECK_BTN_TEXT = 'Проверить';
const CLEAR_BTN_TEXT = 'Очистить';
const NUMBER_OF_LIVES = 5;

export {
  GAME_LAYOUT,
  GROUP_ROUND,
  PRELOADER_INFO,
  WORD_SEARCH_TITLE,
  WORD_SEARCH_CONTENT,
  ROWS,
  WORDS_CONTAINER,
  CHECK_BTN_TEXT,
  CLEAR_BTN_TEXT,
  NUMBER_OF_LIVES,
};
