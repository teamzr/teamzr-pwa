import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  newPass: yup.string().min(8).required('Password is required'),
  newPassConfirm: yup
    .string()
    .oneOf([yup.ref('newPass'), null], 'Passwords must match')
    .required(),
});
