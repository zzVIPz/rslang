export default function getNotificationTemplate(cardsAmount) {
  // todo: here need implement temlate
  let template = '';
  if (cardsAmount) {
    template = ` You have only ${cardsAmount} card(s) to repeat `;
  } else {
    template = 'You have no cards to repeat!';
  }
  return template;
}
