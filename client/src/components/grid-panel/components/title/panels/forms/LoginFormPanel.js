import { attemptLogin } from '../../../../../../helpers/attempt-login';

export const LoginFormPanel = ({ dispatchAppState, setLoginAttemptActive }) => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const [username, password] = event.target;

    const data = {
      username: username.value,
      password: password.value,
    };

    // try and login with username and password provided
    const loginResponse = await attemptLogin(data);

    // provide UI feedback on login response
    if (loginResponse.status >= 200 && loginResponse.status <= 299) {
      const json = await loginResponse.json();
      // store login data for future sessions
      localStorage.setItem('token', json.token);
      localStorage.setItem('username', username.value);
      dispatchAppState({ type: 'LOGIN_CONFIRM' });
    } else {
      dispatchAppState({ type: 'LOGIN_FAIL' });
      setLoginAttemptActive(() => false);
    }
  };

  const userRegisterHandler = () => {
    dispatchAppState({
      type: 'REGISTER',
      dispatchAppState: dispatchAppState,
      setLoginAttemptActive: setLoginAttemptActive,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div class="text-input-field">
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" className="input-text-field" />
        </div>

        <div className="text-input-field">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" className="input-text-field" />
        </div>
        <input type="submit" style={{ display: 'none' }} />

        <div className="account-access-link-container">
          <div onClick={userRegisterHandler} className={`account-access-link `}>
            need to register?
          </div>
        </div>
      </form>
    </div>
  );
};
