import { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationIdContext, DisplayVisibleContext } from '../../../../../App';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { RenameModal } from '../../../modals/RenameModal';
import { Slider } from '@mui/material';

const id = 'FX';
const groupId = 'ALLFX';

export const DelayPanel = ({ fx, resetState }) => {
  const { unit, label, type, parameters } = fx;
  const [time, repeats, wet] = parameters;

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
  useEffect(() => setCurrentLabel(label), [label]);

  const [showRenameModal, setShowRenameModal] = useState(false);

  /**
   * All audio state
   */
  const [timeValue, setTimeValue] = useState(time.defaultValue * 100);
  const timeSlider = useRef(null);
  useEffect(() => (unit.delayTime.value = timeValue / 100), [timeValue, unit]);

  const [repeatsValue, setRepeatsValue] = useState(repeats.defaultValue * 100);
  const repeatsSlider = useRef(null);
  useEffect(
    () => (unit.feedback.value = repeatsValue / 100),
    [repeatsValue, unit]
  );

  const [wetValue, setWetValue] = useState(wet.defaultValue * 100);
  const wetSlider = useRef(null);
  useEffect(() => (unit.wet.value = wetValue / 100), [wetValue, unit]);

  /**
   * All reset logic
   */
  useEffect(() => {
    setTimeValue(time.defaultValue * 100);
    setRepeatsValue(repeats.defaultValue * 100);
    setWetValue(wet.defaultValue * 100);
    time.reset();
    repeats.reset();
    wet.reset();
  }, [resetState, time, wet, repeats]);

  /**
   * All load logic
   */
  useEffect(() => {
    setTimeValue(unit.delayTime.value * 100);
    setRepeatsValue(unit.feedback.value * 100);
    setWetValue(unit.wet.value * 100);
  }, [unit.delayTime.value, unit.wet.value, unit.feedback.value]);

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

        <label htmlFor={'time-slider'}>{time.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="time-slider"
            ref={timeSlider}
            value={timeValue}
            min={time.min}
            max={time.max * 100}
            size="small"
            defaultValue={time.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setTimeValue(event.target.value)}
          />
        </div>

        <label htmlFor={'repeats-slider'}>{repeats.label}</label>
        <div className="slider-wrapper">
          <Slider
            name="repeats-slider"
            ref={repeatsSlider}
            value={repeatsValue}
            min={repeats.min}
            max={repeats.max * 100}
            size="small"
            defaultValue={repeats.defaultValue * 100}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => setRepeatsValue(event.target.value)}
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
