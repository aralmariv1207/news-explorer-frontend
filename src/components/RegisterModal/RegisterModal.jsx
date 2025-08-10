import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
  serverError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setEmailError("");
      setPasswordError("");
      setUsernameError("");
      setIsEmailTouched(false);
      setIsPasswordTouched(false);
      setIsUsernameTouched(false);
      setIsFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const currentEmailIsValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    const currentPasswordIsValid = password.trim() && password.length >= 4;
    const currentUsernameIsValid = username.trim() && username.length >= 2;

    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
    } else {
      setPasswordError("");
    }

    if (!username.trim()) {
      setUsernameError("Username is required");
    } else if (username.length < 2) {
      setUsernameError("Username must be at least 2 characters.");
    } else {
      setUsernameError("");
    }

    setIsFormValid(
      currentEmailIsValid && currentPasswordIsValid && currentUsernameIsValid
    );
  }, [email, password, username]);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };

  const handleUsernameBlur = () => {
    setIsUsernameTouched(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEmailTouched(true);
    setIsPasswordTouched(true);
    setIsUsernameTouched(true);

    const finalEmailIsValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    const finalPasswordIsValid = password.trim() && password.length >= 4;
    const finalUsernameIsValid = username.trim() && username.length >= 2;
    const finalFormIsValid =
      finalEmailIsValid && finalPasswordIsValid && finalUsernameIsValid;

    if (finalFormIsValid) {
      onRegister({ email, password, username });
    } else {
      console.log("Form is not valid, cannot submit.");
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register"
      title="Sign up"
      onSubmit={handleSubmit}
      submitButtonText="Sign up"
      isSubmitDisabled={!isFormValid} // ADJUSTED: Only disabled if client-side form is NOT valid
      alternateTextContent={
        <>
          or{" "}
          <span onClick={onLoginClick} className="modal__link-text">
            Sign in
          </span>
        </>
      }
      serverMessage={serverError}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
        />
        <span
          className={`modal__error-message ${
            emailError && isEmailTouched ? "modal__error-message_visible" : ""
          }`}
        >
          {emailError}
        </span>
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
        <span
          className={`modal__error-message ${
            passwordError && isPasswordTouched
              ? "modal__error-message_visible"
              : ""
          }`}
        >
          {passwordError}
        </span>
      </label>
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleUsernameBlur}
          required
        />
        <span
          className={`modal__error-message ${
            usernameError && isUsernameTouched
              ? "modal__error-message_visible"
              : ""
          }`}
        >
          {usernameError}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
