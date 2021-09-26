import { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext, DisplayVisibleContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { RenameModal } from '../../../modals/RenameModal';
import { Slider } from '@mui/material';

const id = 'FX';
const groupId = 'ALLFX';

export const ReverbPanel = ({ fx, resetState }) => {
  const { unit, label, type, parameters } = fx;
  const [size, wet] = parameters;

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
  const [sizeValue, setSizeValue] = useState(size.defaultValue * 100);
  const sizeSlider = useRef(null);
  useEffect(() => (unit.decay = sizeValue / 100), [sizeValue, unit]);

  const [wetValue, setWetValue] = useState(wet.defaultValue * 100);
  const wetSlider = useRef(null);
  useEffect(() => (unit.wet.value = wetValue / 100), [wetValue, unit]);

  /**
   * All reset logic
   */
  useEffect(() => {
    setSizeValue(size.defaultValue * 100);
    setWetValue(wet.defaultValue * 100);
    size.reset();
    wet.reset();
  }, [resetState, size, wet]);

  /**
   * All load logic
   */
  useEffect(() => {
    setSizeValue(unit.decay * 100);
    setWetValue(unit.wet.value * 100);
  }, [unit.decay, unit.wet.value]);

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

        <label htmlFor={'size-slider'}>{size.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="size-slider"
            ref={sizeSlider}
            value={sizeValue}
            min={size.min}
            max={size.max * 100}
            size="small"
            defaultValue={size.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setSizeValue(event.target.value)}
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
