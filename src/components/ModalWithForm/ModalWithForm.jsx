import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  name,
  children,
  onSubmit,
  submitButtonText,
  alternateTextContent,
}) {
  // Added alternateTextContent prop
  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      name={name}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children} {/* This will now be only the input fields */}
          <button type="submit" className="modal__submit-button">
            {submitButtonText || "Submit"}
          </button>
          {alternateTextContent && ( // Render alternate content if provided
            <p className="modal__link-option">{alternateTextContent}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
