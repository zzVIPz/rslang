import data from './Model';

class View {
  init() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard__container');
    this.container.append(this.createKeyboardLayout());
    return this.container;
  }

  createKeyboardLayout() {
    const lang = localStorage.getItem('language') || data.language[0];
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    data[lang].forEach((row) => {
      const line = document.createElement('div');
      line.classList.add('keyboard__line');
      Object.keys(row).forEach((key) => {
        const button = document.createElement('button');
        button.classList.add('keyboard__btn');
        button.setAttribute('data-btn-code', key);
        if (data.specialBtn.includes(key)) {
          button.classList.add('keyboard__special-btn', `${key.toLowerCase()}`);
        }
        button.innerHTML = row[key][0] ? row[key][0] : key;
        line.append(button);
      });
      this.keyboard.append(line);
    });

    return this.keyboard;
  }
}

export default View;
