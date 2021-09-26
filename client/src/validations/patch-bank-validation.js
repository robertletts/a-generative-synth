import * as yup from 'yup';

export const patchBankValidation = yup.object().shape({
  name: yup.string().required(),
  oscillators: yup.array().of(
    yup.object().shape({
      type: yup.string().required(),
      name: yup.string().required(),
      waveType: yup.string().required(),
      volume: yup.number().min(-130).max(0).required(),
      frequency: yup.number().min(0).max(2000).required(),
    })
  ),
  fx: yup.array().of(
    yup.object().shape({
      type: yup.string().required(),
      name: yup.string().required(),
      parameters: yup.array().of(yup.number().min(0).max(1).required()),
    })
  ),
});
