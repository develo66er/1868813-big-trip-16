import { DestinationImageView } from './destination-image-view.js';
import { createElement } from '../render-view.js';

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

class DestinationView {
  #destination = null;
  #element = null;

  constructor(destination) {
    this.#destination = destination;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createDestinationTemplate(this.#destination);
  }

  removeElement() {
    this.#element = null;
  }
}
export { DestinationView };
