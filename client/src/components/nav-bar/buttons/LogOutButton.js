import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../App';
import { validateClassName } from '../../../helpers/validate-class-name';

const COMPONENT_ID = 'ACCOUNT_ACCESS';

export const LogOutButton = ({ dispatchAppState, setLoginAttemptActive }) => {
  const { animationId } = useContext(AnimationIdContext);

  const clickHandler = () => {
    // Destroy webtoken so future sessions require login
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatchAppState({ type: 'LOGOUT_CONFIRM' });
    setLoginAttemptActive(() => false);
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
      <>
        <FontAwesomeIcon icon={['far', 'sign-out']} />
        <p className="sidebar-component-label">Sign-Out</p>
      </>
    </button>
  );
};
