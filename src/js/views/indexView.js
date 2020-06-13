class IndexView {
  constructor() {
    this.loginMessage = document.querySelector('.form__login-message');
    this.formButton = document.querySelector('.form__button');
    this.name = document.querySelector('.user-name');
  }

  setText(data) {
    this.name.classList.toggle('user-name--active');
    this.formButton.setAttribute('value', data[2]);
    const template = `${data[0]}<span class="form__login-selection">${data[1]}</span>`;
    this.loginMessage.innerHTML = template;
  }
}

export default IndexView;
