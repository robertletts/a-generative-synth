import { defaultOscillatorSettings } from '../data/default-oscillator-settings';
import { oscillatorFactory } from '../factories/oscillator-factory';

const {
  DEFAULT_FREQUENCY,
  DEFAULT_WAVESHAPE,
  DEFAULT_OSCILLATOR_LABELS,
  DEFAULT_VOLUME,
} = defaultOscillatorSettings;

export const oscillator = (Tone, index) => {
  const oscillator = oscillatorFactory(
    Tone,
    DEFAULT_FREQUENCY,
    DEFAULT_WAVESHAPE
  );

  return {
    type: DEFAULT_OSCILLATOR_LABELS[index],
    label: DEFAULT_OSCILLATOR_LABELS[index],
    pendingVolumeUpdate: false,
    volumeUpdateValue: null,
    unit: oscillator,
    reset: () => {
      oscillator.volume.value = DEFAULT_VOLUME;
      oscillator.frequency.value = DEFAULT_FREQUENCY;
      oscillator.type = DEFAULT_WAVESHAPE;
    },
  };
};
