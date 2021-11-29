const createOfferItemTemplate = (labelFor,title,price) => `
<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${labelFor}" type="checkbox"
                name="event-offer-luggage">
    <label class="event__offer-label" for="${labelFor}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </label>
</div>
`;
export { createOfferItemTemplate };
