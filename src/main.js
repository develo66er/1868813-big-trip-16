import { AddFormView } from './view/add-form-view.js';
import { EditFormView } from './view/edit-form-view';
import { FilterView } from './view/filter-view.js';
import { MenuView } from './view/menu-view.js';
import { EventPointView } from './view/event-point-view.js';
import { SortView } from './view/sort-view.js';
import { render,replace } from './render-view.js';
import { RenderPosition } from './render-position.js';
import { generatePoints } from './create-mock-data.js';
import { EmptyMessageView } from './view/empty-message-view.js';

const TRIP_EVENTS_NUMBER = 20;
const points = generatePoints(TRIP_EVENTS_NUMBER);
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterListContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');


render(menuContainer, new MenuView(), RenderPosition.BEFOREEND);
render(filterListContainer, new FilterView(), RenderPosition.BEFOREEND);

if (TRIP_EVENTS_NUMBER > 0) {

  render(tripEventsContainer, new SortView(), RenderPosition.AFTERBEGIN);

  const tripEventList = document.createElement('ul');
  tripEventList.classList.add('trip-events__list');
  const tripEventItem = document.createElement('li');
  tripEventItem.classList.add('trip-events__item');

  const renderEventPoint = (point) => {

    const eventPointComponent = new EventPointView(point);
    const eventPointEditComponent = new EditFormView(point);

    const replaceEventPointToEditForm = () => {
      replace(eventPointEditComponent, eventPointComponent);
    };

    const replaceEditFormToEventPoint = () => {
      replace(eventPointComponent, eventPointEditComponent);
    };

    const editFormCloseHandler = () => {
      eventPointEditComponent.removeRollupButtonClickHandler();
      eventPointEditComponent.removeFormSubmitHandler();
      replaceEditFormToEventPoint();
      eventPointComponent.addRollupButtonClickHandler();
      document.removeEventListener('keydown', editFormCloseHandler);
    };

    const documentEscapeKeyPressHandler=(evt)=>{
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        editFormCloseHandler();
      }
    };

    const editFormOpenHandler=()=>{
      eventPointComponent.removeRollupButtonClickHandler();
      replaceEventPointToEditForm();
      eventPointEditComponent.addRollupButtonClickHandler();
      eventPointEditComponent.addFormSubmitHandler();
      document.addEventListener('keydown', documentEscapeKeyPressHandler);
    };

    eventPointComponent.setRollupButtonClickHandler(editFormOpenHandler);
    eventPointComponent.addRollupButtonClickHandler();
    eventPointEditComponent.setFormSubmitHandler(editFormCloseHandler);
    eventPointEditComponent.setRollupButtonClickHandler(editFormCloseHandler);

    render(tripEventItem, eventPointComponent, RenderPosition.BEFOREEND);

  };

  for (let index = 0; index < TRIP_EVENTS_NUMBER; index++) {

    if (index === 0) {

      render(tripEventItem, new AddFormView(points[index]), RenderPosition.BEFOREEND);

    } else {

      renderEventPoint(points[index]);

    }

    render(tripEventList, tripEventItem, RenderPosition.BEFOREEND);

  }

  render(tripEventsContainer, tripEventList, RenderPosition.BEFOREEND);

} else {

  render(tripEventsContainer, new EmptyMessageView().element, RenderPosition.BEFOREEND);

}

