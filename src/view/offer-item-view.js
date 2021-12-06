import { createOfferInfoTemplate } from './offer-info-view.js';

const createOfferItemTemplate = (offerTitle, offerPrice) => `
    <li 
      class="event__offer">
        ${createOfferInfoTemplate(offerTitle, offerPrice)}
    </li>`;

export { createOfferItemTemplate };
