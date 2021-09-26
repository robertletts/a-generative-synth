import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../App';
import { validateClassName } from '../../../helpers/validate-class-name';

const COMPONENT_ID = 'GENERATIVE_MODE';

export const GenerativeButton = ({ appState, dispatchAppState }) => {
  const { animationId } = useContext(AnimationIdContext);
  const animationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'sidebar-pulse-animation'
  );

  const clickHandler = () => {
    dispatchAppState({
      type: appState.generative ? 'GENERATIVE_OFF' : 'GENERATIVE',
    });
  };

  return (
    <button
      className={`sidebar-component account-access-component ${animationClassName}`}
      onClick={clickHandler}
    >
      {appState.generative ? (
        <FontAwesomeIcon icon={['far', 'pause-circle']} />
      ) : (
        <FontAwesomeIcon icon={['far', 'play-circle']} />
      )}
      <p className="sidebar-component-label">Generative Mode</p>
    </button>
  );
};
