import { AddFormView } from './view/add-form-view.js';
import { EditFormView } from './view/edit-form-view';
import { FileterView } from './view/filter-view.js';
import { MenuView } from './view/menu-view.js';
import { EventPointView } from './view/event-point-view.js';
import { SortView } from './view/sort-view.js';
import { renderElement } from './render-view.js';
import { RenderPosition } from './render-position.js';
import { generatePoints } from './create-mock-data.js';

const TRIP_EVENTS_NUMBER = 20;
const points = generatePoints(TRIP_EVENTS_NUMBER);
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterListContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');


renderElement(menuContainer, new MenuView().element, RenderPosition.BEFOREEND);
renderElement(filterListContainer, new FileterView().element, RenderPosition.BEFOREEND);
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
  eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceEventPointToEditForm);
  eventPointEditComponent.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToEventPoint();
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


