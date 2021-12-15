import { EventPointType } from '../event-point-type.js';
import { EventTypeItemView } from './event-type-item-view.js';
import { createElement } from '../render-view.js';

const createEventTypeItemsTemplate = () => Object
  .values(EventPointType)
  .map((type) => new EventTypeItemView(type).template)
  .reduce((prev, next) => `${prev} ${next}`);

class EventTypeItemsView {
  #element = null;

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEventTypeItemsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { EventTypeItemsView };

