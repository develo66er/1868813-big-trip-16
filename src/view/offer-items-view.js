import { OfferItemView } from './offer-item-view';
import { AbstractView } from './abstract-view';

const createOfferItemsTemplate = (offers) => `
<h4 
  class="visually-hidden">
    Offers:
</h4>
<ul 
  class="event__selected-offers">
    ${offers.map((offer) => new OfferItemView(offer.title, offer.price).template).reduce((prev, next) => `${prev} ${next}`)}
</ul>`;

class OfferItemsView extends AbstractView {
  #offers = null;

  constructor(offers) {
    super();
    this.#offers = offers;
  }

  get template() {
    return createOfferItemsTemplate(this.#offers);
  }

}
export { OfferItemsView };
