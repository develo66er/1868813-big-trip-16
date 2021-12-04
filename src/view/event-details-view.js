import { createAvailableOffersTemplate } from './available-offers-view.js';
import { createDestinationTemplate } from './destination-view.js';

const createEventDetailsTemplate = (point) => `

    <section
        class="event__details">

        ${point.offers && point.offers.offers && point.offers.offers.length > 0 ? createAvailableOffersTemplate(point.offers.offers) : ''}

        ${point.destination ? createDestinationTemplate(point.destination) : ''}

    </section>
`;

export { createEventDetailsTemplate };

