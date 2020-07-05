export default function getNotificationTemplate(cardsAmount) {
  let template = '';
  if (cardsAmount) {
    template = `<div class="notification-modal">
    <div class="notification-modal__title">
    У Вас только ${cardsAmount} карточек для повторения</div>
    <div class="app__button app__button_close">OK</div>
    </div>`;
  } else {
    template = `<div class="notification-modal">
    <div class="notification-modal__title">
    У Вас нет карточек для повторения</div>
    <div class="app__button app__button_close">OK</div>
    </div>`;
  }
  return template;
}
