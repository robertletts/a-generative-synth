import { useContext } from 'react';
import { DisplayVisibleContext } from '../../../../../App';
import { MuteButton } from '../buttons/MuteButton';
import { ResetButton } from '../buttons/ResetButton';

export const UtilitiesContainer = ({ appState, dispatchAppState }) => {
  const { displayVisible } = useContext(DisplayVisibleContext);
  return (
    <>
      <div style={displayVisible ? {} : { display: 'none' }}>
        <MuteButton appState={appState} dispatchAppState={dispatchAppState} />
      </div>

      <div style={displayVisible ? {} : { display: 'none' }}>
        <ResetButton appState={appState} dispatchAppState={dispatchAppState} />
      </div>
    </>
  );
};
