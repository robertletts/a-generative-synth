import { userValidation } from '../../../../../../validations/user-validation';
import { attemptRegister } from '../../../../../../helpers/attempt-register';

export const RegisterFormPanel = ({
  dispatchAppState,
  setLoginAttemptActive,
}) => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoginAttemptActive(() => false);

    const data = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    if (await userValidation.isValid(data)) {
      const response = await attemptRegister(data);

      if (response.status >= 200 && response.status <= 299) {
        dispatchAppState({ type: 'REGISTER_CONFIRM' });
        return;
      }
    }
    dispatchAppState({ type: 'REGISTER_FAIL' });
  };

  return (
    <div>
      <form method="post" onSubmit={onSubmitHandler}>
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
        <i>between 4-10 characters.</i>
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
};
