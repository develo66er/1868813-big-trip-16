import { AvailableOffersView } from './available-offers-view.js';
import { DestinationView } from './destination-view.js';
import { createElement } from '../render-view.js';

const createEventDetailsTemplate = (point) => `<section
class="event__details">

${point.offers && point.offers.offers && point.offers.offers.length > 0 ? new AvailableOffersView(point.offers.offers).template : ''}

${point.destination ? new DestinationView(point.destination).template : ''}

</section>`;

class EventDetailsView {
  #element = null;
  #point = null;

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
    return createEventDetailsTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
export { EventDetailsView };

