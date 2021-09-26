import { TremoloPanel } from '../panels/TremoloPanel';
import { DelayPanel } from '../panels/DelayPanel';
import { ReverbPanel } from '../panels/ReverbPanel';
import { DistortionPanel } from '../panels/DistortionPanel';
import { useContext } from 'react';
import { AudioComponentsContext } from '../../../../../App';

export const FxContainer = ({ appState }) => {
  const { fx, resetState } = useContext(AudioComponentsContext);
  const [tremolo, delay, reverb, distortion] = fx;

  return (
    <>
      <TremoloPanel fx={tremolo} appState={appState} resetState={resetState} />
      <DelayPanel fx={delay} appState={appState} resetState={resetState} />
      <ReverbPanel fx={reverb} appState={appState} resetState={resetState} />
      <DistortionPanel
        fx={distortion}
        appState={appState}
        resetState={resetState}
      />
    </>
  );
};
