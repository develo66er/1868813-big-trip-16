import { DestinationImageView } from './destination-image-view.js';
import { AbstractView } from './abstract-view';

const createDestinationTemplate = (destination) => `<section 
class="event__section  event__section--destination">
<h3 
  class="event__section-title  event__section-title--destination">
  ${destination.name}
</h3>
              
<p
 class="event__destination-description">
   ${destination.description}
</p>
        
 ${(destination.pictures && destination.pictures.length > 0) ? new DestinationImageView(destination.pictures).template : ''}
              
</section>`;

class DestinationView extends AbstractView {
  #destination = null;

  constructor(destination) {
    super();
    this.#destination = destination;
  }

  get template() {
    return createDestinationTemplate(this.#destination);
  }

}
export { DestinationView };
