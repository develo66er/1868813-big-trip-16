import { createElement } from '../render-view.js';

const createEmptyMessageTemplate = '<p class="trip-events__msg">Click New Event to create your first point</p>';
class EmptyMessageView {
    #element = null;

    get element() {
      if (this.#element === null) {
        this.#element = createElement(this.template);
      }
      return this.#element;
    }

    get template() {
      return createEmptyMessageTemplate;
    }

    removeElement() {
      this.#element = null;
    }
}
export { EmptyMessageView };
