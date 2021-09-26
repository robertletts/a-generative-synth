import { useEffect, useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { currentComponentIsInFocus } from '../../../../../helpers/current-component-is-in-focus';

const COMPONENT_ID = 'MUTE';

export const MuteButton = ({ appState, dispatchAppState }) => {
  const { animationId } = useContext(AnimationIdContext);
  const animationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'grid-panel-pulse-animation'
  );

  const clickHandler = () => {
    dispatchAppState({ type: appState.mute ? 'UNMUTE' : 'MUTE' });
  };

  const keyDownHandler = useCallback(
    (event) => {
      if (event.key === 'Enter' && currentComponentIsInFocus(COMPONENT_ID)) {
        dispatchAppState({ type: appState.mute ? 'UNMUTE' : 'MUTE' });
      }
    },
    [appState.mute, dispatchAppState]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [dispatchAppState, keyDownHandler]);

  return (
    <div
      className={`grid-panel MUTE utility-panel ${animationClassName}`}
      onClick={clickHandler}
      tabIndex={0}
    >
      <FontAwesomeIcon
        icon={['far', appState.mute ? 'volume-off' : 'volume']}
      />
    </div>
  );
};
