/* 
Mock class required in order to test 
The Web Audio API (and therefore Tone.js) is a browser only API, 
and therefore not accessible within a node runtime 
*/
class Oscillator {
  constructor(frequencyValue, waveshape) {
    this.frequency = {
      value: frequencyValue,
    };
    this.type = waveshape;
    this.volume = {
      value: 0,
    };
  }

  start() {
    return this;
  }

  chain(arr) {
    return this;
  }
}

class Tremolo {
  constructor() {
    this.wet = {
      value: 0,
    };
  }

  start() {
    return this;
  }
}

class PingPongDelay {
  constructor() {
    this.wet = {
      value: 0,
    };
  }
}

class Distortion {
  constructor() {
    this.wet = {
      value: 0,
    };
  }
}

class Reverb {
  constructor() {
    this.wet = {
      value: 0,
    };
  }
}
class Limiter {
  constructor() {
    this.wet = {
      value: 0,
    };
  }
}

export class MockTone {
  constructor() {
    this.Oscillator = Oscillator;
    this.Tremolo = Tremolo;
    this.Distortion = Distortion;
    this.PingPongDelay = PingPongDelay;
    this.Reverb = Reverb;
    this.Limiter = Limiter;
    this.Destination = true;
  }
}