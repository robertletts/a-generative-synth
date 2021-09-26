const defaultPatchbank = {
  name: 'Endless Brew',
  oscillators: [
    {
      type: 'Pressure',
      name: 'Pressure',
      waveType: 'sine',
      volume: -20,
      frequency: 200,
    },
    {
      type: 'Plunge',
      name: 'Plunge',
      waveType: 'square',
      volume: -30,
      frequency: 1200,
    },
    {
      type: 'Stove',
      name: 'Stove',
      waveType: 'triangle',
      volume: -35,
      frequency: 1400,
    },
    {
      type: 'Filtration',
      name: 'Filtration',
      waveType: 'square',
      volume: -25,
      frequency: 300,
    },
  ],
  fx: [
    { type: 'French', name: 'French', parameters: [0.7, 0.3, 0.6] },
    { type: 'Drop', name: 'Drop', parameters: [0.25, 0.75, 0.25] },
    { type: 'Pourover', name: 'Pourover', parameters: [0.75, 1] },
    { type: 'Cold', name: 'Cold', parameters: [1, 0.2] },
  ],
};

module.exports = {
  defaultPatchbank,
};
