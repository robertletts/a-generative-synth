const tremolo = (prevTremolo, newTremolo) => {
  prevTremolo.label = newTremolo.name;
  prevTremolo.unit.depth.value = newTremolo.parameters[0];
  prevTremolo.unit.frequency.value = newTremolo.parameters[1];
  prevTremolo.unit.wet.value = newTremolo.parameters[2];
  return prevTremolo;
};
const delay = (prevDelay, newDelay) => {
  prevDelay.label = newDelay.name;
  prevDelay.unit.delayTime.value = newDelay.parameters[0];
  prevDelay.unit.feedback.value = newDelay.parameters[1];
  prevDelay.unit.wet.value = newDelay.parameters[2];
  return prevDelay;
};
const reverb = (prevReverb, newReverb) => {
  prevReverb.label = newReverb.name;
  prevReverb.unit.decay = newReverb.parameters[0];
  prevReverb.unit.wet.value = newReverb.parameters[1];
  return prevReverb;
};

const distortion = (prevDistortion, newDistortion) => {
  prevDistortion.label = newDistortion.name;
  prevDistortion.unit.distortion = newDistortion.parameters[0];
  prevDistortion.unit.wet.value = newDistortion.parameters[1];
  return prevDistortion;
};

export const loadNewFxParameters = {
  tremolo,
  delay,
  reverb,
  distortion,
};
