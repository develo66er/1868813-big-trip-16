import { AvailableOffersView } from './available-offers-view.js';
import { DestinationView } from './destination-view.js';
import { AbstractView } from './abstract-view';

const createEventDetailsTemplate = (props) => {
  const {offers,destination} = props;
  return `<section
class="event__details">

${offers ? new AvailableOffersView(offers).template : ''}

${destination ? new DestinationView(destination).template : ''}

</section>`;
};

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

