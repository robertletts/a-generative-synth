import { useEffect, useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext } from '../../../../../App';
import { AudioComponentsContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { currentComponentIsInFocus } from '../../../../../helpers/current-component-is-in-focus';

const COMPONENT_ID = 'RESET';

export const ResetButton = ({ dispatchAppState }) => {
  const { animationId } = useContext(AnimationIdContext);
  const { setResetState } = useContext(AudioComponentsContext);

  const animationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'grid-panel-pulse-animation'
  );

  const clickHandler = () => {
    setResetState((prev) => !prev);
    dispatchAppState({ type: 'RESET' });
  };

  const keyDownHandler = useCallback(
    (event) => {
      if (event.key === 'Enter' && currentComponentIsInFocus(COMPONENT_ID)) {
        setResetState((prev) => !prev);
        dispatchAppState({ type: 'RESET' });
      }
    },
    [setResetState, dispatchAppState]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [dispatchAppState, keyDownHandler]);

  return (
    <div
      className={`grid-panel RESET clickable utility-panel ${animationClassName}`}
      onClick={clickHandler}
      tabIndex={0}
    >
      <FontAwesomeIcon icon={['far', 'redo']} />
    </div>
  );
};
