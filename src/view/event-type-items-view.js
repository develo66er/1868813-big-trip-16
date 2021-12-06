
import { EventPointType } from '../EventPointType.js';
import { createEventTypeItemTemplate } from './event-type-item-view.js';

const createEventTypeItemsTemplate = Object
  .values(EventPointType)
  .map((type) => createEventTypeItemTemplate(type))
  .reduce((prev, next) => `${prev} ${next}`);

export { createEventTypeItemsTemplate };
