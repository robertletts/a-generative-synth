import { useEffect, useRef, useContext } from 'react';
import { AudioComponentsContext } from '../../../App';

export const RenameModal = ({
  currentLabel,
  setCurrentLabel,
  setDisplayVisible,
  type,
  setShowRenameModal,
}) => {
  const { oscillators, setOscillators, fx, setFx } = useContext(
    AudioComponentsContext
  );
  const inputTextBox = useRef(null);

  /**
   * Reverts to default display mode on Escape key input
   */
  useEffect(() => {
    inputTextBox.current.focus();
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        setDisplayVisible(() => true);
        setShowRenameModal(() => false);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [setDisplayVisible, setShowRenameModal]);

  /**
   * Reverts to default display mode on form submit
   */
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Update labels in context so UI maps directly to the save state
    setOscillators(() => {
      return oscillators.map((elem) => {
        if (elem.type === type) elem.label = currentLabel;
        return elem;
      });
    });

    setFx(() => {
      return fx.map((elem) => {
        if (elem.type === type) elem.label = currentLabel;
        return elem;
      });
    });
    setDisplayVisible(() => true);
    setShowRenameModal(() => false);
  };

  // Updates current unit display value dynamically according to user input
  const updateLabel = (event) => setCurrentLabel(() => event.target.value);

  return (
    <div className="modal">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="input-text-field">
          <h2>Rename {currentLabel}</h2>
        </label>
        <input
          type="text"
          onChange={updateLabel}
          ref={inputTextBox}
          className="input-text-field"
          name="input-text-field"
        ></input>
      </form>
      <br />
    </div>
  );
};
