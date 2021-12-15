import { EditFormCaptionView } from './edit-form-caption-view.js';
import { EventDetailsView } from './event-details-view.js';
import { createElement } from '../render-view.js';

const createAddFormTemplate = (point, isAddForm) => `<form 
class="event event--edit"
action="#"
method="post">

<header
  class="event__header">

  ${new EditFormCaptionView(point, isAddForm).template}

  <button 
    class="event__save-btn  btn  btn--blue"
    type="submit">
      Save
  </button>

  <button 
    class="event__reset-btn" type="reset">
      Cancel
  </button>

</header>

  ${point.destination || (point.offers
    && point.offers.offers && point.offers.offers.length > 0) ? new EventDetailsView(point).template : ''}

</form>`;

class AddFormView {
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
    return createAddFormTemplate(this.#point, true);
  }

  removeElement() {
    this.#element = null;
  }
}

export { AddFormView };
