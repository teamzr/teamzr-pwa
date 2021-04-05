export function processValidationError(error) {
  const errors = {};

  error.inner && error.inner.forEach((v) => (errors[v.path] = v.message));

  if (error.response) {
    errors['alert'] = error.response.data.message;
  }

  return errors;
}
