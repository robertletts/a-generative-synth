import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './App';
import { audioConfiguration } from './helpers/audio-configuration';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Tone from 'tone';
import { faIcons } from './images/faIcons';

// Configure global icon library prior to first render
library.add(...faIcons);

// Configure global audio components prior to first render
const { oscillators, fx } = audioConfiguration(Tone);

// On first user gesture ONLY, trigger global audio context (required for Chrome)
document.addEventListener('click', () => Tone.start(), { once: true });

ReactDOM.render(
  <React.StrictMode>
    <App oscillators={oscillators} fx={fx} />
  </React.StrictMode>,
  document.getElementById('root')
);
