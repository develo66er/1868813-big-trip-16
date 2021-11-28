const renderTemplate = (parentNode, template, renderPosition)=>{
  parentNode.insertAdjacentHTML(renderPosition,template);
};
export { renderTemplate };
