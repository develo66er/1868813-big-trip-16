import { createElement } from '../render-view.js';

const createDestinationImageTemplate = (images) => `<div 
class="event__photos-container">
<div
  class="event__photos-tape">

    ${images.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).reduce((prev, next) => `${prev}${next}`)}
    
</div>
</div>
`;

class DestinationImageView {
  #element = null;
  #images = null;

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
    return createDestinationImageTemplate(this.#images);
  }

  removeElement() {
    this.#element = null;
  }
}
export { DestinationImageView };
