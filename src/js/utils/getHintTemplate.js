export default function getHintTemplate(answer, correctAnswer) {
  const formattedAnswer = answer.toLowerCase();
  const formattedCorrectAnswer = correctAnswer.toLowerCase();
  let mistakesCounter = 0;
  let template = '';
  [...formattedCorrectAnswer].forEach((letter, i) => {
    if (formattedAnswer[i] !== formattedCorrectAnswer[i]) {
      template += `<span class="card__letter {mistake}">${correctAnswer[i]}</span>`;
      mistakesCounter += 1;
    } else {
      template += `<span class="card__letter">${correctAnswer[i]}</span>`;
    }
  });
  const className = correctAnswer.length / 2 > mistakesCounter ? 'card__incorrect-low' : 'card__incorrect-heavy';
  const formattedTemplate = template.replace(/\{mistake\}/g, className);

  return `<div class="card__hint-container">${formattedTemplate}</div>`;
}
