import { createDestinationImageTemplate } from './destination-image-view.js';

const createDestinationTemplate = (destination) => `
<section 
  class="event__section  event__section--destination">
  <h3 
    class="event__section-title  event__section-title--destination">
    ${destination.name}
  </h3>
                
  <p
   class="event__destination-description">
     ${destination.description}
  </p>
          
   ${(destination.pictures && destination.pictures.length > 0) ? createDestinationImageTemplate(destination.pictures) : ''}
                
</section>
        `;

export { createDestinationTemplate };
