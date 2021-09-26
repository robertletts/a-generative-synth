import { useEffect } from 'react';
import { useContext } from 'react';
import { defaultOscillatorSettings } from '../../../../../../data/default-oscillator-settings';
import { AudioComponentsContext } from '../../../../../../App';

const DEFAULT_TIME_INTERVAL = 10000;

export const GenerativePanel = () => {
  const { DEFAULT_MIN_VOLUME, DEFAULT_MIN_FREQUENCY } =
    defaultOscillatorSettings;
  const { oscillators } = useContext(AudioComponentsContext);

  useEffect(() => {
    const previousSettings = oscillators.map((elem, index) => {
      return {
        id: index,
        volume: elem.unit.volume.value,
        frequency: elem.unit.frequency.value,
      };
    });

    const volumeAutomations = previousSettings
      .filter((elem) => elem.volume > -100)
      .map((prev) => {
        const randomInterval = Math.random() * DEFAULT_TIME_INTERVAL;
        const pivotValue = (prev.volume + DEFAULT_MIN_VOLUME) / 2;

        return setInterval(() => {
          const randomValue =
            Math.random() * (prev.volume - pivotValue) + pivotValue;
          oscillators[prev.id].unit.volume.value = randomValue;
        }, randomInterval);
      });

    const frequencyAutomations = previousSettings
      .filter((elem) => elem.volume > -100)
      .map((prev) => {
        const randomInterval = Math.random() * DEFAULT_TIME_INTERVAL;

        return setInterval(() => {
          const randomValue =
            Math.random() * (prev.frequency - DEFAULT_MIN_FREQUENCY) +
            DEFAULT_MIN_FREQUENCY;

          oscillators[prev.id].unit.frequency.value = randomValue;
        }, randomInterval);
      });

    return () => {
      volumeAutomations.forEach((elem) => clearInterval(elem));
      frequencyAutomations.forEach((elem) => clearInterval(elem));

      oscillators.forEach((elem, index) => {
        elem.unit.volume.value = previousSettings[index].volume;
        elem.unit.frequency.value = previousSettings[index].frequency;
      });
    };
  }, [oscillators, DEFAULT_MIN_FREQUENCY, DEFAULT_MIN_VOLUME]);

  return (
    <header>
      <h1 className="title-fade-in">generative mode.</h1>
    </header>
  );
};
