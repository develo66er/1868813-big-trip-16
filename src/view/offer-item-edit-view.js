import { OfferInfoView } from './offer-info-view.js';
import { createElement } from '../render-view.js';

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


class OfferItemEditView {
  #element = null;
  #offer = null;

  constructor(offer) {
    this.#offer = offer;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createOfferItemEditTemplate(this.#offer);
  }

  removeElement() {
    this.#element = null;
  }
}
export { OfferItemEditView };
