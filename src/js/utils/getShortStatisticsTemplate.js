export default function getShortStatisticsTemplate({
  cardsTotal,
  percentageCorrectAnswers,
  newWordsAmount,
  correctAnswersSeries,
}) {
  const template = `<div class="short-stat-container">
  <div class="short-stat__logo"></div>
  <div class="short-stat__title">Серия завершена</div>
  <div class="short-stat__info short-stat__info_finished">
      <div class="short-stat__text">Карточек завершено:</div>
      <div class="short-stat__data">${cardsTotal}</div>
  </div>
  <div class="short-stat__info short-stat__info_correct">
      <div class="short-stat__text">Правильные ответы:</div>
      <div class="short-stat__data">${percentageCorrectAnswers}</div>
  </div>
  <div class="short-stat__info short-stat__info_new">
      <div class="short-stat__text">Новые слова:</div>
      <div class="short-stat__data">${newWordsAmount}</div>
  </div>
  <div class="short-stat__info short-stat__info_series">
      <div class="short-stat__text">Самая длинная серия правильных ответов:</div>
      <div class="short-stat__data">${correctAnswersSeries}</div>
  </div>
  <button class="short-stat__button">Продолжить</button>
</div>`;

  return template;
}
