import { EditFormCaptionView } from './edit-form-caption-view.js';
import { EventDetailsView } from './event-details-view.js';
import { AbstractView } from './abstract-view';
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

class AddFormView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createAddFormTemplate(this.#point, true);
  }

}

export { AddFormView };
