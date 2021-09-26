import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext } from '../../../App';
import { useContext } from 'react';
import { validateClassName } from '../../../helpers/validate-class-name';

const COMPONENT_ID = 'LOAD';

export const LoadButton = ({
  dispatchAppState,
  appState,
  setLoginAttemptActive,
}) => {
  const { animationId } = useContext(AnimationIdContext);
  const animationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'sidebar-pulse-animation'
  );

  const clickHandler = () => {
    if (appState.signedIn) {
      dispatchAppState({
        type: 'LOAD',
        dispatchAppState: dispatchAppState,
      });
    } else {
      // Need to login prior to being able use load functionality
      dispatchAppState({
        type: 'LOGIN',
        dispatchAppState: dispatchAppState,
        setLoginAttemptActive: setLoginAttemptActive,
      });
      setLoginAttemptActive(() => true);
    }
  };

  return (
    <button
      className={`sidebar-component ${animationClassName}`}
      onClick={clickHandler}
    >
      <FontAwesomeIcon icon={['far', 'file-download']} />
      <p className="sidebar-component-label">Load</p>
    </button>
  );
};
