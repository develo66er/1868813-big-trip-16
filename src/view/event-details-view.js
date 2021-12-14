import { AvailableOffersView } from './available-offers-view.js';
import { DestinationView } from './destination-view.js';
import { createElement } from '../render-view.js';

class EventDetailsView {
  #element = null;
  #point = null;
  #createEventDetailsTemplate = () => `<section
      class="event__details">

      ${this.#point.offers && this.#point.offers.offers && this.#point.offers.offers.length > 0 ? new AvailableOffersView(this.#point.offers.offers).template : ''}

      ${this.#point.destination ? new DestinationView(this.#point.destination).template : ''}

  </section>`;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return this.#createEventDetailsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { EventDetailsView };

