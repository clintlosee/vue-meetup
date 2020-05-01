export const rejectError = ({ response = null }) => {
  let message = 'Oops, something went wrong';

  if (response && response.data && response.data.errors) {
    message = response.data.errors.message;
  }

  return Promise.reject(message);
};
