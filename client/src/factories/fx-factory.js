export const fxFactory = (TYPE, Tone) => {
  const DEFAULT_WET = 0;
  switch (TYPE) {
    case 'DISTORTION':
      const distortion = new Tone.Distortion(0.8);
      distortion.wet.value = DEFAULT_WET;
      return distortion;
    case 'DELAY':
      const delay = new Tone.PingPongDelay('4n', 0.2);
      delay.wet.value = DEFAULT_WET;
      return delay;
    case 'REVERB':
      const reverb = new Tone.Reverb(10);
      reverb.wet.value = DEFAULT_WET;
      return reverb;
    case 'TREMOLO':
      const tremolo = new Tone.Tremolo(3, 0.5).start();
      tremolo.wet.value = DEFAULT_WET;
      return tremolo;
    default:
      throw new Error('Invalid FX type provided.');
  }
};
