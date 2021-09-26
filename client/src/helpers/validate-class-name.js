export const validateClassName = (activeID, currentID, className) => {
  return activeID === currentID ? className : '';
};
