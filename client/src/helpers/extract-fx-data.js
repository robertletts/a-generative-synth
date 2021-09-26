const extractTremoloData = (elem) => {
  return {
    type: elem.type,
    name: elem.label,
    parameters: [
      elem.unit.depth.value,
      elem.unit.frequency.value,
      elem.unit.wet.value,
    ],
  };
};

const extractDelayData = (elem) => {
  return {
    type: elem.type,
    name: elem.label,
    parameters: [
      elem.unit.delayTime.value,
      elem.unit.feedback.value,
      elem.unit.wet.value,
    ],
  };
};

const extractReverbData = (elem) => {
  return {
    type: elem.type,
    name: elem.label,
    parameters: [elem.unit.decay, elem.unit.wet.value],
  };
};

const extractDistortionData = (elem) => {
  return {
    type: elem.type,
    name: elem.label,
    parameters: [elem.unit.distortion, elem.unit.wet.value],
  };
};

export const extractFxData = (fx) => {
  return [
    extractTremoloData(fx[0]),
    extractDelayData(fx[1]),
    extractReverbData(fx[2]),
    extractDistortionData(fx[3]),
  ];
};
