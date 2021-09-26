import { NavBarContainer } from './components/nav-bar/containers/NavBarContainer';
import { GridPanelContainer } from './components/grid-panel/containers/GridPanelContainer';
import { appReducer } from './helpers/app-reducer';
import { defaultAppState } from './default-state/default-app-state';
import { createContext, useState, useReducer, useEffect } from 'react';

export const AudioComponentsContext = createContext();
export const AnimationIdContext = createContext();
export const DisplayVisibleContext = createContext();

export const App = ({ oscillators: defaultOscillators, fx: defaultFx }) => {
  const [oscillators, setOscillators] = useState(defaultOscillators);
  const [fx, setFx] = useState(defaultFx);
  const [animationId, setAnimationId] = useState('TUTORIAL');
  const [displayVisible, setDisplayVisible] = useState(true);
  const [appState, dispatchAppState] = useReducer(appReducer, defaultAppState);
  const [resetState, setResetState] = useState(false);
  const [loginAttemptActive, setLoginAttemptActive] = useState(false);

  // Login process already complete if previous session is still validated
  useEffect(() => {
    const loggedIn = localStorage.getItem('username');

    if (loggedIn) {
      setAnimationId(null);
      dispatchAppState({ type: 'DEFAULT_LOGGED_IN' });
    }
  }, []);

  return (
    <AudioComponentsContext.Provider
      value={{
        oscillators: oscillators,
        fx: fx,
        setOscillators: setOscillators,
        setFx: setFx,
        resetState: resetState,
        setResetState: setResetState,
      }}
    >
      <DisplayVisibleContext.Provider
        value={{
          displayVisible: displayVisible,
          setDisplayVisible: setDisplayVisible,
        }}
      >
        <AnimationIdContext.Provider
          value={{ animationId: animationId, setAnimationId: setAnimationId }}
        >
          <div className="main-container">
            <NavBarContainer
              appState={appState}
              dispatchAppState={dispatchAppState}
              setLoginAttemptActive={setLoginAttemptActive}
              loginAttemptActive={loginAttemptActive}
            />
            <GridPanelContainer
              appState={appState}
              dispatchAppState={dispatchAppState}
            />
          </div>
        </AnimationIdContext.Provider>
      </DisplayVisibleContext.Provider>
    </AudioComponentsContext.Provider>
  );
};
