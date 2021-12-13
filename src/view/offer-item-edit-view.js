import { OfferInfoView } from './offer-info-view.js';
import { createElement } from '../render-view.js';

class OfferItemEditView {
  #element = null;
  #offer = null;
  #createOfferItemEditTemplate = () => {

    const offerChunks = this.#offer.title.split(' ');

    const offerName = offerChunks[offerChunks.length - 1];

    return `
          <div 
            class="event__offer-selector">
            <input 
              class="event__offer-checkbox  visually-hidden" 
              id="event-offer-${offerName}-${this.#offer.id}" 
              type="checkbox"
              name="event-offer-${offerName}">
  
            <label 
              class="event__offer-label" 
              for="event-offer-${offerName}-${this.#offer.id}">
                ${new OfferInfoView(this.#offer.title, this.#offer.price).template}
            </label>
  
          </div>
        `;
  };

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
    return this.#createOfferItemEditTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { OfferItemEditView };
