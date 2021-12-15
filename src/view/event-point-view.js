import dayjs from 'dayjs';
import { OfferItemsView } from './offer-items-view.js';
import { createElement } from '../render-view.js';

const getUnitFormatted = (value, unit) => {
  if (value === 0) {
    return '';
  }
  return `${value < 10 ? 0 : ''}${value}${unit}`;
};

const createEventPointTemplate = (point) => {
  const dateFrom = point.date_from.toISOString();
  const dateFromDate = point.date_from.format('MMM DD');
  const dateFromDateYear = point.date_from.format('YYYY-MM-DD');
  const dateFromTimestamp = point.date_from.format('HH:mm');
  const dateTo = point.date_to.toISOString();
  const dateToTimestamp = point.date_to.format('HH:mm');
  const diff = point.date_to.diff(point.date_from, 'minutes', true);
  const hours = parseInt(diff / 60, 10);
  const minutes = dayjs().minute(diff).$m;
  const durationValue = `${getUnitFormatted(hours, 'H')} ${getUnitFormatted(minutes, 'M')}`;
  return `<div
            class="event">

                <time
                  class="event__date"
                  datetime="${dateFromDateYear}">
                    ${dateFromDate}
                </time>

                <div class="event__type">
                  <img
                    class="event__type-icon"
                    width="42"
                    height="42"
                    src="img/icons/${point.type.toLowerCase()}.png"
                    alt="Event type icon">

                </div>

                <h3
                  class="event__title">
                    ${point.type} ${point.destination ? point.destination.name : ''}
                </h3>

                <div
                  class="event__schedule">

                  <p 
                    class="event__time">

                    <time
                      class="event__start-time"
                      datetime="${dateFrom}">
                      ${dateFromTimestamp}
                    </time>
                    &mdash;

                    <time
                      class="event__end-time"
                      datetime="${dateTo}">
                      ${dateToTimestamp}
                    </time>
                  </p>

                  <p
                    class="event__duration">
                    ${durationValue}
                  </p>

                </div>

                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">
                    ${point.base_price}
                  </span>
                </p>

                ${point.offers && point.offers.offers && point.offers.offers.length > 0 ? new OfferItemsView(point.offers.offers).template : ''}
                
                <button
                  class="event__favorite-btn event__favorite-btn--active"
                  type="button">
                  
                  <span 
                    class="visually-hidden">
                    Add to favorite
                  </span>

                  <svg
                    class="event__favorite-icon"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28">
                      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>

                </button>

                <button 
                  class="event__rollup-btn" 
                  type="button">
                    <span class="visually-hidden">
                      Open event
                    </span>
                </button>
              </div>`;
};

class EventPointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEventPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
export { EventPointView };
