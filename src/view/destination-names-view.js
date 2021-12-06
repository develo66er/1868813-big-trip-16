import { destinationNames } from '../create-mock-data.js';

const createDestinationNamesTemplate = `
<datalist
    id="destination-list-1">

    ${destinationNames.map((destinationName) => `
        <option
            value="${destinationName}">
        </option>
    `).reduce((prev, next) => `${prev} ${next}`)}

</datalist>`;

export { createDestinationNamesTemplate };

