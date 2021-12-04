
import {createOfferInfoTemplate} from './offer-info-view.js';

const createOfferItemEditTemplate = (offer) => {

  const offerChunks = offer.title.split(' ');

  const offerName= offerChunks[offerChunks.length-1];

  return `
        <div 
          class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offerName}-${offer.id}" 
            type="checkbox"
            name="event-offer-${offerName}">

          <label 
            class="event__offer-label" 
            for="event-offer-${offerName}-${offer.id}">
              ${createOfferInfoTemplate(offer.title,offer.price)}
          </label>

        </div>
      `;
};

export { createOfferItemEditTemplate };
