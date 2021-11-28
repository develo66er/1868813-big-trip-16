import {createOfferItemTemplate} from './offer-item-view.js';
const createOfferListTemplate = `
<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
        ${createOfferItemTemplate('event-offer-luggage-1','Add luggage',30)}
        ${createOfferItemTemplate('event-offer-comfort-1','Switch to comfort class',100)}
        ${createOfferItemTemplate('event-offer-meal-1','Add meal',15)}
        ${createOfferItemTemplate('event-offer-seats-1','Choose seats',5)}
        ${createOfferItemTemplate('event-offer-train-1','Travel by train',40)}
    </div>
</section>
`;
export {createOfferListTemplate};
