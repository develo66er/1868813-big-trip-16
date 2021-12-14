import { DestinationImageView } from './destination-image-view.js';
import { createElement } from '../render-view.js';

class DestinationView {
  #destination = null;
  #element = null;
  #createDestinationTemplate = () => `<section 
    class="event__section  event__section--destination">
    <h3 
      class="event__section-title  event__section-title--destination">
      ${this.#destination.name}
    </h3>
                  
    <p
     class="event__destination-description">
       ${this.#destination.description}
    </p>
            
     ${(this.#destination.pictures && this.#destination.pictures.length > 0) ? new DestinationImageView(this.#destination.pictures).template : ''}
                  
  </section>`;

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
    return this.#createDestinationTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { DestinationView };
