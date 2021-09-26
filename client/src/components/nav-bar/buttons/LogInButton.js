import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../App';
import { validateClassName } from '../../../helpers/validate-class-name';

const COMPONENT_ID = 'ACCOUNT_ACCESS';

export const LogInButton = ({
  dispatchAppState,
  loginAttemptActive,
  setLoginAttemptActive,
}) => {
  const { animationId } = useContext(AnimationIdContext);

  const clickHandler = () => {
    dispatchAppState({
      type: loginAttemptActive ? 'RETURN' : 'LOGIN',
      dispatchAppState: dispatchAppState,
      setLoginAttemptActive: setLoginAttemptActive,
    });
    setLoginAttemptActive((prevState) => !prevState);
  };

  // Ascertain the status of the components tutorial-animation state
  const animationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'sidebar-pulse-animation'
  );

  return (
    <button
      name="account-access"
      className={`sidebar-component account-access-component ${animationClassName}`}
      onClick={clickHandler}
    >
      {loginAttemptActive ? (
        <>
          <FontAwesomeIcon icon={['far', 'window-close']} />
          <p className="sidebar-component-label">Cancel</p>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={['far', 'sign-in']} />
          <p className="sidebar-component-label">Sign-In</p>
        </>
      )}
    </button>
  );
};
