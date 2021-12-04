import { createEditFormCaptionTemplate } from './edit-form-caption.js';
import { createEventDetailsTemplate } from './event-details-view.js';

const createEditFormTemplate = (point) => `
<form class="event event--edit" action="#" method="post">

    <header
      class="event__header">

      ${createEditFormCaptionTemplate(point)}

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
    && point.offers.offers && point.offers.offers.length > 0) ? createEventDetailsTemplate(point) : ''}
    
</form>
`;
export { createEditFormTemplate };
