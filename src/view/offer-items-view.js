import { OfferItemView } from './offer-item-view';
import { createElement } from '../render-view.js';

const createOfferItemsTemplate = (offers) => `
<h4 
  class="visually-hidden">
    Offers:
</h4>
<ul 
  class="event__selected-offers">
    ${offers.map((offer) => new OfferItemView(offer.title, offer.price).template).reduce((prev, next) => `${prev} ${next}`)}
</ul>`;

class OfferItemsView {
  #offers = null;
  #element = null;

  constructor(offers) {
    this.#offers = offers;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createOfferItemsTemplate(this.#offers);
  }

  removeElement() {
    this.#element = null;
  }
}
export { OfferItemsView };
