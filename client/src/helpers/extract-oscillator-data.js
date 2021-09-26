export const extractOscillatorData = (elem) => {
  return {
    type: elem.type,
    name: elem.label,
    waveType: elem.unit.type,
    volume: elem.unit.volume.value,
    frequency: elem.unit.frequency.value,
  };
};
