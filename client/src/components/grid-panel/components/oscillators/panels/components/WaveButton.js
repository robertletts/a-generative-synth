import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AnimationIdContext } from '../../../../../../App';

const WAVE_COMPONENT_ID = 'WAVE';

export const WaveButton = ({ waveType, setWaveShape, index }) => {
  const { animationId } = useContext(AnimationIdContext);

  const generateAnimationStyle = (time) => {
    return WAVE_COMPONENT_ID === animationId
      ? {
          animation: `waveshape-pulse 3s infinite`,
          animationDelay: `${time}s`,
        }
      : {};
  };

  const clickHandler = () => {
    setWaveShape(waveType);
  };

  return (
    <button onClick={clickHandler}>
      <FontAwesomeIcon
        icon={['far', `wave-${waveType}`]}
        className={`wave-icon`}
        style={generateAnimationStyle(index)}
      />
    </button>
  );
};
