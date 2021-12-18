import { OfferInfoView } from './offer-info-view.js';
import {AbstractView} from './abstract-view';

const createOfferItemEditTemplate = (offer) => {

  const offerChunks = offer.title.split(' ');

  const offerName = offerChunks[offerChunks.length - 1];

  return `
        <div 
          class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offerName}-${offer.id}" 
            type="checkbox"
            name="event-offer-${offerName}">

          <label 
            class="event__offer-label" 
            for="event-offer-${offerName}-${offer.id}">
              ${new OfferInfoView(offer.title, offer.price).template}
          </label>

        </div>
      `;
};


class OfferItemEditView extends AbstractView{
  #offer = null;

  constructor(offer) {
    super();
    this.#offer = offer;
  }

  get template() {
    return createOfferItemEditTemplate(this.#offer);
  }

}
export { OfferItemEditView };
