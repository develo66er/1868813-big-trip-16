import { createElement } from '../render-view.js';

class OfferInfoView {
  #element = null;
  #offerTitle = null;
  #offerPrice = null;
  #createOfferInfoTemplate = () => `<span 
class="event__offer-title">
  ${this.#offerTitle}
</span>
  &plus;&euro;&nbsp;
<span 
class="event__offer-price">
  ${this.#offerPrice}
</span>`;

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
    return this.#createOfferInfoTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export { OfferInfoView };
