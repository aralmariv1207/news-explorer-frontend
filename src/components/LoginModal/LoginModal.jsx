import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false); // This state is correctly used by the button now

  // Effect to reset form state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setIsEmailTouched(false);
      setIsPasswordTouched(false);
      setIsFormValid(false); // Ensure validity is reset
    }
  }, [isOpen]);

  // Effect to run validation when input values change
  useEffect(() => {
    // Calculate current validity based on input values
    const currentEmailIsValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    const currentPasswordIsValid = password.trim() && password.length >= 4;

    // Update individual error messages
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

    // Set overall form validity based on individual validities
    setIsFormValid(currentEmailIsValid && currentPasswordIsValid);
  }, [email, password]); // Dependencies are just the input values for re-validation

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEmailTouched(true);
    setIsPasswordTouched(true);

    // Re-evaluate form validity immediately before submission in case blur wasn't triggered
    const finalEmailIsValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    const finalPasswordIsValid = password.trim() && password.length >= 4;
    const finalFormIsValid = finalEmailIsValid && finalPasswordIsValid;

    if (finalFormIsValid) {
      console.log("Login form submitted successfully with:", {
        email,
        password,
      });
      onLogin({ email, password });
    } else {
      console.log("Form is not valid, cannot submit.");
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="login"
      title="Sign in"
      onSubmit={handleSubmit}
      submitButtonText="Sign in"
      isSubmitDisabled={!isFormValid} // This is where isFormValid is used!
      alternateTextContent={
        <>
          or{" "}
          <span onClick={onRegisterClick} className="modal__link-text">
            Sign up
          </span>
        </>
      }
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
    </ModalWithForm>
  );
}

export default LoginModal;
