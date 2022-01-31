import { EventTypeItemsView } from './event-type-items-view.js';
import { DestinationNamesView } from './destination-names-view.js';

const createEditFormCaptionTemplate = (props) => {
  const{isAddForm,eventType,destination,dateFrom,dateTo,price} = props;
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
                    src="img/icons/${eventType.toLowerCase()}.png" 
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
                for="event-destination-${isAddForm ? '1' : '2'}">
                ${eventType}
            </label>
    
            <input 
                class="event__input  event__input--destination"
                id="event-destination-${isAddForm ? '1' : '2'}" type="text" 
                name="event-destination"
                value="${destination?destination.name:'Madrid'}" 
                list="destination-list-${isAddForm ? '1' : '2'}">
            
            ${new DestinationNamesView().template}
    
        </div>
    
        <div 
            class="event__field-group  event__field-group--time">
            
            <label class="visually-hidden" 
                for="event-start-time-${isAddForm ? '1' : '2'}">
                    From
            </label>
    
            <input class="event__input  event__input--time" 
             id="event-start-time-${isAddForm ? '1' : '2'}" 
             type="text"
             name="event-start-time" 
             value="${dateFrom}">
                    &mdash;
            
            <label class="visually-hidden" 
                for="event-end-time-${isAddForm ? '1' : '2'}">
                    To
            </label>
    
            <input 
                class="event__input  event__input--time"
                id="event-end-time-${isAddForm ? '1' : '2'}" type="text" 
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

export { createEditFormCaptionTemplate };
