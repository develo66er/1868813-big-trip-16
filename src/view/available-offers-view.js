import { OfferItemEditView } from './offer-item-edit-view.js';
import { createElement } from '../render-view.js';

class AvailableOffersView {
  #offers = null;
  #element = null;
  #createAvailableOffersTemplate = () => `
  <section class="event__section  event__section--offers">
      <h3 
        class="event__section-title  event__section-title--offers">
          Offers
      </h3>
      <div 
        class="event__available-offers">
  
          ${this.#offers.map((offer) => new OfferItemEditView(offer).template).reduce((prev, next) => `${prev} ${next}`)}
      
      </div>
  </section>
  `;

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
    return this.#createAvailableOffersTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { AvailableOffersView };
