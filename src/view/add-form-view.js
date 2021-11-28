import { createEditFormCaptionTemplate } from './edit-form-caption.js';
import { createAvailableOffersTemplate } from './available-offers-view.js';
import { createDestinationTemplate } from './destination-view.js';
const createAddFormTemplate = (isOffersPresent, isDestinationPresent) => {
  const destinationImages = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg', 'img/photos/5.jpg'];
  return `
<form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${createEditFormCaptionTemplate}

        <button class="event__save-btn  btn  btn--blue" type="submit">
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          Cancel
        </button>
    </header>
    <section class="event__details">
      ${isOffersPresent ? createAvailableOffersTemplate : ''}

      ${isDestinationPresent ? createDestinationTemplate(destinationImages) : ''}
    </section>
</form>
`;
};
export { createAddFormTemplate };
