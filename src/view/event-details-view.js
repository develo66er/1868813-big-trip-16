import { AvailableOffersView } from './available-offers-view.js';
import { DestinationView } from './destination-view.js';
import { AbstractView } from './abstract-view';

const createEventDetailsTemplate = (point) => `<section
class="event__details">

${point.offers && point.offers.offers && point.offers.offers.length > 0 ? new AvailableOffersView(point.offers.offers).template : ''}

${point.destination ? new DestinationView(point.destination).template : ''}

</section>`;

class EventDetailsView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventDetailsTemplate(this.#point);
  }

}
export { EventDetailsView };

