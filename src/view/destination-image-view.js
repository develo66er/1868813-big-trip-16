import { createElement } from '../render-view.js';

class DestinationImageView {
  #element = null;
  #images = null;
  #createDestinationImageTemplate = () => `<div 
  class="event__photos-container">
  <div
    class="event__photos-tape">

      ${this.#images.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).reduce((prev, next) => `${prev}${next}`)}
      
  </div>
</div>
`;

  constructor(images) {
    this.#images = images;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return this.#createDestinationImageTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
export { DestinationImageView };
