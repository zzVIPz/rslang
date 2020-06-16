class Controller {
  constructor(model, view, onEnterClick) {
    this.model = model;
    this.view = view;
    this.onEnterClick = onEnterClick;
    this.buttons = null;
    this.event = null;
    this.pressedButtons = new Set();
    this.textarea = null;
    this.btnCapsLock = null;
  }

  init() {
    this.renderTemplate();
    this.buttons = document.querySelectorAll('.keyboard__btn');
    this.textarea = document.querySelector('.movie__search');
    this.btnCapsLock = document.querySelector('.capslock');
    this.btnChangeLanguage = document.querySelector('.metaleft');
    this.btnSearch = document.querySelector('.enter');
    this.addEventHandlers();
  }

  renderTemplate() {
    document.querySelector('.main').append(this.view.init());
  }

  addEventHandlers() {
    document.addEventListener('keydown', (event) => this.pressKeyDownHandler(event));
    document.addEventListener('keyup', (event) => this.pressKeyUpHandler(event));
    document.addEventListener('mousedown', (event) => this.pressMouseKeyDownHandler(event));
    document.addEventListener('mouseup', (event) => this.pressMouseKeyUpHandler(event));
    this.addButtonKeyboardClickHandler();
    this.addButtonEnterClickHandler();
  }

  addButtonKeyboardClickHandler() {
    this.btnChangeLanguage.addEventListener('click', () => {
      this.setLanguageToLocalStorage();
      this.renderValueOfKeyboardsBtns(localStorage.getItem('language'));
    });
  }

  addButtonEnterClickHandler() {
    this.btnSearch.addEventListener('click', () => {
      // this.onEnterClick();
    });
  }

  pressKeyDownHandler(event) {
    event.preventDefault();
    if (event.code === 'Enter') {
      this.onEnterClick();
      return;
    }
    this.buttons.forEach((node) => {
      const attribute = node.getAttribute('data-btn-code');
      if (this.model.specialBtn.includes(attribute) && attribute === event.code) {
        // this.pressSpecialBtn(event, node, attribute);
      } else if (event.code === attribute) {
        node.classList.add('keyboard__btn-active');
        // this.print(node.textContent);
      }
    });
  }

  pressKeyUpHandler(event) {
    this.pressedButtons.clear();
    this.buttons.forEach((node) => {
      const attribute = node.getAttribute('data-btn-code');
      if (attribute !== 'CapsLock' && !attribute.includes('Shift')) {
        node.classList.remove('keyboard__btn-active');
      }
      if (attribute.includes('Shift') && event.key === 'Shift') {
        node.classList.remove('keyboard__btn-active');
        this.pressBtnShift(event.type);
      }
    });
    // this.setFocus();
  }

  pressMouseKeyDownHandler(event) {
    if (event.target.classList.contains('keyboard__btn')) {
      this.getEmulateKeyboardEvent(event);
      const eventKeyboard = new KeyboardEvent('keydown', this.getEmulateKeyboardEvent(event));
      this.event = eventKeyboard;
      event.target.dispatchEvent(eventKeyboard);
    }
  }

  pressMouseKeyUpHandler() {
    document.removeEventListener('mousemove', this.bindedOnMouseMove);
    if (this.event) {
      this.getEmulateKeyboardEvent(this.event);
      const eventKeyboard = new KeyboardEvent('keyup', this.getEmulateKeyboardEvent(this.event));
      this.event = null;
      this.pressKeyUpHandler(eventKeyboard);
    }
  }

  getEmulateKeyboardEvent(event) {
    const dataCodeAttribute = event.target.dataset.btnCode;
    let dataKeyAttribute = '';
    if (dataCodeAttribute.includes('Left') || dataCodeAttribute.includes('Right')) {
      dataKeyAttribute = this.getCorrectKey(dataCodeAttribute);
    }
    const eventKeyboard = {
      key: dataKeyAttribute,
      code: dataCodeAttribute,
      type: event.type === 'mousedown' ? 'keydown' : 'keyup',
      bubbles: true,
    };
    return eventKeyboard;
  }

  getCorrectKey(attribute) {
    this.correctKey = attribute;
    if (attribute.includes('Left')) {
      this.correctKey = attribute.slice(0, attribute.indexOf('Left'));
    } else {
      this.correctKey = attribute.slice(0, attribute.indexOf('Right'));
    }
    return this.correctKey;
  }

  pressSpecialBtn(event, node, attribute) {
    if (attribute === 'CapsLock') {
      this.pressBtnCapsLock();
    } else if (event.code === attribute) {
      node.classList.add('keyboard__btn-active');
      if (attribute.includes('Shift')) {
        this.pressBtnShift(event.type);
      }
      if (attribute === 'Tab') {
        this.print('\t');
      }
      if (attribute === 'Enter') {
        this.print('\n');
      }
      if (attribute === 'Delete') {
        this.deleteText(true);
      }
      if (attribute === 'Backspace') {
        this.deleteText(false);
      }
      if (attribute === 'ArrowLeft') {
        this.setCaret('left');
      }
      if (attribute === 'ArrowRight') {
        this.setCaret('right');
      }
      if (attribute === 'ArrowUp') {
        this.setCaret('up');
      }
      if (attribute === 'ArrowDown') {
        this.setCaret('down');
      }
      this.changeLanguageHandler(event.key);
    }
  }

  setCaret(direction) {
    const caretPosition = this.textarea.selectionStart;
    if (direction === 'left') {
      if (this.textarea.selectionStart > 0) {
        this.textarea.selectionStart = caretPosition - 1;
        this.textarea.selectionEnd = caretPosition - 1;
      }
    }
    if (direction === 'right') {
      if (this.textarea.selectionStart < this.textarea.value.length) {
        this.textarea.selectionStart = caretPosition + 1;
        this.textarea.selectionEnd = caretPosition + 1;
      }
    }
    if (direction === 'up') {
      this.textarea.selectionStart = 0;
      this.textarea.selectionEnd = 0;
    }
    if (direction === 'down') {
      const lastPosition = this.textarea.value.length;
      this.textarea.selectionStart = lastPosition;
      this.textarea.selectionEnd = lastPosition;
    }
  }

  pressBtnCapsLock() {
    this.btnCapsLock.classList.toggle('keyboard__btn-active');
    const btnKeyLettersList = document.querySelectorAll(
      '.keyboard__btn:not(.keyboard__special-btn)',
    );
    btnKeyLettersList.forEach((node) => {
      const btn = node;
      btn.classList.toggle('keyboard__btn-upper');
      if (btn.classList.contains('keyboard__btn-upper')) {
        btn.innerText = node.innerHTML.toUpperCase();
      } else {
        btn.innerText = node.innerHTML.toLowerCase();
      }
    });
  }

  pressBtnShift(mode) {
    const index = mode === 'keydown' ? 1 : 0;
    const lang = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : this.model.language[0];
    this.renderValueOfKeyboardsBtns(lang, index);
  }

  renderValueOfKeyboardsBtns(lang, index = 0) {
    let i = 0;
    const capslockState = this.btnCapsLock.classList.contains('keyboard__btn-active');
    this.model[lang].forEach((row) => {
      Object.keys(row).forEach((key) => {
        const value = row[key][index];
        if (capslockState && !this.model.specialBtn.includes(key)) {
          this.buttons[i].innerHTML = value ? value.toUpperCase() : key;
        } else {
          this.buttons[i].innerHTML = value || key;
        }
        i += 1;
      });
    });
  }

  changeLanguageHandler(attribute) {
    this.pressedButtons.add(attribute);
    if (
      (this.pressedButtons.has('Control') && this.pressedButtons.has('Alt')) ||
      (this.pressedButtons.has('Shift') && this.pressedButtons.has('Alt')) ||
      (this.pressedButtons.has('Shift') && this.pressedButtons.has('Control'))
    ) {
      this.setLanguageToLocalStorage();
      this.renderValueOfKeyboardsBtns(localStorage.getItem('language'));
    }
  }

  setLanguageToLocalStorage() {
    if (localStorage.getItem('language') === this.model.language[0]) {
      localStorage.setItem('language', this.model.language[1]);
    } else {
      localStorage.setItem('language', this.model.language[0]);
    }
  }

  print(char) {
    let { value } = this.textarea;
    const caretPosition = this.textarea.selectionStart;
    if (caretPosition !== value.length) {
      value = value.slice(0, caretPosition) + char + value.slice(caretPosition, value.length);
      setTimeout(() => {
        this.textarea.selectionStart = caretPosition + 1;
        this.textarea.selectionEnd = caretPosition + 1;
      });
    } else {
      value += char;
    }
    this.updateTextareasValue(value);
  }

  deleteText(mode) {
    let { value } = this.textarea;
    const caretPosition = this.textarea.selectionStart;
    if (mode) {
      value = value.slice(0, caretPosition) + value.slice(caretPosition + 1, value.length);
      this.updateTextareasValue(value);
      this.textarea.selectionStart = caretPosition;
      this.textarea.selectionEnd = caretPosition;
    } else if (caretPosition) {
      value = value.slice(0, caretPosition - 1) + value.slice(caretPosition, value.length);
      this.updateTextareasValue(value);
      this.textarea.selectionStart = caretPosition - 1;
      this.textarea.selectionEnd = caretPosition - 1;
    }
  }

  updateTextareasValue(value) {
    this.textarea.value = value;
  }

  setFocus() {
    this.textarea.focus();
  }
}

export default Controller;
