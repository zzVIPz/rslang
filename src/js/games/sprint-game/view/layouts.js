const startLayout = `<div class="sprint-container">
<h2 class="sprint-start-header app__content__title">Спринт</h2>
<div class="sprint-notice">
  <p class="sprint-game-descr">За 1 минуту укажи принадлежит ли данный перевод этому слову</p>
  <p class="sprint-user-advice">Используйте клваиши &#9668; &#9658; для быстрого ответа</p>
</div>
<div class="sprint-start-controlls">
  <button class="sprint-button sprint-button--start app__button">Начать</button>
</div>`;

const gameLayout = ` <div class="sprint-container">
<div class="sprint-header">
<div class="sprint-header-layer">
  <div class="sprint-score">***</div>
  <div class="sprint-marks-line">
    <div class="sprint-mark">&#9733;</div>
    <div class="sprint-mark">&#9733;</div>
    <div class="sprint-mark">&#9733;</div>
  </div>
  <div class="sprint-points-line">
    +40 очков за слово
  </div>
  <div class="sprint-timer">--</div>
</div>
</div>
<div class="sprint-picture-block"></div>
<div class="sprint-display">
  <div id="word" class="sprint-word">no words available</div>
  <div id="translation" class="sprint-word sprint-word--translation">нет доступных слов</div>
</div>
<div class="sprint-controlls">
  <button id="wrong" class="sprint-button sprint-button--wrong">&#9668; неверно</button>
  <button id="right" class="sprint-button sprint-button--right">верно &#9658;</button>
</div>
</div>`;

const finalStatLayout = `  <div class="sprint-container">
<h2 class="sprint-result-header">Ваш результат</h2>
<div class="sprint-statistics">
  <p class="sprint-final-score">1243 очков</p>
  <p class="sprint-user-mistakes">---</p>
  <div class="sprint-mistaken-words">---</div>
</div>
<div class="sprint-result-controlls">
  <button class="sprint-button sprint-button--exit">&larr;</button>
  <button class="sprint-button sprint-button--repeate app__button">повторить тренеровку</button>
</div>
</div>`;
export { startLayout, gameLayout, finalStatLayout };
