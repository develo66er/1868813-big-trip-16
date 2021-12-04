const createOfferInfoTemplate = (offerTitle, offerPrice) => `

    <span 
      class="event__offer-title">
        ${offerTitle}
    </span>
        &plus;&euro;&nbsp;
    <span 
      class="event__offer-price">
        ${offerPrice}
    </span>`;

export { createOfferInfoTemplate };
