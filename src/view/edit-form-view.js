import {createFormCaptionTemplate} from './edit-form-caption.js';
import {createOfferListTemplate} from './available-offers-view.js';
import {createDestinationTemplate} from './destination-view.js';
const createEditFormTemplate =()=>{
  const destinationImages = [];
  return `
<form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${createFormCaptionTemplate}

        <button class="event__save-btn  btn  btn--blue" type="submit">
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          Delete
        </button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">
              Open event
            </span>
        </button>
    </header>
    <section class="event__details">
      ${createOfferListTemplate}

      ${createDestinationTemplate(destinationImages)}
    </section>
</form>
`;
};
export { createEditFormTemplate };
