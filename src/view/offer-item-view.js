import { OfferInfoView } from './offer-info-view.js';
import { createElement } from '../render-view.js';

class OfferItemView {
  #offerTitle = null;
  #offerPrice = null;
  #element = null;
  #createOfferItemTemplate = () => `<li 
    class="event__offer">
      ${new OfferInfoView(this.#offerTitle, this.#offerPrice).template}
  </li>`;

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
    return this.#createOfferItemTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { OfferItemView };
