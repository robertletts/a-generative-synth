import { defaultFxSettings } from '../data/default-fx-settings';
import { fxFactory } from '../factories/fx-factory';

const {
  DEFAULT_PARAM_VALUE,
  DEFAULT_MIN_RANGE,
  DEFAULT_MAX_RANGE,
  DEFAULT_MIX_VALUE,
} = defaultFxSettings;

export const distortion = (Tone) => {
  const Distortion = fxFactory('DISTORTION', Tone);
  return {
    // Facade object to restrict the UI components access to any complex audio logic
    label: 'Distortion',
    type: 'Distortion',
    unit: Distortion,
    parameters: [
      {
        label: 'Dirt',
        set: (value) => (Distortion.distortion = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Distortion.distortion = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Amount',
        set: (value) => (Distortion.wet.value = value),
        defaultValue: DEFAULT_MIX_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Distortion.wet.value = DEFAULT_MIX_VALUE),
      },
    ],
  };
};
