import { createElement } from '../render-view.js';

const createOfferInfoTemplate = (offerTitle, offerPrice) => `<span 
  class="event__offer-title">
    ${offerTitle}
  </span>
    &plus;&euro;&nbsp;
  <span 
  class="event__offer-price">
    ${offerPrice}
  </span>`;

class OfferInfoView {
  #element = null;
  #offerTitle = null;
  #offerPrice = null;

  constructor(offerTitle, offerPrice) {
    this.#offerTitle = offerTitle;
    this.#offerPrice = offerPrice;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createOfferInfoTemplate(this.#offerTitle, this.#offerPrice);
  }

  removeElement() {
    this.#element = null;
  }
}

export { OfferInfoView };
