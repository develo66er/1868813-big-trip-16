const updateItem = (items, updatedItem) => {
  const index = items.findIndex((point) => point.id === updatedItem.id);
  return [...items.slice(0, index), updatedItem, ...items.slice(index + 1)];
};
export { updateItem };
