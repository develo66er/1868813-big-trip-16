import { FilterView } from './view/filter-view.js';
import { MenuView } from './view/menu-view.js';
import { render } from './render-view.js';
import { RenderPosition } from './render-position.js';
import { generatePoints } from './create-mock-data.js';
import { TripPresenter } from './presenter/trip-presenter.js';

const TRIP_EVENTS_NUMBER = 20;
const points = generatePoints(TRIP_EVENTS_NUMBER);
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterListContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripEventList = document.createElement('ul');
tripEventList.classList.add('trip-events__list');

render(menuContainer, new MenuView(), RenderPosition.BEFOREEND);
render(filterListContainer, new FilterView(), RenderPosition.BEFOREEND);
new TripPresenter(tripEventsContainer, tripEventList).init(points);
