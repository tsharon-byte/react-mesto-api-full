import { useRef, memo, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { getMessage } from "../utils/utils";

const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatarEdit"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAvatarSubmit}
      errors={errors}
    >
      <input
        className="input form__name"
        id="avatar"
        name="avatar"
        minLength="5"
        placeholder="URL аватара"
        required
        type="link"
        ref={avatarRef}
        onChange={(e) => setErrors({ ...errors, url: getMessage(e) })}
      />
      <span className="form__error" id="avatar-error">
        {errors.url}
      </span>
    </PopupWithForm>
  );
});
export default EditAvatarPopup;
