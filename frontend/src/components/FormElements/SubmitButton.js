import { useEffect, useState } from "react";

const SubmitButton = ({ errors, text }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let result = false;
    for (let prop in errors) {
      if (errors[prop] && errors[prop].length > 0) {
        result = true;
        break;
      }
    }
    setDisabled(result);
  });

  return (
    <button
      className={`button form__submit button_color_white ${
        disabled ? "form__submit_disabled" : ""
      }`}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
