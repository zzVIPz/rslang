export default function getShortStatisticsTemplate({
  cardsTotal,
  percentageCorrectAnswers,
  newWordsAmount,
  correctAnswersSeries,
}) {
  // todo: here need implement temlate
  const template = `
  <p>${cardsTotal}</p>
  <p>${percentageCorrectAnswers}</p>
  <p>${newWordsAmount}</p>
  <p>${correctAnswersSeries}</p>
  `;
  console.log(template);

  return template;
}
