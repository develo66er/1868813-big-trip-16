import { PointPresenter } from './point-presenter.js';
import { render } from '../render-view.js';
import { EmptyMessageView } from '../view/empty-message-view.js';
import { AddFormView } from '../view/add-form-view.js';
import { SortView } from '../view/sort-view.js';
import { RenderPosition } from '../render-position.js';
import { updateItem } from '../commons.js';

const TRIP_EVENTS_NUMBER = 20;

class TripPresenter {
  #tripEventsContainer = null;
  #tripEventList = null;
  #emptyMessageComponent = new EmptyMessageView();
  #sortComponent = new SortView();
  #points = [];
  #pointPresenters = new Map();
  constructor(tripEventsContainer, tripEventList) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventList = tripEventList;
  }

  init(points) {
    this.#points = [...points];
    this.#renderEventPoints();
    render(this.#tripEventsContainer, this.#tripEventList, RenderPosition.BEFOREEND);

  }

  #renderEventPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventList, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEventPoints = () => {
    if (TRIP_EVENTS_NUMBER < 1) {
      this.#renderNoView();
    }
    this.#renderSortView();
    this.#renderAddForm(this.#points[0]);
    for (let index = 1; index < TRIP_EVENTS_NUMBER; index++) {
      this.#renderEventPoint(this.#points[index]);
    }
  }

  #renderAddForm = (point) => {
    render(this.#tripEventList, new AddFormView(point), RenderPosition.BEFOREEND);
  }

  #renderSortView = () => {
    render(this.#tripEventsContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoView = () => {
    render(this.#tripEventsContainer, this.#emptyMessageComponent, RenderPosition.BEFOREEND);
  }

  #handlePointChange = (changedPoint) => {
    updateItem(this.#points, changedPoint);
    this.#pointPresenters.get(changedPoint.id).init(changedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }
}
export { TripPresenter };
