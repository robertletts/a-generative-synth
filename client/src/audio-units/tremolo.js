import { defaultFxSettings } from '../data/default-fx-settings';
import { fxFactory } from '../factories/fx-factory';

const {
  DEFAULT_PARAM_VALUE,
  DEFAULT_MIN_RANGE,
  DEFAULT_MAX_RANGE,
  DEFAULT_MIX_VALUE,
} = defaultFxSettings;

export const tremolo = (Tone) => {
  const Tremolo = fxFactory('TREMOLO', Tone);

  return {
    // Facade object to restrict the UI components access to any complex audio logic
    type: 'Tremolo',
    label: 'Tremolo',
    unit: Tremolo,
    parameters: [
      {
        label: 'Depth',
        set: (value) => (Tremolo.depth.value = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Tremolo.depth.value = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Speed',
        set: (value) => (Tremolo.frequency.value = value),
        defaultValue: DEFAULT_PARAM_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Tremolo.frequency.value = DEFAULT_PARAM_VALUE),
      },
      {
        label: 'Amount',
        set: (value) => (Tremolo.wet.value = value),
        defaultValue: DEFAULT_MIX_VALUE,
        min: DEFAULT_MIN_RANGE,
        max: DEFAULT_MAX_RANGE,
        reset: () => (Tremolo.wet.value = DEFAULT_MIX_VALUE),
      },
    ],
  };
};
