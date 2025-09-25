import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterSuccessModal.css"; // Ensure this import path is correct

function RegisterSuccessModal({ isOpen, onClose, onSignInClick }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="registration-success"
      title="Registration successfully completed!"
      alternateTextContent={
        <span
          onClick={onSignInClick}
          className="modal__link-text modal__link-text_center"
        >
          Sign in
        </span>
      }
    >
      {/* No input fields needed for this success message modal */}
    </ModalWithForm>
  );
}

export default RegisterSuccessModal;
