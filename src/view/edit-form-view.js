import { createEditFormCaptionTemplate } from './edit-form-caption-view.js';
import { AvailableOffersView } from './available-offers-view.js';
import { DestinationView } from './destination-view.js';
import { SmartView } from './smart-view.js';
import { generateTypeToOffers, generateDestinationNameToDestinations } from '../create-mock-data.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventDetailsTemplate = (props) => {
  const { offers, destination } = props;
  return `<section
class="event__details">

${offers ? new AvailableOffersView(offers).template : ''}

${destination ? new DestinationView(destination).template : ''}

</section>`;
};

const createEditFormTemplate = (props) => {
  const { isAddForm, destination, offers } = props;
  const isSubmitDisabled = false;
  return `<form class="event event--edit" action="#" method="post">

<header
  class="event__header">

  ${createEditFormCaptionTemplate(props)}
  ${isAddForm ?
    `<button 
     class="event__save-btn  btn  btn--blue"
     type="submit" ${isSubmitDisabled ? 'disabled' : ''}>
      Save
     </button>

     <button 
     class="event__reset-btn" type="reset">
       Cancel
     </button>`  :
    `<button
     class="event__save-btn  btn  btn--blue"
     type="submit" ${isSubmitDisabled ? 'disabled' : ''}>
      Save
     </button>

     <button
     class="event__reset-btn"
     type="reset">
      Delete
     </button>

     <button
     class="event__rollup-btn"
     type="button">
     <span class="visually-hidden">
      Open event
     </span>
     </button>`}
</header>

${destination || (offers) ? createEventDetailsTemplate(props) : ''}

</form>`;
};

class EditFormView extends SmartView {
  #handler = {};
  #fromDatePicker = null;
  #toDatePicker = null;

  constructor(point, isAddForm) {
    super();
    this._data = EditFormView.parsePointToData(point, isAddForm);
    this.restoreHandlers();
  }

  #setDatePicker = () => {
    this.#fromDatePicker = flatpickr(this.element.querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.dateFrom,
        onChange: this.#onDateFromChangeHandler
      });
    this.#toDatePicker = flatpickr(this.element.querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.dateTo,
        onChange: this.#onDateTChangeHandler
      });

  }

  #onDateFromChangeHandler = ([dateFrom]) => {
    this.updateData({ dateFrom: dateFrom }, true);
  }

  #onDateTChangeHandler = ([dateTo]) => {
    this.updateData({ dateTo: dateTo }, true);

  }

  removeElement = () => {
    super.removeElement();
    if (this.#fromDatePicker) {
      this.#fromDatePicker.destroy();
      this.#fromDatePicker = null;
    }
    if (this.#toDatePicker) {
      this.#toDatePicker.destroy();
      this.#toDatePicker = null;
    }
  }

  static parsePointToData = (point, isAddForm) => {
    const props = { ...point, isAddForm: isAddForm };
    if (isAddForm) {
      props.dateFrom = props.dateTo = dayjs().startOf('day').format('DD/MM/YY HH:mm');
      props.price = '';
    } else {
      props.dateFrom = point.dateFrom ? point.dateFrom.format('DD/MM/YY HH:mm') : '';
      props.dateTo = point.dateTo ? point.dateTo.format('DD/MM/YY HH:mm') : '';
      props.price = `${point.basePrice}`;
    }
    props.eventType = point.type;
    props.destination = point.destination;
    props.prevDestinationName = point.destination ? point.destination.name : null;
    props.offers = (point.offers
      && point.offers.offers && point.offers.offers.length > 0) ? point.offers.offers : null;
    props.isSubmitDisabled = true;
    return props;
  }

  resetState = (point) => {
    this.updateData({ ...EditFormView.parsePointToData(point) }, true);
  }

  get template() {
    return createEditFormTemplate(this._data);
  }

  setFormSubmitHandler = (callback) => {
    this.#handler.formSubmit = callback;
  };

  addFormSubmitHandler = () => {
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  removeFormSubmitHandler = () => {
    this.element.removeEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handler.formSubmit();
  };

  setRollupButtonClickHandler = (callback) => {
    this.#handler.rollupButtonClick = callback;
  };

  addRollupButtonClickHandler = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  removeRollupButtonClickHandler = () => {
    this.element.querySelector('.event__rollup-btn').removeEventListener('click', this.#rollupButtonClickHandler);
  };

  #rollupButtonClickHandler = () => {
    this.#handler.rollupButtonClick();
  }

  #handleEventTypeToggleClick = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#handleEventTypeChange);
  };

  #handleEventTypeChange = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    const type = evt.target.parentNode.querySelector('input').value;
    const typeToOffers = generateTypeToOffers().getOffersByType(type.toUpperCase());
    this.updateData({
      eventType: evt.target.parentNode.querySelector('input').value,
      offers: typeToOffers ? typeToOffers.offers : null
    }, true);

  };

  #handleOnDestinationInput = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const prevDestinationName = this._data.prevDestinationName;
    if (destinationName === prevDestinationName) {
      return;
    }
    let shouldRedraw = false;
    const destination = generateDestinationNameToDestinations().getDescriptionByDestination(destinationName);
    const data = { destination: destination };
    if (destination) {
      shouldRedraw = true;
      data.prevDestinationName = destinationName;
    }
    this.updateData(data, shouldRedraw);
  };

  restoreHandlers = () => {
    if (this._data.isAddForm) {
      return;
    }
    this.element.querySelector('.event__type-btn').addEventListener('click', this.#handleEventTypeToggleClick);
    this.element.querySelector('#event-destination-2').addEventListener('input', this.#handleOnDestinationInput);
    this.element.querySelector('#event-destination-2').addEventListener('click', this.#handleOnDestinationInput);
    this.addFormSubmitHandler();
    this.addRollupButtonClickHandler();
    this.#setDatePicker();
  }
}
export { EditFormView };
