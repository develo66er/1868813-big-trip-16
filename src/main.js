import { createAddFormTemplate } from './view/add-form-view.js';
import { createEditFormTemplate } from './view/edit-form-view';
import { createFilterTemplate } from './view/filter-view.js';
import { createMenuTemplate } from './view/menu-view.js';
import { createEventPointTemplate } from './view/event-point-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { renderTemplate } from './render-view.js';
import { RenderPosition } from './RenderPosition.js';

const TRIP_EVENTS_NUMBER = 3;
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterListContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');


renderTemplate(menuContainer, createMenuTemplate, RenderPosition.BEFOREEND);
renderTemplate(filterListContainer, createFilterTemplate, RenderPosition.BEFOREEND);
renderTemplate(tripEventsContainer, createSortTemplate, RenderPosition.AFTERBEGIN);
const tripEventList = document.createElement('ul');
tripEventList.classList.add('trip-events__list');
for (let index = 0; index < TRIP_EVENTS_NUMBER; index++) {
  const tripEventItem = document.createElement('li');
  tripEventItem.classList.add('trip-events__item');
  if (index === 0) {
    renderTemplate(tripEventItem, createAddFormTemplate(true,true), RenderPosition.BEFOREEND);
  } else {
    let template;
    if (index === 2) {
      template = createEditFormTemplate(true,true);
    } else {
      template = createEventPointTemplate;
    }
    renderTemplate(tripEventItem, template, RenderPosition.BEFOREEND);
  }
  tripEventList.appendChild(tripEventItem);
}
tripEventsContainer.insertAdjacentElement(RenderPosition.BEFOREEND, tripEventList);


