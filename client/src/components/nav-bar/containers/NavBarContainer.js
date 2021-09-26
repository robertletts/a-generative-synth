import { LogInButton } from '../buttons/LogInButton';
import { LogOutButton } from '../buttons/LogOutButton';
import { TutorialButton } from '../buttons/TutorialButton';
import { SaveButton } from '../buttons/SaveButton';
import { LoadButton } from '../buttons/LoadButton';
import { GenerativeButton } from '../buttons/GenerativeButton';
import { useContext } from 'react';
import { DisplayVisibleContext } from '../../../App';

export const NavBarContainer = ({
  appState,
  dispatchAppState,
  setLoginAttemptActive,
  loginAttemptActive,
}) => {
  const { displayVisible } = useContext(DisplayVisibleContext);

  return (
    <nav
      className="sidebar-container"
      style={displayVisible ? {} : { display: 'none' }}
    >
      <GenerativeButton
        appState={appState}
        dispatchAppState={dispatchAppState}
      />
      {appState.signedIn ? (
        <LogOutButton
          dispatchAppState={dispatchAppState}
          setLoginAttemptActive={setLoginAttemptActive}
        />
      ) : (
        <LogInButton
          dispatchAppState={dispatchAppState}
          appState={appState}
          loginAttemptActive={loginAttemptActive}
          setLoginAttemptActive={setLoginAttemptActive}
        />
      )}
      <LoadButton
        dispatchAppState={dispatchAppState}
        appState={appState}
        setLoginAttemptActive={setLoginAttemptActive}
      />
      <SaveButton
        dispatchAppState={dispatchAppState}
        appState={appState}
        setLoginAttemptActive={setLoginAttemptActive}
      />
      <TutorialButton appState={appState} dispatchAppState={dispatchAppState} />
    </nav>
  );
};
