import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../App';
import { validateListOfClassNames } from '../../../helpers/validate-class-name-list';

const COMPONENT_IDS = ['TUTORIAL', 'EJECT'];

export const TutorialButton = ({ appState, dispatchAppState }) => {
  const { animationId, setAnimationId } = useContext(AnimationIdContext);

  const clickHandler = () => {
    dispatchAppState({ type: appState.tutorial ? 'RETURN' : 'TUTORIAL' });
    // Tutorial will no longer pulse after first click
    setAnimationId(null);
  };

  const animationClassName = validateListOfClassNames(
    animationId,
    COMPONENT_IDS,
    'sidebar-pulse-animation'
  );

  return (
    <button
      className={`sidebar-component ${animationClassName}`}
      onClick={clickHandler}
    >
      {appState.tutorial ? (
        <>
          <FontAwesomeIcon icon={['far', 'eject']} />
        </>
      ) : (
        <FontAwesomeIcon icon={['far', 'book']} />
      )}
      <p className="sidebar-component-label">Tutorial Mode</p>
    </button>
  );
};
