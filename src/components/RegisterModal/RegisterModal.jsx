import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Adjust path if necessary
import "./RegisterModal.css"; // Don't forget to create this CSS file if it doesn't exist

function RegisterModal({ isOpen, onClose, onRegister }) {
  // onRegister will be for form submission later
  // For now, let's just create placeholder form elements
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Register form submitted!");
    onRegister(); // Call the passed onRegister function (will handle API later)
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register" // Unique name for this modal type
      title="Sign up" // Specific title for the registration modal
      onSubmit={handleSubmit}
    >
      {/* Registration form content (children for ModalWithForm) */}
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
      {/* The submit and close buttons are already in ModalWithForm */}
    </ModalWithForm>
  );
}

export default RegisterModal;
