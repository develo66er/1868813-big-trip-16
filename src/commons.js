const updateItem = (items, updatedItem) => {
  const index = items.findIndex((point) => point.id === updatedItem.id);
  return [...items.slice(0, index), updatedItem, ...items.slice(index + 1)];
};
const getNullDate=(dateA, dateB)=>{
  if(dateA===null && dateB===null){
    return 0;
  }
  if(dateA===null){
    return 1;
  }
  if(dateB===null){
    return -1;
  }
  return null;
};

const sortByDate = (pointA,pointB)=>{
  const dateFromA = pointA.dateFrom;
  const dateFromB = pointB.dateFrom;
  const nullDate = getNullDate(dateFromA,dateFromB);
  return nullDate?dateFromA.diff(dateFromB):0;
};

const sortByPrice  = (pointA, pointB)=>pointA.basePrice- pointB.basePrice;

const sortByTime = (pointA, pointB)=>{
  const durationA = pointA.dateTo.diff(pointA.dateFrom, 'minutes', true);
  const durationB = pointB.dateTo.diff(pointB.dateFrom, 'minutes', true);
  return durationA-durationB;
};

export { updateItem,sortByDate,sortByPrice,sortByTime };
