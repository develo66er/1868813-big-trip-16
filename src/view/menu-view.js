import { createElement } from '../render-view.js';

const createMenuTemplate = `<nav 
class="trip-controls__trip-tabs  trip-tabs">
    <a 
      class="trip-tabs__btn  trip-tabs__btn--active" 
      href="#">
        Table
    </a>
    <a 
      class="trip-tabs__btn" 
      href="#">
        Stats
    </a>
</nav>`;

class MenuView {
  #element = null;

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createMenuTemplate;
  }

  removeElement() {
    this.#element = null;
  }
}
export { MenuView };
