export const currentComponentIsInFocus = (id) => {
  return document.activeElement.className.includes(id);
};
