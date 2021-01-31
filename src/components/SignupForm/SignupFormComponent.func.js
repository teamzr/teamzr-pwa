import * as yup from 'yup';

const signupValidationSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required('Pasword is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export async function validateData(signUpData) {
  return signupValidationSchema.validate(signUpData, { abortEarly: false });
}

export function processValidationError(error) {
  const errors = {};

  error.inner && error.inner.forEach((v) => (errors[v.path] = v.message));

  return errors;
}
