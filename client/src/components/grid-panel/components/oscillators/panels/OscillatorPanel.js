import { useState, useEffect, useRef, useContext } from 'react';
import { AnimationIdContext, DisplayVisibleContext } from '../../../../../App';
import { WaveButton } from './components/WaveButton';
import { validateClassName } from '../../../../../helpers/validate-class-name';
import { RenameModal } from '../../../modals/RenameModal';
import { defaultOscillatorSettings } from '../../../../../data/default-oscillator-settings';
import { Slider } from '@mui/material';
import uniqueId from 'lodash/uniqueId';

// GLOBAL CONSTANTS
const GROUP_COMPONENT_ID = 'ALLOSCILLATORS';
const COMPONENT_ID = 'OSCILLATOR';

const {
  DEFAULT_WAVE_TYPES,
  DEFAULT_FREQUENCY,
  DEFAULT_WAVESHAPE,
  DEFAULT_MIN_FREQUENCY,
  DEFAULT_MAX_FREQUENCY,
  DEFAULT_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MAX_VOLUME,
} = defaultOscillatorSettings;

export const OscillatorPanel = ({ appState, oscillator, resetState }) => {
  const { unit, label, reset, type } = oscillator;

  /**
   * Animation State
   */
  const { animationId } = useContext(AnimationIdContext);
  const { displayVisible, setDisplayVisible } = useContext(
    DisplayVisibleContext
  );

  /**
   * Tutorial Animation Logic
   */
  const renameAnimationClassName = validateClassName(
    animationId,
    COMPONENT_ID,
    'grid-panel-title-pulse-animation'
  );
  const allOscillatorAnimationClassName = validateClassName(
    animationId,
    GROUP_COMPONENT_ID,
    'grid-panel-pulse-animation'
  );

  /**
   * Label State
   */
  const [currentLabel, setCurrentLabel] = useState(label);
  useEffect(() => setCurrentLabel(label), [label]);

  /**
   * Label Rename Logic
   */
  const [showRenameModal, setShowRenameModal] = useState(false);
  const doubleClickHandler = () => {
    setDisplayVisible(() => false);
    setShowRenameModal(() => true);
  };

  /**
   * Pitch State
   */
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);
  const frequencySlider = useRef(null);
  useEffect(() => (unit.frequency.value = frequency), [frequency, unit]);

  /**
   * Volume State
   */
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const volumeSlider = useRef(null);
  useEffect(() => {
    if (appState.mute) unit.volume.value = DEFAULT_VOLUME;
    else {
      unit.volume.value = volume;
      setVolume(unit.volume.value);
    }
  }, [appState.mute, unit, volume]);

  /**
   * Waveshape State
   */
  const [waveShape, setWaveShape] = useState(DEFAULT_WAVESHAPE);
  useEffect(() => (unit.type = waveShape), [unit, waveShape]);

  /**
   * Load logic
   */
  useEffect(() => setFrequency(unit.frequency.value), [unit.frequency.value]);
  useEffect(() => setVolume(unit.volume.value), [unit.volume.value]);

  /**
   * Reset Mode Logic
   */
  useEffect(() => {
    setVolume(DEFAULT_VOLUME);
    setFrequency(DEFAULT_FREQUENCY);
    setWaveShape(DEFAULT_WAVESHAPE);
    reset();
  }, [resetState, reset]);

  return (
    <>
      <div
        className={`grid-panel ${allOscillatorAnimationClassName}`}
        onDoubleClick={doubleClickHandler}
        style={displayVisible ? {} : { display: 'none' }}
      >
        <h4 className={renameAnimationClassName}>{currentLabel}</h4>

        <div className="wave-buttons-container">
          {DEFAULT_WAVE_TYPES.map((waveType, index) => {
            return (
              <WaveButton
                waveType={waveType}
                index={index}
                key={uniqueId('waveShape')}
                setWaveShape={setWaveShape}
              />
            );
          })}
        </div>

        <label htmlFor="volume-slider">Volume</label>
        <div className="slider-wrapper">
          <Slider
            name="volume-slider"
            ref={volumeSlider}
            value={volume}
            min={DEFAULT_MIN_VOLUME}
            max={DEFAULT_MAX_VOLUME}
            size="small"
            defaultValue={DEFAULT_VOLUME}
            style={{ color: 'black', height: '0.1rem', zIndex: '0' }}
            onChange={(event) => {
              setVolume(event.target.value);
            }}
          />
        </div>

        <label htmlFor="frequency-slider">Pitch</label>
        <div className="slider-wrapper">
          <Slider
            name="frequency-slider"
            ref={frequencySlider}
            value={frequency}
            min={DEFAULT_MIN_FREQUENCY}
            max={DEFAULT_MAX_FREQUENCY}
            size="small"
            defaultValue={DEFAULT_FREQUENCY}
            style={{ color: 'black', height: '0.1rem' }}
            onChange={(event) => {
              setFrequency(event.target.value);
            }}
          />
        </div>
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
