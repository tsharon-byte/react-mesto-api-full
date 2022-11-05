import { useState, memo, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { getMessage } from "../utils/utils";

const AddPlacePopup = memo(({ isOpen, onClose, onSubmit }) => {
  const defaultState = { name: "", link: "" };
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultState);

  useEffect(() => {
    setValues(defaultState);
  }, [isOpen]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: getMessage(e) });
  };

  return (
    <PopupWithForm
      name="placeAdd"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      buttonTextLoading="Создание..."
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      errors={errors}
    >
      <input
        className="input form__name"
        id="name"
        name="name"
        type="text"
        placeholder="Название места"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      <span className="form__error" id="place-name-error">
        {errors.name}
      </span>
      <input
        className="input form__description"
        id="link"
        name="link"
        type="link"
        placeholder="URL"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="form__error" id="place-link-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
});
export default AddPlacePopup;
