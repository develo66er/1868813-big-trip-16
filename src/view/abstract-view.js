import { createElement } from '../render-view.js';

class AbstractView {
    #element = null;
    constructor() {
      if (new.target === 'AbstractView') {
        throw new Error('Can\'t instantiate AbstractView, only concrete one.');
      }
    }

    get element() {
      if (this.#element === null) {
        this.#element = createElement(this.template);
      }
      return this.#element;
    }

    get template() {
      throw new Error('Abstract method not implemented: get template');
    }

    removeElement() {
      this.#element = null;
    }
}
export { AbstractView };
