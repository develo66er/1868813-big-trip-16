import { AbstractView } from './abstract-view';
import {SortType} from '../sort-type.js';

const createSortTemplate = `<form 
class="trip-events__trip-sort  trip-sort" 
action="#" 
method="get">

<div 
  class="trip-sort__item  trip-sort__item--day">

  <input 
    id="sort-day" 
    class="trip-sort__input  visually-hidden" 
    type="radio" 
    name="trip-sort" 
    value="sort-day" 
    data-sort-type=${SortType.DEFAULT}
    checked>

  <label 
    class="trip-sort__btn" 
    for="sort-day">
      Day
  </label>
</div>

<div 
class="trip-sort__item  trip-sort__item--event">

  <input 
    id="sort-event" 
    class="trip-sort__input  visually-hidden" 
    type="radio" 
    name="trip-sort" 
    value="sort-event" 
    disabled>

  <label 
    class="trip-sort__btn" 
    for="sort-event">
      Event
  </label>

</div>

<div 
  class="trip-sort__item  trip-sort__item--time">

  <input 
    id="sort-time" 
    class="trip-sort__input  visually-hidden" 
    type="radio" 
    name="trip-sort" 
    value="sort-time"
    data-sort-type=${SortType.TIME}
    >

  <label 
    class="trip-sort__btn" 
    for="sort-time">
      Time
  </label>

</div>

<div 
  class="trip-sort__item  trip-sort__item--price">

  <input 
  id="sort-price" 
  class="trip-sort__input  visually-hidden" 
  type="radio" name="trip-sort" 
  value="sort-price"
  data-sort-type=${SortType.PRICE}
  >

  <label 
    class="trip-sort__btn" 
    for="sort-price">
    Price
  </label>

</div>

<div 
  class="trip-sort__item  trip-sort__item--offer">
  <input 
    id="sort-offer" 
    class="trip-sort__input  visually-hidden" 
    type="radio" 
    name="trip-sort" 
    value="sort-offer" 
    disabled>

  <label 
    class="trip-sort__btn" 
    for="sort-offer">
      Offers
  </label>

</div>  
        
</form>`;

class SortView extends AbstractView {
  _callback = {};
  get template() {
    return createSortTemplate;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    const input = evt.target.parentNode.querySelector('input');
    input.checked = true;
    const sortType = input.dataset.sortType;
    this._callback.sortTypeChange(sortType);
  }
}
export { SortView };
