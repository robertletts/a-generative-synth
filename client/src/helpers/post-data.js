export const postData = async (data) => {
  await fetch('/patch-bank', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  });
};
