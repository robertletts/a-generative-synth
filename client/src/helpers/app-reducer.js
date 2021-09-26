import { TutorialPanel } from '../components/grid-panel/components/title/panels/forms/TutorialPanel';
import { GenerativePanel } from '../components/grid-panel/components/title/panels/playback-states/GenerativePanel';
import { defaultAppState } from '../default-state/default-app-state';
import { DefaultPanel } from '../components/grid-panel/components/title/panels/playback-states/DefaultPanel';
import { LoginFormPanel } from '../components/grid-panel/components/title/panels/forms/LoginFormPanel';
import { RegisterFormPanel } from '../components/grid-panel/components/title/panels/forms/RegisterFormPanel';
import { LoadPanel } from '../components/grid-panel/components/title/panels/crud/LoadPanel';
import { SavePanel } from '../components/grid-panel/components/title/panels/crud/SavePanel';

/**
 * god object reducer that handles display mode, reset, display,
 * generative and mute updates
 *
 * ...refactor drastically needed.
 */
const types = {
  DEFAULT: 'DEFAULT',
  DEFAULT_LOGGED_IN: 'DEFAULT_LOGGED_IN',
  TUTORIAL: 'TUTORIAL',
  GENERATIVE: 'GENERATIVE',
  GENERATIVE_OFF: 'GENERATIVE_OFF',
  MUTE: 'MUTE',
  UNMUTE: 'UNMUTE',
  RESET: 'RESET',
  LOGIN_CONFIRM: 'LOGIN_CONFIRM',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT_CONFIRM: 'LOGOUT_CONFIRM',
  REGISTER_FAIL: 'REGISTER_FAIL',
  REGISTER_CONFIRM: 'REGISTER_CONFIRM',
  SAVE_CONFIRM: 'SAVE_CONFIRM',
  LOAD_CONFIRM: 'LOAD_CONFIRM',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  SAVE: 'SAVE',
  LOAD: 'LOAD',
  RENAME_CONFIRM: 'RENAME_CONFIRM',
  DELETE_CONFIRM: 'DELETE_CONFIRM',
  RETURN: 'RETURN',
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case types.DEFAULT:
      return {
        ...defaultAppState,
        mute: false,
      };
    case types.DEFAULT_LOGGED_IN:
      return {
        display: <DefaultPanel />,
        generative: false,
        tutorial: false,
        reset: false,
        mute: false,
        signedIn: true,
      };
    case types.TUTORIAL:
      return {
        ...state,
        display: <TutorialPanel />,
        tutorial: true,
      };
    case types.GENERATIVE:
      return {
        ...state,
        display: <GenerativePanel />,
        tutorial: false,
        generative: true,
      };
    case types.GENERATIVE_OFF:
      return {
        ...state,
        display: <DefaultPanel />,
        tutorial: false,
        generative: false,
      };
    case types.MUTE:
      return {
        ...state,
        generative: false,
        mute: true,
        display: <DefaultPanel />,
      };
    case types.UNMUTE:
      return {
        ...state,
        generative: false,
        mute: false,
        display: <DefaultPanel />,
      };
    case types.RESET:
      return {
        ...state,
        mute: false,
        display: <DefaultPanel text="reset!" />,
        tutorial: false,
        generative: false,
      };
    case types.LOGIN_CONFIRM:
      return {
        ...state,
        display: <DefaultPanel text="logged in!" />,
        tutorial: false,
        signedIn: true,
      };
    case types.SAVE_CONFIRM:
      return {
        ...state,
        signedIn: true,
        display: <DefaultPanel text={`${action.patch} patch saved!`} />,
      };
    case types.LOAD_CONFIRM:
      return {
        ...state,
        mute: false,
        signedIn: true,
        display: <DefaultPanel text={`${action.patch} patch loaded!`} />,
      };
    case types.LOGOUT_CONFIRM:
      return {
        ...state,
        display: <DefaultPanel text="logged out!" />,
        tutorial: false,
        signedIn: false,
      };
    case types.REGISTER_CONFIRM:
      return {
        ...state,
        display: (
          <DefaultPanel
            text="registered!"
            setLoginAttemptActive={action.setLoginAttemptActive}
          />
        ),
        tutorial: false,
        signedIn: false,
      };
    case types.RENAME_CONFIRM:
      return {
        ...state,
        display: <DefaultPanel text="patch renamed!" />,
        tutorial: false,
      };
    case types.DELETE_CONFIRM:
      return {
        ...state,
        display: <DefaultPanel text={`${action.patch} patch deleted!`} />,
        tutorial: false,
      };
    case types.LOGIN:
      return {
        ...state,
        display: (
          <LoginFormPanel
            dispatchAppState={action.dispatchAppState}
            setLoginAttemptActive={action.setLoginAttemptActive}
          />
        ),
        tutorial: false,
      };
    case types.REGISTER:
      return {
        ...state,
        display: (
          <RegisterFormPanel
            dispatchAppState={action.dispatchAppState}
            setLoginAttemptActive={action.setLoginAttemptActive}
          />
        ),
        tutorial: false,
      };
    case types.SAVE:
      return {
        ...state,

        display: <SavePanel dispatchAppState={action.dispatchAppState} />,
        tutorial: false,
      };
    case types.LOAD:
      return {
        ...state,
        display: <LoadPanel dispatchAppState={action.dispatchAppState} />,
        generative: false,
        tutorial: false,
        signedIn: true,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        display: <DefaultPanel text="registration unsuccessful..." />,
        tutorial: false,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        display: <DefaultPanel text="login unsuccessful..." />,
        tutorial: false,
      };
    case types.RETURN:
      return {
        ...state,
        tutorial: false,
        display: <DefaultPanel />,
      };
    default:
      throw new Error('invalid display type provided');
  }
};
