const createDestinationImageTemplate = (images) => `
<div 
  class="event__photos-container">
  <div
    class="event__photos-tape">

      ${images.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).reduce((prev, next) => `${prev}${next}`)}
      
  </div>
</div>
`;

export { createDestinationImageTemplate };
