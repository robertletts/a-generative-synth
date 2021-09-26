import { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext, DisplayVisibleContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { RenameModal } from '../../../modals/RenameModal';
import { Slider } from '@mui/material';

const id = 'FX';
const groupId = 'ALLFX';

export const DistortionPanel = ({ fx, resetState }) => {
  const { unit, label, type, parameters } = fx;
  const [dirt, wet] = parameters;

  /**
   * All view logic
   */
  const { animationId } = useContext(AnimationIdContext);
  const { displayVisible, setDisplayVisible } = useContext(
    DisplayVisibleContext
  );
  const doubleClickHandler = () => {
    setDisplayVisible(() => false);
    setShowRenameModal(() => true);
  };

  const panelAnimationClassName = validateClassName(
    animationId,
    id,
    'grid-panel-pulse-animation'
  );

  const labelAnimationClassName = validateClassName(
    animationId,
    label.toUpperCase(),
    'grid-panel-title-pulse-animation'
  );

  const groupAnimationClassName = validateClassName(
    animationId,
    groupId,
    'grid-panel-title-pulse-animation'
  );

  const [currentLabel, setCurrentLabel] = useState(label);
  useEffect(() => {
    setCurrentLabel(label);
  }, [label]);

  const [showRenameModal, setShowRenameModal] = useState(false);

  /**
   * All audio state
   */
  const [dirtValue, setDirtValue] = useState(dirt.defaultValue * 100);
  const dirtSlider = useRef(null);
  useEffect(() => (unit.distortion = dirtValue / 100), [dirtValue, unit]);

  const [wetValue, setWetValue] = useState(wet.defaultValue * 100);
  const wetSlider = useRef(null);
  useEffect(() => (unit.wet.value = wetValue / 100), [wetValue, unit]);

  /**
   * All reset logic
   */
  useEffect(() => {
    setDirtValue(dirt.defaultValue * 100);
    setWetValue(wet.defaultValue * 100);
    dirt.reset();
    wet.reset();
  }, [resetState, dirt, wet]);

  /**
   * All load logic
   */
  useEffect(() => {
    setDirtValue(unit.distortion * 100);
    setWetValue(unit.wet.value * 100);
  }, [unit.distortion, unit.wet.value]);

  return (
    <>
      <div
        className={`grid-panel ${panelAnimationClassName}`}
        onDoubleClick={doubleClickHandler}
        style={displayVisible ? {} : { display: 'none' }}
      >
        <h4 className={`${labelAnimationClassName} ${groupAnimationClassName}`}>
          {currentLabel}
        </h4>

        <label htmlFor={'dirt-slider'}>{dirt.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="dirt-slider"
            ref={dirtSlider}
            value={dirtValue}
            min={dirt.min}
            max={dirt.max * 100}
            size="small"
            defaultValue={dirt.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setDirtValue(event.target.value)}
          />
        </div>

        <label htmlFor={'wet-slider'}>{wet.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="parameter-slider"
            ref={wetSlider}
            value={wetValue}
            min={wet.min}
            max={wet.max * 100}
            size="small"
            defaultValue={wet.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setWetValue(event.target.value)}
          />
        </div>

        <FontAwesomeIcon icon={['far', 'waveform-path']} />
      </div>
      {showRenameModal ? (
        <div className="modal-container">
          <RenameModal
            currentLabel={currentLabel}
            setCurrentLabel={setCurrentLabel}
            type={type}
            setDisplayVisible={setDisplayVisible}
            setShowRenameModal={setShowRenameModal}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};
