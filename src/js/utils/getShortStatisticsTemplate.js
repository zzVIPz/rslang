import { SHORT_STATISTICS_TEXT } from '../constants/constMainView';

export default function getShortStatisticsTemplate({
  cardsTotal,
  percentageCorrectAnswers,
  newWordsAmount,
  correctAnswersSeries,
}) {
  const template = `<div class="short-stat__container">
  <div class="short-stat__logo"></div>
  <div class="short-stat__title">${SHORT_STATISTICS_TEXT.targetTitle}</div>
  <div class="short-stat__info short-stat__info_finished">
      <div class="short-stat__text">${SHORT_STATISTICS_TEXT.targetPassedCards}</div>
      <div class="short-stat__data">${cardsTotal}</div>
  </div>
  <div class="short-stat__info short-stat__info_correct">
      <div class="short-stat__text">${SHORT_STATISTICS_TEXT.targetPercentage}</div>
      <div class="short-stat__data">${percentageCorrectAnswers}</div>
  </div>
  <div class="short-stat__info short-stat__info_new">
      <div class="short-stat__text">${SHORT_STATISTICS_TEXT.targetNewWords}</div>
      <div class="short-stat__data">${newWordsAmount}</div>
  </div>
  <div class="short-stat__info short-stat__info_series">
      <div class="short-stat__text">${SHORT_STATISTICS_TEXT.targetSuccessSeries}</div>
      <div class="short-stat__data">${correctAnswersSeries}</div>
  </div>
  <div class="short-stat__buttons-block">
    <button class="short-stat__button">${SHORT_STATISTICS_TEXT.btnContinue}</button>
    <button class="short-stat__button">${SHORT_STATISTICS_TEXT.btnFinish}</button>
  </div>

</>`;

  return template;
}
