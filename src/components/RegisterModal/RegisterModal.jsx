import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Register form submitted!");
    onRegister();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register"
      title="Sign up"
      onSubmit={handleSubmit}
      submitButtonText="Sign up"
      alternateTextContent={
        // Entire content for the 'or' line, including "or "
        <>
          or{" "}
          <span onClick={onLoginClick} className="modal__link-text">
            Sign in
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
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="username"
          placeholder="Enter your username"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
