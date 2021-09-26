import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext, useRef } from 'react';
import { AudioComponentsContext } from '../../../../../../App';
import { loadNewFxParameters } from '../../../../../../helpers/load-new-fx-parameters';

export const LoadPanel = ({ dispatchAppState }) => {
  const { oscillators, setOscillators, fx, setFx } = useContext(
    AudioComponentsContext
  );

  const loadingText = <i style={{ fontSize: '2vh' }}>loading patches...</i>;

  const [currentPatch, setCurrentPatch] = useState(loadingText);
  const [patchBank, setPatchBank] = useState();
  const patchIndex = useRef(0);

  // onLoad, make a post request to the database for the current users stored data
  useEffect(() => {
    const fetchUsersPatchBank = async () => {
      const response = await fetch('/load-patch-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();
      if (data && data.length > 0) {
        setPatchBank(data);
        setCurrentPatch(data[0].name);
      } else {
        setCurrentPatch(<i style={{ fontSize: '2vh' }}>no saved patches...</i>);
      }
    };
    fetchUsersPatchBank();
  }, []);

  const deleteClickHandler = (event) => {
    event.preventDefault();
    const data = { name: currentPatch };
    const deleteCurrentPatch = async () => {
      await fetch('/patch-bank', {
        body: JSON.stringify(data),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
    };

    if (patchBank) {
      deleteCurrentPatch();
      dispatchAppState({ type: 'DELETE_CONFIRM', patch: currentPatch });
    } else {
      const notificationString = 'there is no patch to delete...';
      const notificationStyle = { fontSize: '2vh' };
      setCurrentPatch(<i style={notificationStyle}>{notificationString}</i>);
    }
  };

  const loadClickHandler = () => {
    if (patchBank) {
      const {
        oscillators: newOscillators,
        fx: newFx,
        name,
      } = patchBank.filter((elem) => elem.name === currentPatch).at(0);

      setOscillators(() => {
        return oscillators.map((elem, index) => {
          const oscillatorBeingLoaded = newOscillators[index];
          elem.label = oscillatorBeingLoaded.name;
          elem.unit.type = oscillatorBeingLoaded.waveType;
          elem.unit.frequency.value = oscillatorBeingLoaded.frequency;
          elem.unit.volume.value = oscillatorBeingLoaded.volume;
          return elem;
        });
      });

      setFx(() => {
        return [
          loadNewFxParameters.tremolo(fx[0], newFx[0]),
          loadNewFxParameters.delay(fx[1], newFx[1]),
          loadNewFxParameters.reverb(fx[2], newFx[2]),
          loadNewFxParameters.distortion(fx[3], newFx[3]),
        ];
      });

      dispatchAppState({ type: 'LOAD_CONFIRM', patch: name });
    }
  };

  const cancelClickHandler = () => dispatchAppState({ type: 'RETURN' });

  const getNextPatch = () => {
    if (patchBank && patchIndex.current < patchBank.length - 1) {
      const current = patchBank[++patchIndex.current];
      setCurrentPatch(current.name);
    }
  };

  const getPreviousPatch = () => {
    if (patchBank && patchIndex.current > 0) {
      const current = patchBank[--patchIndex.current];
      setCurrentPatch(`${current.name}: ${current.parameter}`);
    }
  };

  return (
    <div className="patch-access-container">
      <p>choose a patch!</p>
      <div className="patch-text-display">{currentPatch}</div>

      <div className="patch-access-control-panel">
        <div onClick={getPreviousPatch}>
          <FontAwesomeIcon
            icon={['far', 'arrow-left']}
            className="control-panel-symbol"
          />
        </div>
        <button onClick={loadClickHandler}>load!</button>
        <button onClick={cancelClickHandler}>cancel?</button>
        <div onClick={getNextPatch}>
          {' '}
          <FontAwesomeIcon
            icon={['far', 'arrow-right']}
            className="control-panel-symbol"
          />
        </div>
      </div>
      <div onClick={deleteClickHandler}>
        <FontAwesomeIcon
          icon={['far', 'trash']}
          className="control-panel-symbol"
        />
      </div>
    </div>
  );
};
