import { memo, useContext } from "react";
import LoadingContext from "../contexts/LoadingContext";
import SubmitButtonNormal from "./FormElements/SubmitButtonNormal";

const PopupWithForm = memo(
  ({
    onSubmit,
    isOpen,
    onClose,
    name,
    title,
    buttonText = "Сохранить",
    errors,
    buttonTextLoading = "Сохранение...",
    children,
  }) => {
    const loading = useContext(LoadingContext);
    return (
      <div
        className={`popup ${isOpen && "popup popup_opened"}`}
        id={name + "Popup"}
      >
        <div className="popup__container">
          <form
            className="form popup__form"
            name={name}
            id={name + "Form"}
            noValidate
            onSubmit={onSubmit}
          >
            <h2 className="form__title">{title}</h2>
            {children}
            <SubmitButtonNormal
              errors={errors}
              text={buttonText}
              loading={loading}
              buttonTextLoading={buttonTextLoading}
            />
          </form>
          <button
            className="image-button popup__close-icon"
            type="button"
            onClick={onClose}
          />
        </div>
      </div>
    );
  }
);
export default PopupWithForm;
