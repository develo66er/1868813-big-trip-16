import { OfferItemEditView } from './offer-item-edit-view.js';
import {AbstractView} from './abstract-view';

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

class AvailableOffersView extends AbstractView{
  #offers = null;

  constructor(offers) {
    super();
    this.#offers = offers;
  }

  get template() {
    return createAvailableOffersTemplate(this.#offers);
  }

}
export { AvailableOffersView };
