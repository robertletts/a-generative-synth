import { TutorialController } from '../../../../../../controllers/TutorialController';
import { useState, useEffect, useCallback, useContext } from 'react';
import { AnimationIdContext } from '../../../../../../App';

const tutorialController = new TutorialController();

export const TutorialPanel = () => {
  const { setAnimationId } = useContext(AnimationIdContext);
  const [tutorialText, setTutorialText] = useState('');

  /**
   * Initiate tutorial state, triggering animations
   * and display text
   */
  const updateTutorialState = useCallback(
    ({ copy, animationId }) => {
      setAnimationId(animationId);
      setTutorialText(copy);
    },
    [setAnimationId, setTutorialText]
  );

  /**
   * Provides tutorial navigation functionality
   */
  const keyDownHandler = useCallback(
    (keydown) => {
      const keyIsLeft = keydown.keyCode === 37;
      const keyIsRight = keydown.keyCode === 39;
      const tutorialHasPrevious = tutorialController.hasPrevious();
      const tutorialHasNext = tutorialController.hasNext();

      if (keyIsLeft && tutorialHasPrevious) {
        updateTutorialState(tutorialController.previous());
      } else if (keyIsRight && tutorialHasNext) {
        updateTutorialState(tutorialController.next());
      }
    },
    [updateTutorialState]
  );

  /**
   * Setup and cleanup key event listeners
   * throughout tutorial mode lifecycle
   */
  useEffect(() => {
    updateTutorialState(tutorialController.start());
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      setAnimationId(null);
    };
  }, [setAnimationId, keyDownHandler, updateTutorialState]);

  return (
    <p className="title-panel">
      {tutorialText.split('\n').map((line) => {
        return (
          <>
            {line} <br />
          </>
        );
      })}
    </p>
  );
};
