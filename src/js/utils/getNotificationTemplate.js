import { NOTIFICATION_TEXT, SETTING_MODAL_TEXT } from '../constants/constMainView';

const getText = ({ username, studyMode }, cardsAmount) => {
  let text = NOTIFICATION_TEXT.repeat;
  if (studyMode === SETTING_MODAL_TEXT.studySelect.difficult) {
    text = NOTIFICATION_TEXT.difficult;
  }
  if (cardsAmount) {
    return `Dear <span class="username">${username}</span>, you have only ${cardsAmount} card(s) ${text}`;
  }

  return `Dear <span class="username">${username}</span>, you have no cards ${text}`;
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
