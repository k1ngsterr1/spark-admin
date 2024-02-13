import logo from "../../src/assets/logo.webp";
import "../../src/shared/styles/variables.scss";
import "../registration/style.scss";

const RegistrationPage = () => {
  return (
    <div className="registration flex justify-center">
      <div className="registration__content flex justify-center mt-32">
        {/* <img src={logo} alt="logo" /> */}
        <span className="registration__heading font-bold mt-8">
          Welcome back
        </span>
        <form className="registration__form mt-8">
          <div className="registration__input-name">
            <input
              className="registration__input"
              type="text"
              required
              placeholder="Username"
            />
          </div>
          <div className="registration__input-email mt-4">
            <input
              className="registration__input"
              type="text"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className="registration__input-password mt-4">
            <input
              className="registration__input"
              type="text"
              required
              placeholder="Password"
            />
          </div>
          <div className="registration__input-password-confirm mt-4">
            <input
              className="registration__input"
              type="text"
              required
              placeholder="Confirm Password"
            />
          </div>
          <button className="registration__sign-up mt-8">Sign Up</button>
        </form>
        <div className="registration__mini-text mt-5">
          <span>Already a User? </span>
          <a href="" className="login-orange">
            Login
          </a>
        </div>
        <div className="registration__google mt-4">
          <div className="registration__separator" />
          <span className="registration__separator-or">OR</span>
          <div className="registration__separator" />
        </div>
        <button className="registration__google-button mt-6">
          Продолжить с Google
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
