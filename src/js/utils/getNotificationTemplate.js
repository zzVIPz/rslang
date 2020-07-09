import { NOTIFICATION_TEXT } from '../constants/constMainView';

const getText = ({ username }, cardsAmount) => {
  if (cardsAmount) {
    return `Dear <span class="username">${username}</span>, you have only ${cardsAmount} card(s) to repeat`;
  }

  return `Dear <span class="username">${username}</span>, you have no cards to repeat`;
};

export default function getNotificationTemplate(user, cardsAmount) {
  return `
  <div class="notification-modal modal">
    <div class="notification-modal__logo logo-modal"></div>
    <p class="notification-modal__title">
      ${getText(user, cardsAmount)}
    </p>
    <button class="modal-button">${NOTIFICATION_TEXT.btnAccept}</button>
  </div>`;
}
