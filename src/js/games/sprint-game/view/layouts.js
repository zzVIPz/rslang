const startLayout = `<div class="sprint-container">
<h2 class="sprint-start-header">Спринт</h2>
<div class="sprint-notice">
  <p class="sprint-game-descr">За 1 минуту укажи принадлежит ли данный перевод этому слову</p>
  <p class="sprint-user-advice">Используйте клваиши &#9668; &#9658; для быстрого ответа</p>
</div>
<div class="sprint-start-controlls">
  <button class="sprint-button sprint-button--start">Начать</button>
</div>`;

const gameLayout = ` <div class="sprint-container">
<div class="sprint-header">
  <div class="sprint-score">1243</div>
  <div class="sprint-marks-line">
    <div class="sprint-mark"></div>
    <div class="sprint-mark"></div>
    <div class="sprint-mark"></div>
  </div>
  <div class="sprint-points-line">
    <span>+40</span> очков за слово
  </div>
  <div class="sprint-timer">--</div>
</div>
<div class="sprint-picture-block"></div>
<div class="sprint-display">
  <div class="sprint-word">word</div>
  <div class="sprint-word sprint-word--translation">слово</div>
</div>
<div class="sprint-controlls">
  <button id="wrong" class="sprint-button sprint-button--wrong">неверно</button>
  <button id="right" class="sprint-button sprint-button--right">верно</button>
</div>
</div>`;
const finalStatLayout = `  <div class="sprint-container">
<h2 class="sprint-result-header">Ваш результат</h2>
<div class="sprint-statistics">
  <p class="sprint-final-score">1243 очков</p>
  <p class="sprint-user-record">Ваш рекорд: 5555 очков</p>
</div>
<div class="sprint-result-controlls">
  <button class="sprint-button sprint-button--exit">&larr;</button>
  <button class="sprint-button sprint-button--repeate">повторить тренеровку</button>
</div>
</div>`;
export { startLayout, gameLayout, finalStatLayout };
