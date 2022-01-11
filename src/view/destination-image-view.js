import { AbstractView } from './abstract-view';

const createDestinationImageTemplate = (images) => `<div 
class="event__photos-container">
<div
  class="event__photos-tape">

    ${images.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).reduce((prev, next) => `${prev}${next}`)}
    
</div>
</div>
`;

class DestinationImageView extends AbstractView {
  #images = null;

  constructor(images) {
    super();
    this.#images = images;
  }

  get template() {
    return createDestinationImageTemplate(this.#images);
  }

}
export { DestinationImageView };
