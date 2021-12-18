import { EditFormCaptionView } from './edit-form-caption-view.js';
import { EventDetailsView } from './event-details-view.js';
import {AbstractView} from './abstract-view';

const createEditFormTemplate = (point) => `<form class="event event--edit" action="#" method="post">

<header
  class="event__header">

  ${new EditFormCaptionView(point).template}

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

${point.destination || (point.offers
    && point.offers.offers && point.offers.offers.length > 0) ? new EventDetailsView(point).template : ''}

</form>`;

class EditFormView extends AbstractView{
  #point = null;
  #handler={};
  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditFormTemplate(this.#point);
  }

  setFormSubmitHandler = (callback)=>{
    this.#handler.formSubmit = callback;
  };

  addFormSubmitHandler = ()=>{
    this.element.addEventListener('submit',this.#formSubmitHandler);
  }

  removeFormSubmitHandler = ()=>{
    this.element.removeEventListener('submit',this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt)=>{
    evt.preventDefault();
    this.#handler.formSubmit();
  };

  setRollupButtonClickHandler = (callback)=>{
    this.#handler.rollupButtonClick = callback;
  };

  addRollupButtonClickHandler = ()=>{
    this.element.querySelector('.event__rollup-btn').addEventListener('click',this.#rollupButtonClickHandler);
  };

  removeRollupButtonClickHandler = ()=>{
    this.element.querySelector('.event__rollup-btn').removeEventListener('click',this.#rollupButtonClickHandler);
  };

  #rollupButtonClickHandler = ()=>{
    this.#handler.rollupButtonClick();
  }
}
export { EditFormView };
