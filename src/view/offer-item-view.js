import { OfferInfoView } from './offer-info-view.js';
import { AbstractView } from './abstract-view';

const createOfferItemTemplate = (offerTitle, offerPrice) => `<li 
class="event__offer">
  ${new OfferInfoView(offerTitle, offerPrice).template}
</li>`;

class OfferItemView extends AbstractView {
  #offerTitle = null;
  #offerPrice = null;

  constructor(offerTitle, offerPrice) {
    super();
    this.#offerTitle = offerTitle;
    this.#offerPrice = offerPrice;
  }

  get template() {
    return createOfferItemTemplate(this.#offerTitle, this.#offerPrice);
  }

}
export { OfferItemView };
