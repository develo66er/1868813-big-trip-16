const createEventTypeItemTemplate = (eventType) => {
  const eventTypeLowerCase = eventType.toLowerCase();
  return `<div
            class="event__type-item">
            <input 
              id="event-type-${eventTypeLowerCase}-1" 
              class="event__type-input  visually-hidden" 
              type="radio" 
              name="event-type" 
              value="${eventTypeLowerCase}">

          <label class="event__type-label  event__type-label--${eventTypeLowerCase}"
            for="event-type-${eventTypeLowerCase}-1">
              ${eventType}
          </label>

          </div>`;
};

export { createEventTypeItemTemplate };
