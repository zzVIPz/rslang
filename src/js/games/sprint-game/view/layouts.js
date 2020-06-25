const startLayout = `<div class="sprint-container">
<div class="sprint-start-header">Спринт</div>
<div class="sprint-notice">
  <div class="sprint-game-descr"></div>
  <div class="sprint-user-advice">Используй клваиши &#9668; &#9658; для быстрого ответа</div>
</div>
<div class="sprint-start-controlls">
  <button class="sprint-button sprint-button--start app__button">Начать</button>
</div>`;

const gameLayout = ` <div class="sprint-container sprint-container--true">
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
<div class="sprint-controlls">
  <button id="wrong" class="sprint-button sprint-button--wrong">&#9668; неверно</button>
  <button id="right" class="sprint-button sprint-button--right">верно &#9658;</button>
</div>
</div>`;

const finalStatLayout = `  <div class="sprint-container">
<div class="sprint-result-header ">Ваш результат</div>
<div class="sprint-final-score">упс...</div>
<div class="sprint-statistics">
    <div class="sprint-user-mistakes"></div>
</div>
<div class="sprint-result-controlls">
  <button class="sprint-button sprint-button--repeate app__button">повторить</button>
</div>
</div>`;
const closeBtn = `<div class="closeBtn"></div>`
export { startLayout, gameLayout, finalStatLayout, closeBtn };
