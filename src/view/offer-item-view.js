import { OfferInfoView } from './offer-info-view.js';
import { createElement } from '../render-view.js';

const createOfferItemTemplate = (offerTitle, offerPrice) => `<li 
class="event__offer">
  ${new OfferInfoView(offerTitle, offerPrice).template}
</li>`;

class OfferItemView {
  #offerTitle = null;
  #offerPrice = null;
  #element = null;

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
    return createOfferItemTemplate(this.#offerTitle, this.#offerPrice);
  }

  removeElement() {
    this.#element = null;
  }
}
export { OfferItemView };
