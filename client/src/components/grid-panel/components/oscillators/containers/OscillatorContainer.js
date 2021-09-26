import { AudioComponentsContext } from '../../../../../App';
import { OscillatorPanel } from '../panels/OscillatorPanel';
import { useContext } from 'react';
// import uniqueId from 'lodash/uniqueId';

export const OscillatorContainer = ({ appState }) => {
  const { oscillators, resetState } = useContext(AudioComponentsContext);

  return (
    <>
      {oscillators.map((elem, index) => (
        <OscillatorPanel
          /* 
          Key is used as index as this is the rare instance 
          where ordering will never change, and does not 
          need to be futureproofed 
          */
          key={index}
          oscillator={elem}
          appState={appState}
          resetState={resetState}
        />
      ))}
    </>
  );
};
