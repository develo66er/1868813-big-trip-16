import { createEditFormCaptionTemplate } from './edit-form-caption.js';
import { createAvailableOffersTemplate } from './available-offers-view.js';
import { createDestinationTemplate } from './destination-view.js';
const createEditFormTemplate = (isOffersPresent, isDestinationPresent) => {
  const destinationImages = [];
  return `
<form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${createEditFormCaptionTemplate}

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
      ${isOffersPresent ? createAvailableOffersTemplate : ''}

      ${isDestinationPresent ? createDestinationTemplate(destinationImages) : ''}
    </section>
</form>
`;
};
export { createEditFormTemplate };
