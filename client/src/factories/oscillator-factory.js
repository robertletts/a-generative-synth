export const oscillatorFactory = (Tone, frequency, waveshape) => {
  const oscillator = new Tone.Oscillator(frequency, waveshape);
  oscillator.volume.value = -128;
  return oscillator;
};
