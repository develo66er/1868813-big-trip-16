import { PointPresenter } from './point-presenter.js';
import { render } from '../render-view.js';
import { EmptyMessageView } from '../view/empty-message-view.js';
import { AddFormView } from '../view/add-form-view.js';
import { SortView } from '../view/sort-view.js';
import { RenderPosition } from '../render-position.js';
import { updateItem,sortByDate,sortByPrice,sortByTime } from '../commons.js';
import {SortType} from '../sort-type.js';

const TRIP_EVENTS_NUMBER = 20;

class TripPresenter {
  #tripEventsContainer = null;
  #tripEventList = null;
  #emptyMessageComponent = new EmptyMessageView();
  #sortComponent = new SortView();
  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedPoints = [];

  constructor(tripEventsContainer, tripEventList) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventList = tripEventList;
  }

  init(points) {
    this.#points = [...points];
    this.#sourcedPoints = [...points];
    if (TRIP_EVENTS_NUMBER < 1) {
      this.#renderNoView();
    }else{
      this.#renderSortView();
      this.#renderAddForm(this.#points[0]);
      this.#points.sort(sortByDate);
      this.#renderEventPoints();
      render(this.#tripEventsContainer, this.#tripEventList, RenderPosition.BEFOREEND);
    }

  }

  #renderEventPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripEventList, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEventPoints = () => {
    for (let index = 0; index < TRIP_EVENTS_NUMBER; index++) {
      this.#renderEventPoint(this.#points[index]);
    }
  }

  #renderAddForm = (point) => {
    const tripEventItem = document.createElement('li');
    tripEventItem.classList.add('trip-events__item');
    render(tripEventItem, new AddFormView(point), RenderPosition.BEFOREEND);
    render(this.#tripEventList, tripEventItem, RenderPosition.BEFOREEND);
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType===sortType){
      return;
    }
    // - Сортируем задачи
    switch(sortType){
      case SortType.PRICE: {
        this.#points.sort(sortByPrice);
        this.#currentSortType = SortType.PRICE;
        break;
      }
      case SortType.TIME: {
        this.#points.sort(sortByTime);
        this.#currentSortType = SortType.TIME;
        break;
      }
      default:{
        this.#currentSortType = SortType.DEFAULT;
        this.#points = [...this.#sourcedPoints];
        this.#points.sort(sortByDate);
      }
    }
    // - Очищаем список
    this.#clearPoints();
    // - Рендерим список заново
    this.#renderEventPoints();
  }


  #renderSortView = () => {
    render(this.#tripEventsContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoView = () => {
    render(this.#tripEventsContainer, this.#emptyMessageComponent, RenderPosition.BEFOREEND);
  }

  #handlePointChange = (changedPoint) => {
    updateItem(this.#points, changedPoint);
    updateItem(this.#sourcedPoints,changedPoint);
    this.#pointPresenters.get(changedPoint.id).init(changedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #clearPoints=()=>{
    this.#pointPresenters.forEach((pointPresenter)=>pointPresenter.destroy());
  }
}
export { TripPresenter };
