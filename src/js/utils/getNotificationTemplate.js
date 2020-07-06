import { NOTIFICATION_TEXT } from '../constants/constMainView';

const getText = (user, cardsAmount) => {
  if (cardsAmount) {
    return `Dear <span class="username">${user}</span>, you have only ${cardsAmount} card(s) to repeat`;
  }

  return `Dear <span class="username">${user}</span>, you have no cards to repeat`;
};

export default function getNotificationTemplate(user, cardsAmount) {
  return `
  <div class="notification-modal">
    <p class="notification-modal__title">
      ${getText(user, cardsAmount)}
    </p>
    <div class="short-stat__button">${NOTIFICATION_TEXT.btnAccept}</div>
  </div>`;
}
