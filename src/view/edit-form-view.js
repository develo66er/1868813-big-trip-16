import { EditFormCaptionView } from './edit-form-caption-view.js';
import { EventDetailsView } from './event-details-view.js';
import { createElement } from '../render-view.js';

class EditFormView {
  #element = null;
  #point = null;
  #createEditFormTemplate = () => `<form class="event event--edit" action="#" method="post">

    <header
      class="event__header">

      ${new EditFormCaptionView(this.#point).template}

      <button
        class="event__save-btn  btn  btn--blue"
        type="submit">
          Save
      </button>

      <button
        class="event__reset-btn"
        type="reset">
          Delete
      </button>

      <button
        class="event__rollup-btn"
        type="button">
        <span class="visually-hidden">
          Open event
        </span>
      </button>

    </header>
    
    ${this.#point.destination || (this.#point.offers
      && this.#point.offers.offers && this.#point.offers.offers.length > 0) ? new EventDetailsView(this.#point).template : ''}
    
</form>`;

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
    return this.#createEditFormTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { EditFormView };
