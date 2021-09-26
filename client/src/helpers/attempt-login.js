export const attemptLogin = async (data) => {
  return await fetch('./login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });
};
