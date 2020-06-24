const savannahGame = `
<div class="app">
    <div class="app__header">
      <a href="#" class="close"></a>
    </div>
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

const groupRound = `
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

const preloader = `
<div class="preloader__conatiner"> 
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

const lives = `
<span id="life-1">❤</span>
<span id="life-2">❤</span>
<span id="life-3">❤</span>
<span id="life-4">❤</span>
<span id="life-5">❤</span>
`;

const sparkles = `
<div class="sparkle sparkle-circle-one"></div>
<div class="sparkle sparkle-circle-two"></div>
<div class="sparkle sparkle-circle-three"></div>
<div class="sparkle sparkle-circle-four"></div>
<div class="sparkle sparkle-dot-one"></div>
<div class="sparkle sparkle-dot-two"></div>
<div class="sparkle sparkle-dot-three"></div>
<div class="sparkle sparkle-dot-four"></div>
  `;

const statisticsModalLayout = `
  <div class="statistics__title"></div>
  <div class="statistics__words-set"></div>
  <div class="statistics__words-set"></div>
  <div class="statistics__continue">Продолжить тренировку</div>
  <div class="statistics__back">Вернуться к списку тренировок</div>
`;

export {
  savannahGame, preloader, lives, sparkles, groupRound, statisticsModalLayout,
};
