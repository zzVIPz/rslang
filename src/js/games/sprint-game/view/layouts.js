const startLayout = `<div class="sprint-main-wrapper">
<div class="closeBtn"></div>
<div class="sprint-container">

<div class="rating__container sprint-rating">
<div class="rating__row  rating__group_sprint">
    <label class="group star" id="0"></label>
    <label class="group star" id="1"></label>
    <label class="group star" id="2"></label>
    <label class="group star" id="3"></label>
    <label class="group star" id="4"></label>
    <label class="group star" id="5"></label>
  </div>
  <div class="text text_sprint">Уровень сложности</div>
  <div class="rating__row  rating__round_sprint">
    <label class="round star" id="0"></label>
    <label class="round star" id="1"></label>
    <label class="round star" id="2"></label>
    <label class="round star" id="3"></label>
    <label class="round star" id="4"></label>
    <label class="round star" id="5"></label>
  </div>
   <div class="text text_sprint text_sprint_round">Раунд</div>
  </div>

<div class="sprint-start-header">Спринт</div>
<div class="sprint-notice">
  <div class="sprint-game-descr"></div>
  <div class="sprint-user-advice">Используй клавиши &#9668; &#9658; для быстрого ответа</div>
</div>
<div class="sprint-start-controls">
  <button class="sprint-button sprint-button--start app__button">Начать</button>
</div>
</div>`;

const gameLayout = `<div class="sprint-main-wrapper">
<div class="closeBtn"></div>
<div class="sprint-container sprint-container--true">
<div class="sprint-header">
<div class="sprint-header-layer">
  <div class="sprint-score"></div>
  <div class="sprint-marks-line">
    <div class="sprint-mark">&#9733;</div>
    <div class="sprint-mark">&#9733;</div>
    <div class="sprint-mark">&#9733;</div>
  </div>
  <div class="sprint-points-line">
    +40 очков за слово
  </div>
  <div class="sprint-timer">60</div>
</div>
</div>
<div class="sprint-picture-block">
<img class="sprint-picture bat0" src="../src/assets/images/bat0.png">
<img class="sprint-picture bat1" src="../src/assets/images/bat1.png">
<img class="sprint-picture bat2" src="../src/assets/images/bat2.png">
<img class="sprint-picture bat3" src="../src/assets/images/bat3.png">
</div>
<div class="sprint-display">
  <div id="word" class="sprint-word">no words available</div>
  <div id="translation" class="sprint-word sprint-word--translation">нет доступных слов</div>
</div>
<div class="sprint-controls">
  <button id="wrong" class="sprint-button sprint-button--wrong">неверно</button>
  <button id="right" class="sprint-button sprint-button--right">верно</button>
</div>
</div>
</div>`;

const finalStatLayout = `<div class="sprint-main-wrapper">
<div class="closeBtn"></div>
<div class="sprint-container">
<div class="sprint-result-header ">Ваш результат</div>
<div class="sprint-final-score">Упс...</div>
<div class="sprint-statistics">
    <div class="sprint-user-mistakes"></div>
</div>
<div class="sprint-result-controls">
  <button class="sprint-button sprint-button--repeat app__button">повторить</button>
</div>
</div>
</div>`;

const closeModal = `<div class="app__modal">
<div class="app__modal__box">
  <div class="app__modal__box_title">Тренировка не закончена!</div>
  <div class="app__modal__box_text">Если вы вернетесь к списку, ваши результаты не будут сохранены</div>
  <div class="app__button app__button_close">Закрыть</div>
  <div class="app__modal__box_cancel">Отмена</div>
</div>
</div>`;

export {
  startLayout, gameLayout, finalStatLayout, closeModal,
};
