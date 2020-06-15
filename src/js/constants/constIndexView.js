const CONST_INDEX_VIEW = {
  mode: {
    logIn: 'logIn',
    signUp: 'signUp',
  },
  existingUserText: ['Do have an account?', 'Log In', 'Sign Up'],
  newUserText: ["Don't have an account?", 'Sign Up', 'Log In'],
  getModalTemplate: (title, description) => `<div class="modal">
      <div class="modal__button-close"></div>
      <p class="modal__title">${title}</p>
      <p class="modal__description">${description}</p>
    </div>;`,
  getLoginFormTemplate: (message, btnText) => `${message}<span class="form__login-selection">${btnText}</span>`,
};

export default CONST_INDEX_VIEW;
