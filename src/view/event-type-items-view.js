import { EventPointType } from '../event-point-type.js';
import { EventTypeItemView } from './event-type-item-view.js';
import {AbstractView} from './abstract-view';

const createEventTypeItemsTemplate = () => Object
  .values(EventPointType)
  .map((type) => new EventTypeItemView(type).template)
  .reduce((prev, next) => `${prev} ${next}`);

class EventTypeItemsView extends AbstractView{

  get template() {
    return createEventTypeItemsTemplate();
  }

}
export { EventTypeItemsView };

