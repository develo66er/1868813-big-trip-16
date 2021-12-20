import { EventTypeItemsView } from './event-type-items-view.js';
import { DestinationNamesView } from './destination-names-view.js';
import dayjs from 'dayjs';
import {AbstractView} from './abstract-view';

const createEditFormCaptionTemplate = (point, isAddForm) => {
  let dateFrom;
  let dateTo;
  let price;
  const destinationNameValue = 'Madrid';
  if (isAddForm) {
    dateFrom = dateTo = dayjs().startOf('day').format('DD/MM/YY HH:mm');
    price = '';
  } else {
    dateFrom = point.date_from ? point.date_from.format('DD/MM/YY HH:mm') : '';
    dateTo = point.date_to ? point.date_to.format('DD/MM/YY HH:mm') : '';
    price = `${point.base_price}`;
  }

  return `
        <div class="event__type-wrapper">
    
            <label class="event__type  event__type-btn" 
                for="event-type-toggle-${isAddForm ? '1' : '2'}">
                
                <span 
                    class="visually-hidden">
                        Choose event type
                </span>
    
                <img class="event__type-icon" 
                    width="17" 
                    height="17"
                    src="img/icons/${point.type.toLowerCase()}.png" 
                    alt="Event type icon">
            
            </label>
            
            <input 
                class="event__type-toggle  visually-hidden" 
                id="event-type-toggle-${isAddForm ? '1' : '2'}" 
                type="checkbox">
            
            <div class="event__type-list">
    
                <fieldset class="event__type-group">
    
                    <legend 
                        class="visually-hidden">
                        Event type
                    </legend>
    
                    ${new EventTypeItemsView().template}
    
                </fieldset>
    
            </div>
    
        </div>
    
        <div 
            class="event__field-group  event__field-group--destination">
    
            <label 
                class="event__label  event__type-output" 
                for="event-destination-1">
                ${point.type}
            </label>
    
            <input 
                class="event__input  event__input--destination"
                id="event-destination-1" type="text" 
                name="event-destination"
                value="${destinationNameValue}" 
                list="destination-list-1">
            
            ${new DestinationNamesView().template}
    
        </div>
    
        <div 
            class="event__field-group  event__field-group--time">
            
            <label class="visually-hidden" 
                for="event-start-time-1">
                    From
            </label>
    
            <input class="event__input  event__input--time" 
             id="event-start-time-1" 
             type="text"
             name="event-start-time" 
             value="${dateFrom}">
                    &mdash;
            
            <label class="visually-hidden" 
                for="event-end-time-1">
                    To
            </label>
    
            <input 
                class="event__input  event__input--time"
                id="event-end-time-1" type="text" 
                name="event-end-time" 
                value="${dateTo}">
    
        </div>
    
        <div class="event__field-group  event__field-group--price">
    
            <label 
                class="event__label" 
                for="event-price-1">
    
                <span 
                    class="visually-hidden">
                    Price
                </span>
                &euro;
                
            </label>
    
            <input 
                class="event__input  event__input--price" 
                id="event-price-1" 
                type="text" 
                name="event-price" 
                value="${price}">
    
        </div>
        `;
};

class EditFormCaptionView extends AbstractView{
    #point = null;
    #isAddForm = false;

    constructor(point, isAddForm) {
      super();
      this.#point = point;
      this.#isAddForm = isAddForm;
    }

    get template() {
      return createEditFormCaptionTemplate(this.#point, this.#isAddForm);
    }
}
export { EditFormCaptionView };
