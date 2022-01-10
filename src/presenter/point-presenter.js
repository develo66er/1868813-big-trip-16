import { EventPointView } from '../view/event-point-view.js';
import { EditFormView } from '../view/edit-form-view';
import { RenderPosition } from '../render-position.js';
import { render, replace, remove } from '../render-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #eventPointComponent = null;
  #eventPointEditComponent = null;
  #tripEvents = null;
  #changeData = null;
  #changeMode = null;
  #point;
  #mode = Mode.DEFAULT;
  constructor(tripEvents, changeData, changeMode) {
    this.#tripEvents = tripEvents;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    const prevEventPointComponent = this.#eventPointComponent;
    const prevEventPointEditComponent = this.#eventPointEditComponent;
    this.#eventPointComponent = new EventPointView(point);
    this.#eventPointEditComponent = new EditFormView(point);
    this.#eventPointComponent.setRollupButtonClickHandler(this.#editFormOpenHandler);
    this.#eventPointComponent.addRollupButtonClickHandler();
    this.#eventPointComponent.setFavoritesAddClickHandler(this.#favoritesAddClickHandler);
    this.#eventPointComponent.addFavoritesAddClickHandler();
    this.#eventPointEditComponent.setFormSubmitHandler(this.#editFormCloseHandler);
    this.#eventPointEditComponent.setRollupButtonClickHandler(this.#editFormCloseHandler);
    if (prevEventPointComponent === null && prevEventPointEditComponent === null) {
      this.#renderEventPointListItem();
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointEditComponent, prevEventPointEditComponent);
    }
    remove(prevEventPointComponent);
    remove(prevEventPointEditComponent);
  }

  resetView = () => {
    if (this.#mode === Mode.EDITING) {
      this.#replaceEditFormToEventPoint();
    }
  }

  destroy = () => {
    remove(this.#eventPointComponent);
    remove(this.#eventPointEditComponent);
  }

  #renderEventPointListItem = () => {
    const tripEventItem = document.createElement('li');
    tripEventItem.classList.add('trip-events__item');
    render(tripEventItem, this.#eventPointComponent, RenderPosition.BEFOREEND);
    render(this.#tripEvents, tripEventItem, RenderPosition.BEFOREEND);
  }

  #replaceEventPointToEditForm = () => {
    replace(this.#eventPointEditComponent, this.#eventPointComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToEventPoint = () => {
    replace(this.#eventPointComponent, this.#eventPointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #editFormCloseHandler = () => {
    this.#eventPointEditComponent.removeRollupButtonClickHandler();
    this.#eventPointEditComponent.removeFormSubmitHandler();
    this.#replaceEditFormToEventPoint();
    this.#eventPointComponent.addRollupButtonClickHandler();
    document.removeEventListener('keydown', this.#editFormCloseHandler);
  };

  #documentEscapeKeyPressHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#editFormCloseHandler();
    }
  };

  #editFormOpenHandler = () => {
    this.#eventPointComponent.removeRollupButtonClickHandler();
    this.#replaceEventPointToEditForm();
    this.#eventPointEditComponent.addRollupButtonClickHandler();
    this.#eventPointEditComponent.addFormSubmitHandler();
    document.addEventListener('keydown', this.#documentEscapeKeyPressHandler);
  };

  #favoritesAddClickHandler = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  }
}
export { PointPresenter };
