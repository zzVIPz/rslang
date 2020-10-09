export default function getModalErrorTemplate(title, description) {
  return `
  <div class="animate__animated animate__headShake modal">
    <div class="modal__button-close"></div>
    <p class="modal__title">${title}</p>
    <p class="modal__description">${description}</p>
  </div>`;
}
