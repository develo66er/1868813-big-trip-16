import {AbstractView} from './abstract-view';

const createMenuTemplate = `<nav 
class="trip-controls__trip-tabs  trip-tabs">
    <a 
      class="trip-tabs__btn  trip-tabs__btn--active" 
      href="#">
        Table
    </a>
    <a 
      class="trip-tabs__btn" 
      href="#">
        Stats
    </a>
</nav>`;

class MenuView extends AbstractView{

  get template() {
    return createMenuTemplate;
  }

}
export { MenuView };
