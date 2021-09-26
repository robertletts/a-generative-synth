import { oscillator } from '../audio-units/oscillator';
import { tremolo } from '../audio-units/tremolo';
import { delay } from '../audio-units/delay';
import { reverb } from '../audio-units/reverb';
import { distortion } from '../audio-units/distortion';

const OSCILLATOR_COUNT = 4;

export const audioConfiguration = (Tone) => {
  const oscillators = [];
  for (let index = 0; index < OSCILLATOR_COUNT; index++) {
    oscillators.push(oscillator(Tone, index));
  }
  const oscillatorUnits = oscillators.map((elem) => elem.unit);

  // Global FX instantiation
  const fx = [tremolo(Tone), delay(Tone), reverb(Tone), distortion(Tone)];
  const fxUnits = fx.map((elem) => elem.unit);

  // Connect each oscillator through the fx chains to the output
  // via a limiter to minimise volume peaks.
  oscillatorUnits.forEach((elem) => {
    elem.chain(...fxUnits, new Tone.Limiter(0), Tone.Destination);
    elem.start();
  });

  return { oscillators, fx };
};
