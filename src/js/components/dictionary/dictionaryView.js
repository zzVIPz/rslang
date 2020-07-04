import templateControls from './templateControls';

export default class DictionaryController {
  constructor() {
    this.templateControls = templateControls;
  }

  render() {
    document.querySelector('.main').innerHTML = this.templateControls;
  }
}
