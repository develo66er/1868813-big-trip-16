const createDestinationImageTemplate = (images) => `
<div class="event__photos-container">
      <div class="event__photos-tape">
          ${images.map((image) => `<img class="event__photo" src="${image}" alt="Event photo">`).reduce((prev, next) => `${prev}${next}`)}
      </div>
</div>
`;

export { createDestinationImageTemplate };
