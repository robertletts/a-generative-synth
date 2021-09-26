/* EXTERNAL COMPONENTS */
import { useContext } from 'react';
import { DisplayVisibleContext } from '../../../App';
import { UtilitiesContainer } from '../components/utilities/containers/UtilitiesContainer';
import { OscillatorContainer } from '../components/oscillators/containers/OscillatorContainer';
import { FxContainer } from '../components/fx/containers/FxContainer';
import { DisplayContainer } from '../components/title/containers/DisplayContainer';

export const GridPanelContainer = ({
  appState,
  dispatchAppState,
  setDisplayVisible,
}) => {
  const { displayVisible } = useContext(DisplayVisibleContext);

  return (
    <div className="grid-panel-container">
      <header
        className={'grid-panel title-panel'}
        style={displayVisible ? {} : { display: 'none' }}
      >
        <DisplayContainer appState={appState} />
      </header>
      <UtilitiesContainer
        appState={appState}
        dispatchAppState={dispatchAppState}
      />
      <OscillatorContainer
        appState={appState}
        setDisplayVisible={setDisplayVisible}
        displayVisible={displayVisible}
      />
      <FxContainer
        appState={appState}
        setDisplayVisible={setDisplayVisible}
        displayVisible={displayVisible}
      />
    </div>
  );
};
