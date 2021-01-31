import * as yup from 'yup';

const signupValidationSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

export async function validateData(signUpData) {
  return signupValidationSchema.validate(signUpData, { abortEarly: false });
}

export function processValidationError(error) {
  const errors = {};

  error.inner && error.inner.forEach((v) => (errors[v.path] = v.message));

  if (error.response) {
    errors['alert'] = error.response.data.message;
  }

  return errors;
}
