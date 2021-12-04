import { createOfferItemEditTemplate } from './offer-item-edit-view.js';

const createAvailableOffersTemplate = (offers) => `
<section class="event__section  event__section--offers">
    <h3 
      class="event__section-title  event__section-title--offers">
        Offers
    </h3>
    <div 
      class="event__available-offers">

        ${offers.map((offer) => createOfferItemEditTemplate(offer)).reduce((prev, next) => `${prev} ${next}`)}
    
    </div>
</section>
`;

export { createAvailableOffersTemplate };
