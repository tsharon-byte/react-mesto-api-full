import { useState, useContext, useEffect, memo } from "react";
import PopupWithForm from "./PopupWithForm";
import { getMessage } from "../utils/utils";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";

const EditProfilePopup = memo(({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(NewCurrentUserContext).user;
  const defaultState = { name: "", about: "" };
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultState);

  useEffect(() => {
    setValues({
      name: currentUser.name || "",
      about: currentUser.about || "",
    });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: getMessage(e) });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      errors={errors}
    >
      <input
        className="input form__name"
        id="name"
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={values.name}
        onChange={handleChange}
      />
      <span className="form__error" id="name-error">
        {errors.name}
      </span>
      <input
        className="input form__description"
        id="about"
        name="about"
        type="text"
        required
        minLength="2"
        maxLength="200"
        placeholder="Профессия"
        value={values.about}
        onChange={handleChange}
      />
      <span className="form__error" id="about-error">
        {errors.about}
      </span>
    </PopupWithForm>
  );
});
export default EditProfilePopup;
