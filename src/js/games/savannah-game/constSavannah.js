const GAME_LAYOUT = `
<div class="app savannah__app">
    <div class="app__header">
      <div class="close"></div>
    </div>
    <div class="rating__container"></div>
    <div class="app__content">
      <div class="app__content__title">Саванна</div>
      <div class="app__content__text">Тренировка Саванна развивает словарный запас. Попробуй сам.</div>
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

const PRELOADER = `
<div class="preloader__container"> 
    <div class="current-level"></div>
    <div class="countdown">3</div>
    <div class="preloader">
      <div class="item-1"></div>
      <div class="item-2"></div>
      <div class="item-3"></div>
      <div class="item-4"></div>
      <div class="item-5"></div>
    </div>
    <div class="preloader__info">
      <img class="keyboard" src="../src/assets/images/keyboard.png">
      <span class="preloader__info_text">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</span>
    </div>
</div>`;

const LIVES = `
<span id="life-1">❤</span>
<span id="life-2">❤</span>
<span id="life-3">❤</span>
<span id="life-4">❤</span>
<span id="life-5">❤</span>
`;

const SPARKLES = `
<div class="sparkle sparkle-circle-one"></div>
<div class="sparkle sparkle-circle-two"></div>
<div class="sparkle sparkle-circle-three"></div>
<div class="sparkle sparkle-dot-one"></div>
<div class="sparkle sparkle-dot-two"></div>
<div class="sparkle sparkle-dot-three"></div>
<div class="sparkle sparkle-dot-four"></div>
  `;

const CORRECT_SOUND = 'correct.mp3';
const ERROR_SOUND = 'error.mp3';
const ROUND_STARTS_SOUND = 'round-starts.mp3';

const DELAY_CHECK_HASH = 1000;
const DELAY_PRELOADER_COUNT_DOWN = 1000;
const DELAY_NEXT_WORD = 1000;
const DELAY_HIGHLIGHT = 1000;
const DELAY_MUSIC_OFF = 1000;
const INITIAL_BACKGROUND_POSITION = 100;
const REMOVE_DIGITS_REGEXP = /\d/g;
const INITIAL_CRYSTAL_WIDTH = 30;
const DEFAULT_DISPLAYED_LEVEL = 1;
const START_FLYING_POSITION = 0;
const START_BANG_POSITION = 400;
const FINAL_BANG_POSITION = -100;
const BACKGROUND_MOVE_PX = 5;
const BANG_MOVE_PX = 5;
const MARGIN_PERCENTAGE = 0.33;
const MARGIN_PERCENTAGE_SMALL = 0.33;
const BASE_MARGIN = 250;
const NUMBER_OF_LIVES = 5;
const MOVING_WORD_INTERVAL = 20;

export {
  GAME_LAYOUT,
  PRELOADER,
  LIVES,
  SPARKLES,
  GROUP_ROUND,
  CORRECT_SOUND,
  ERROR_SOUND,
  ROUND_STARTS_SOUND,
  DELAY_CHECK_HASH,
  DELAY_PRELOADER_COUNT_DOWN,
  INITIAL_BACKGROUND_POSITION,
  DELAY_NEXT_WORD,
  DELAY_MUSIC_OFF,
  REMOVE_DIGITS_REGEXP,
  INITIAL_CRYSTAL_WIDTH,
  DEFAULT_DISPLAYED_LEVEL,
  START_FLYING_POSITION,
  START_BANG_POSITION,
  FINAL_BANG_POSITION,
  DELAY_HIGHLIGHT,
  BACKGROUND_MOVE_PX,
  MARGIN_PERCENTAGE,
  MARGIN_PERCENTAGE_SMALL,
  BASE_MARGIN,
  NUMBER_OF_LIVES,
  MOVING_WORD_INTERVAL,
  BANG_MOVE_PX,
};
