import { defaultFxSettings } from '../data/default-fx-settings';
import { fxFactory } from '../factories/fx-factory';

const {
  DEFAULT_PARAM_VALUE,
  DEFAULT_MIN_RANGE,
  DEFAULT_MAX_RANGE,
  DEFAULT_MIX_VALUE,
} = defaultFxSettings;

export const delay = (Tone) => {
  const Delay = fxFactory('DELAY', Tone);

  return {
    // Facade object to restrict the UI components access to any complex audio logic
    label: 'Delay',
    type: 'Delay',
    unit: Delay,

    parameters: [
      {
        label: 'Time',
        set: (value) => (Delay.delayTime.value = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Delay.delayTime.value = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Repeats',
        set: (value) => (Delay.feedback.value = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Delay.feedback.value = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Amount',
        set: (value) => (Delay.wet.value = value),
        defaultValue: DEFAULT_MIX_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Delay.wet.value = DEFAULT_MIX_VALUE),
      },
    ],
  };
};
