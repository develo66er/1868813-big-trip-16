import {AbstractView} from './abstract-view';

const createOfferInfoTemplate = (offerTitle, offerPrice) => `<span 
  class="event__offer-title">
    ${offerTitle}
  </span>
    &plus;&euro;&nbsp;
  <span 
  class="event__offer-price">
    ${offerPrice}
  </span>`;

class OfferInfoView extends AbstractView{
  #offerTitle = null;
  #offerPrice = null;

  constructor(offerTitle, offerPrice) {
    super();
    this.#offerTitle = offerTitle;
    this.#offerPrice = offerPrice;
  }

  get template() {
    return createOfferInfoTemplate(this.#offerTitle, this.#offerPrice);
  }

}

export { OfferInfoView };
