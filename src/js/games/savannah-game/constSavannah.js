const savannahGame = `
<div class="app">
    <div class="app__header">
      <a href="#" class="close"></a>
    </div>
    <div class="app__rating">
      <div class="rating">
        <input class="rating__input" type="radio" id="star1" name="star"/>
        <label class="rating__label" for="star1" title="text"></label>
        <input class="rating__input" type="radio" id="star2" name="star"/>
        <label class="rating__label" for="star2" title="text"></label>
        <input class="rating__input" type="radio" id="star3" name="star"/>
        <label class="rating__label" for="star3" title="text"></label>
        <input class="rating__input" type="radio" id="star4" name="star"/>
        <label class="rating__label" for="star4" title="text"></label>
        <input class="rating__input" type="radio" id="star5" name="star"/>
        <label class="rating__label" for="star5" title="text"></label>
        <input class="rating__input" type="radio" id="star6" name="star"/>
        <label class="rating__label" for="star6" title="text"></label>
      </div>
      <div class="rating__text">
        Уровень сложности
      </div>
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

const translations = `
<span id="tranlastion-1">1 Любовь</span>
<span id="tranlastion-2">2 Работа</span>
<span id="tranlastion-3">3 Жизнь</span>
<span id="tranlastion-4">4 Еда</span>
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

export {
  savannahGame, preloader, lives, translations, sparkles,
};
