export const validateListOfClassNames = (activeID, currentIDs, className) => {
  return currentIDs.includes(activeID) ? className : '';
};
