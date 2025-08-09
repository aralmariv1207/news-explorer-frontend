import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Login form submitted!");
    onLogin();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="login"
      title="Sign in"
      onSubmit={handleSubmit}
      submitButtonText="Sign in"
      alternateTextContent={
        // Entire content for the 'or' line, including "or "
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
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
