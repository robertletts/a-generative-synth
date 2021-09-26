import { defaultFxSettings } from '../data/default-fx-settings';
import { fxFactory } from '../factories/fx-factory';

const {
  DEFAULT_PARAM_VALUE,
  DEFAULT_MIN_RANGE,
  DEFAULT_MAX_RANGE,
  DEFAULT_MIX_VALUE,
} = defaultFxSettings;

export const reverb = (Tone) => {
  const Reverb = fxFactory('REVERB', Tone);

  return {
    // Facade object to restrict the UI components access to any complex audio logic
    label: 'Reverb',
    type: 'Reverb',
    unit: Reverb,
    parameters: [
      {
        label: 'Size',
        set: (value) => (Reverb.decay = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: 1,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Reverb.decay = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Amount',
        set: (value) => (Reverb.wet.value = value),
        defaultValue: DEFAULT_MIX_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE / 2,
        reset: () => (Reverb.wet.value = DEFAULT_MIX_VALUE),
      },
    ],
  };
};
