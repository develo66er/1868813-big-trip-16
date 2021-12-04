import {createOfferItemTemplate} from './offer-item-view';

const createOfferItemsTemplate =(offers)=>`
  <h4 
    class="visually-hidden">
      Offers:
  </h4>
  <ul 
    class="event__selected-offers">
      ${offers.map((offer)=>createOfferItemTemplate(offer.title,offer.price)).reduce((prev,next)=>`${prev} ${next}`)}
  </ul>`;

export {createOfferItemsTemplate};
