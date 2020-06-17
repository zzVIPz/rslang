const savannahGame = `
<div id="app">
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
    <div class="app__footer"></div>
  </div>`;

export default savannahGame;
