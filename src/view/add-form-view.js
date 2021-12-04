import { createEditFormCaptionTemplate } from './edit-form-caption.js';
import { createEventDetailsTemplate } from './event-details-view.js';

const createAddFormTemplate = (point) => `
<form 
  class="event event--edit"
  action="#"
  method="post">

  <header
    class="event__header">

    ${createEditFormCaptionTemplate(point, true)}

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
    && point.offers.offers && point.offers.offers.length > 0) ? createEventDetailsTemplate(point) : ''}

</form>
`;

export { createAddFormTemplate };
