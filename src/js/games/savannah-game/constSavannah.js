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
<div class="preloader__conatiner"> 
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

const SOUND_URL = 'https://raw.githubusercontent.com/staceysych/rslang-data/master/';
const CORRECT_SOUND = 'correct.mp3';
const ERROR_SOUND = 'error.mp3';
const ROUND_STARTS_SOUND = 'round-starts.mp3';

const DELAY = 1000;
const INITIAL_BACKGROUND_POSITIONY = 100;
const REMOVE_DIGITS_REGEXP = /\d/g;
const INITIAL_CRISTAL_WIDTH = 30;
const DEFAULT_DISPLAYED_LEVEL = 1;
const SAVANNAH_HASH_REGEXP = /#savannah/;
const START_FLYING_POSITION = 0;
const START_BANG_POSITION = 400;
const FINAL_BANG_POSITION = -100;
const BACKGROUND_MOVE_PX = 5;
const MARGIN_PERCENTAGE = 0.3;
const MARGIN_DEADLINE_COEFICIENT = 1.2;
const BASE_MARGIN = 250;

export {
  GAME_LAYOUT,
  PRELOADER,
  LIVES,
  SPARKLES,
  GROUP_ROUND,
  SOUND_URL,
  CORRECT_SOUND,
  ERROR_SOUND,
  ROUND_STARTS_SOUND,
  DELAY,
  INITIAL_BACKGROUND_POSITIONY,
  REMOVE_DIGITS_REGEXP,
  INITIAL_CRISTAL_WIDTH,
  DEFAULT_DISPLAYED_LEVEL,
  SAVANNAH_HASH_REGEXP,
  START_FLYING_POSITION,
  START_BANG_POSITION,
  FINAL_BANG_POSITION,
  BACKGROUND_MOVE_PX,
  MARGIN_PERCENTAGE,
  MARGIN_DEADLINE_COEFICIENT,
  BASE_MARGIN,
};
