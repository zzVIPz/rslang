import { SHORT_STATISTICS_TEXT } from '../constants/constMainView';

export default function getShortStatisticsTemplate(data, slidesAmount) {
  let text = '';
  let template = '';
  const btnFinishTemplate = `
        <button class="modal-button short-stat__button-finish">
          ${SHORT_STATISTICS_TEXT.btnFinish}
        </button>`;

  if (data) {
    if (slidesAmount) {
      text = `<p class="short-stat__notification-text">
                ${SHORT_STATISTICS_TEXT.targetText.replace(/\{param\}/, slidesAmount)}</p>`;
    }

    template = `
      <div class="short-stat__logo"></div>
      <p class="short-stat__title">${SHORT_STATISTICS_TEXT.targetTitle}</p>
      <div class="short-stat__info short-stat__info_finished">
          <p class="short-stat__text">${SHORT_STATISTICS_TEXT.targetPassedCards}</p>
          <p class="short-stat__data">${data.cardsTotal}</p>
      </div>
      <div class="short-stat__info short-stat__info_correct">
          <p class="short-stat__text">${SHORT_STATISTICS_TEXT.targetPercentage}</p>
          <p class="short-stat__data">${data.percentageCorrectAnswers}</p>
      </div>
      <div class="short-stat__info short-stat__info_new">
          <p class="short-stat__text">${SHORT_STATISTICS_TEXT.targetNewWords}</p>
          <p class="short-stat__data">${data.newWordsAmount}</p>
      </div>
      <div class="short-stat__info short-stat__info_series">
          <p class="short-stat__text">${SHORT_STATISTICS_TEXT.targetSuccessSeries}</p>
          <p class="short-stat__data">${data.correctAnswersSeries}</p>
      </div>
      ${slidesAmount ? text : ''}
      <div class="short-stat__buttons-block">
        <button class="modal-button short-stat__button-continue
          ${slidesAmount ? '' : 'hidden'}">
           ${SHORT_STATISTICS_TEXT.btnContinue}
        </button>
        ${btnFinishTemplate}
      </div>  `;
  } else {
    template = `
      <p class="short-stat__title">${SHORT_STATISTICS_TEXT.additionalTitle}</p>
      <div class="short-stat__logo-medal"></div>
      <div class="short-stat__buttons-block">
        ${btnFinishTemplate}
      </div>
     `;
  }

  return `<div class="short-stat__container modal">${template}</div>`;
}
