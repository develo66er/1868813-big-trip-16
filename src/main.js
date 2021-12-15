import { AddFormView } from './view/add-form-view.js';
import { EditFormView } from './view/edit-form-view';
import { FilterView } from './view/filter-view.js';
import { MenuView } from './view/menu-view.js';
import { EventPointView } from './view/event-point-view.js';
import { SortView } from './view/sort-view.js';
import { renderElement } from './render-view.js';
import { RenderPosition } from './render-position.js';
import { generatePoints } from './create-mock-data.js';
import { EmptyMessageView } from './view/empty-message-view.js';

const TRIP_EVENTS_NUMBER = 20;
const points = generatePoints(TRIP_EVENTS_NUMBER);
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterListContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');


renderElement(menuContainer, new MenuView().element, RenderPosition.BEFOREEND);
renderElement(filterListContainer, new FilterView().element, RenderPosition.BEFOREEND);

if (TRIP_EVENTS_NUMBER > 0) {

  renderElement(tripEventsContainer, new SortView().element, RenderPosition.AFTERBEGIN);

  const tripEventList = document.createElement('ul');
  tripEventList.classList.add('trip-events__list');
  const tripEventItem = document.createElement('li');
  tripEventItem.classList.add('trip-events__item');

  const renderEventPoint = (point) => {

    const eventPointComponent = new EventPointView(point);
    const eventPointEditComponent = new EditFormView(point);

    const replaceEventPointToEditForm = () => {
      tripEventItem.replaceChild(eventPointEditComponent.element, eventPointComponent.element);
    };

    const replaceEditFormToEventPoint = () => {
      tripEventItem.replaceChild(eventPointComponent.element, eventPointEditComponent.element);
    };

    const editFormCloseHandler = (evt) => {
      if ((evt.key === 'Escape' || evt.key === 'Esc') || evt.type === 'submit' || evt.type === 'click') {
        evt.preventDefault();
        eventPointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click', editFormCloseHandler);
        eventPointEditComponent.element.removeEventListener('submit', editFormCloseHandler);
        replaceEditFormToEventPoint();
        document.removeEventListener('keydown', editFormCloseHandler);
      }
    };

    eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventPointToEditForm();
      eventPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', editFormCloseHandler);
      eventPointEditComponent.element.addEventListener('submit', editFormCloseHandler);
      document.addEventListener('keydown', editFormCloseHandler);
    });

    renderElement(tripEventItem, eventPointComponent.element, RenderPosition.BEFOREEND);

  };

  for (let index = 0; index < TRIP_EVENTS_NUMBER; index++) {

    if (index === 0) {

      renderElement(tripEventItem, new AddFormView(points[index]).element, RenderPosition.BEFOREEND);

    } else {

      renderEventPoint(points[index]);

    }

    renderElement(tripEventList, tripEventItem, RenderPosition.BEFOREEND);

  }

  renderElement(tripEventsContainer, tripEventList, RenderPosition.BEFOREEND);

} else {

  renderElement(tripEventsContainer, new EmptyMessageView().element, RenderPosition.BEFOREEND);

}

