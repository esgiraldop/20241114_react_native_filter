import * as Yup from 'yup';

export const vehicleSchema = Yup.object().shape({
  licensePlate: Yup.string()
    .required()
    .min(6, 'License plate must contain at least 6 characters'),
  make: Yup.string()
    .required('Manufacturer is required')
    .min(3, 'Manufacturer must contain at least 3 characters'),
  model: Yup.string()
    .required('Model is required')
    .min(3, 'Manufacturer must contain at least 3 characters'),
  year: Yup.number().required('Model is required'),
});
