const mongoose = require('mongoose');

const patchBankSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  oscillators: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      waveType: { type: String, required: true },
      volume: { type: Number, required: true },
      frequency: { type: Number, required: true },
    },
  ],
  fx: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      parameters: { type: [Number], required: true },
    },
  ],
});

module.exports = patchBankSchema;
