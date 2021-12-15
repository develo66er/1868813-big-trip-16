import { OfferItemEditView } from './offer-item-edit-view.js';
import { createElement } from '../render-view.js';

const createAvailableOffersTemplate = (offers) => `
<section class="event__section  event__section--offers">
    <h3 
      class="event__section-title  event__section-title--offers">
        Offers
    </h3>
    <div 
      class="event__available-offers">

        ${offers.map((offer) => new OfferItemEditView(offer).template).reduce((prev, next) => `${prev} ${next}`)}
    
    </div>
</section>
`;

class AvailableOffersView {
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
    return createAvailableOffersTemplate(this.#offers);
  }

  removeElement() {
    this.#element = null;
  }
}
export { AvailableOffersView };
