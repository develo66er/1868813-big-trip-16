import {AbstractView} from './abstract-view.js';
class SmartView extends AbstractView{
    _data = null;
    restoreHandlers = ()=>{
      throw new Error('restore handkers should be implemented');
    }

    updateElement = ()=>{
      const prevElement = this.element;
      const parent = prevElement.parentElement;
      this.removeElement();
      const newElement = this.element;
      parent.replaceChild(newElement,prevElement);
    }

    updateData = (update, shouldRedraw)=>{
      if(!update){
        return;
      }
      this._data = {...this._data,...update};
      if(!shouldRedraw){
        return;
      }
      this.updateElement();
      this.restoreHandlers();
    }
}
export {SmartView};
