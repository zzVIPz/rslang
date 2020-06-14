const INDEX_MODEL = {
  existingUserText: ['Do have an account?', 'Log In', 'Sign Up'],
  newUserText: ["Don't have an account?", 'Sign Up', 'Log In'],
  modal: `
  <div class="modal">
    <div class="modal__button-close"></div>
    <p class="modal__title">{title}</p>
    <p class="modal__description">{description}</p>
  </div>`,
};

export default INDEX_MODEL;
