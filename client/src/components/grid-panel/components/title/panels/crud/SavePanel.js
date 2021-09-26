import { useState, useRef, useContext } from 'react';
import { AudioComponentsContext } from '../../../../../../App';
import { patchBankValidation } from '../../../../../../validations/patch-bank-validation';
import { extractFxData } from '../../../../../../helpers/extract-fx-data';
import { extractOscillatorData } from '../../../../../../helpers/extract-oscillator-data';
import { entryIsNotEmpty } from '../../../../../../helpers/entry-is-not-empty';
import { postData } from '../../../../../../helpers/post-data';

export const SavePanel = ({ dispatchAppState }) => {
  const { oscillators, fx } = useContext(AudioComponentsContext);
  const form = useRef(null);
  const [promptText, setPromptText] = useState('choose a name!');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const fxData = extractFxData(fx);
    const oscillatorData = oscillators.map((elem) => {
      return extractOscillatorData(elem);
    });

    const data = {
      name: event.target[0].value,
      oscillators: oscillatorData,
      fx: fxData,
    };

    const validEntry =
      entryIsNotEmpty(data.name) && (await patchBankValidation.isValid(data));

    if (validEntry) {
      postData(data);
      dispatchAppState({ type: 'SAVE_CONFIRM', patch: data.name });
    } else {
      setPromptText('name cannot be empty!');
    }
  };

  const cancelClickHandler = () => dispatchAppState({ type: 'RETURN' });

  return (
    <div className="patch-access-container">
      <form onSubmit={onSubmitHandler} ref={form} className="save-form">
        <label htmlFor="patch-save-input">
          <p>{promptText}</p>
        </label>
        <input
          type="text"
          className="patch-save-input"
          name="patch-save-input"
        />
        <input type="submit" style={{ display: 'none' }} />

        <div className="patch-access-control-panel patch-save-control-panel">
          <button>save!</button>
          <button onClick={cancelClickHandler}>cancel?</button>
        </div>
      </form>
    </div>
  );
};
