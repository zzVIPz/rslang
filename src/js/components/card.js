import getCardTemplate from '../utils/getCardTemplate';

export default class Card {
  constructor(card, settings) {
    this.card = card;
    this.settings = settings;
    this.template = getCardTemplate(this.card, this.settings);
  }

  renderTemplate = () => this.template;
}
