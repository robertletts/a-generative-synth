import { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext, DisplayVisibleContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { RenameModal } from '../../../modals/RenameModal';
import { Slider } from '@mui/material';

const id = 'FX';
const groupId = 'ALLFX';

export const TremoloPanel = ({ fx, resetState }) => {
  const { unit, label, type, parameters } = fx;
  const [depth, speed, wet] = parameters;

  /**
   * All view logic
   */
  const [showRenameModal, setShowRenameModal] = useState(false);
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

  /**
   * All audio state
   */
  const [depthValue, setDepthValue] = useState(depth.defaultValue * 100);
  const depthSlider = useRef(null);
  useEffect(() => (unit.depth.value = depthValue / 100), [depthValue, unit]);

  const [speedValue, setSpeedValue] = useState(speed.defaultValue * 100);
  const speedSlider = useRef(null);
  useEffect(
    () => (unit.frequency.value = speedValue / 100),
    [speedValue, unit]
  );

  const [wetValue, setWetValue] = useState(wet.defaultValue * 100);
  const wetSlider = useRef(null);
  useEffect(() => (unit.wet.value = wetValue / 100), [wetValue, unit]);

  /**
   * All reset logic
   */
  useEffect(() => {
    setDepthValue(depth.defaultValue * 100);
    setSpeedValue(speed.defaultValue * 100);
    setWetValue(wet.defaultValue * 100);
    depth.reset();
    speed.reset();
    wet.reset();
  }, [resetState, depth, wet, speed]);

  /**
   * All load logic
   */
  useEffect(() => {
    setDepthValue(unit.depth.value * 100);
    setSpeedValue(unit.frequency.value * 100);
    setWetValue(unit.wet.value * 100);
  }, [unit.depth.value, unit.wet.value, unit.frequency.value]);

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

        <label htmlFor={'depth-slider'}>{depth.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="depth-slider"
            ref={depthSlider}
            value={depthValue}
            min={depth.min}
            max={depth.max * 100}
            size="small"
            defaultValue={depth.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setDepthValue(event.target.value)}
          />
        </div>

        <label htmlFor="speed-slider">{speed.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="speed-slider"
            ref={speedSlider}
            value={speedValue}
            min={speed.min}
            max={speed.max * 100}
            size="small"
            defaultValue={speed.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setSpeedValue(event.target.value)}
          />
        </div>

        <label htmlFor="wet-slider">{wet.label}</label>
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
