import { memo } from "react";
import PopupWithForm from "./PopupWithForm";

const CardDeleteConfirmationPopup = memo(({ isOpen, onClose, onSubmit }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name="cardDelete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
      buttonTextLoading="Удаление..."
    />
  );
});
export default CardDeleteConfirmationPopup;
