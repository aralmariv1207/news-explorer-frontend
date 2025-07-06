import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Adjust path if necessary
import "./LoginModal.css"; // Don't forget to create this CSS file if it doesn't exist

function LoginModal({ isOpen, onClose, onLogin }) {
  // onLogin will be for form submission later
  // For now, let's just create placeholder form elements
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Login form submitted!");
    onLogin(); // Call the passed onLogin function (will handle API later)
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="login" // Unique name for this modal type (e.g., for specific styling)
      title="Log in" // Specific title for the login modal
      onSubmit={handleSubmit}
    >
      {/* Login form content (children for ModalWithForm) */}
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
      {/* The submit and close buttons are already in ModalWithForm, so no need to repeat here */}
    </ModalWithForm>
  );
}

export default LoginModal;
