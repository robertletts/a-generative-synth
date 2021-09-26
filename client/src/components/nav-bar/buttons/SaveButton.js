import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../App';
import { validateClassName } from '../../../helpers/validate-class-name';

const COMPONENT_ID = 'SAVE';

export const SaveButton = ({
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
        type: 'SAVE',
        dispatchAppState: dispatchAppState,
      });
    } else {
      // Need to login prior to being able use save functionality
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
      className={`sidebar-component account-access-component ${animationClassName}`}
      onClick={clickHandler}
    >
      <FontAwesomeIcon icon={['far', 'file-upload']} />
      <p className="sidebar-component-label">Save</p>
    </button>
  );
};
