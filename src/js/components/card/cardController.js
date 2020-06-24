import getCardTemplate from '../../utils/getCardTemplate';
import CardView from './cardView';

export default class Card {
  constructor(card, settings) {
    this.card = card;
    this.settings = settings;
    this.cardView = new CardView();
    this.template = getCardTemplate(this.card, this.settings);
  }

  renderTemplate = () => this.template;
}
