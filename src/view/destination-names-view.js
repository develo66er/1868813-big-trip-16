import { destinationNames } from '../create-mock-data.js';
import {AbstractView} from './abstract-view';

const createDestinationNamesTemplate = `<datalist
id="destination-list-1">

${destinationNames.map((destinationName) => `
    <option
        value="${destinationName}">
    </option>
`).reduce((prev, next) => `${prev} ${next}`)}

</datalist>`;

class DestinationNamesView extends AbstractView{

  get template() {
    return createDestinationNamesTemplate;
  }

}
export { DestinationNamesView };

