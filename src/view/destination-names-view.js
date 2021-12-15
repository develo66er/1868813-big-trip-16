import { destinationNames } from '../create-mock-data.js';
import { createElement } from '../render-view.js';

const createDestinationNamesTemplate = `<datalist
id="destination-list-1">

${destinationNames.map((destinationName) => `
    <option
        value="${destinationName}">
    </option>
`).reduce((prev, next) => `${prev} ${next}`)}

</datalist>`;

class DestinationNamesView {
  #element = null;

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createDestinationNamesTemplate;
  }

  removeElement() {
    this.#element = null;
  }
}
export { DestinationNamesView };

