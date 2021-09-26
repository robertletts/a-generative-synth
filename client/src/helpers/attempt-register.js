export const attemptRegister = (data) => {
  return fetch('./register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });
};
