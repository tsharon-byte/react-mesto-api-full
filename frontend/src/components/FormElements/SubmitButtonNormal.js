import { useEffect, useState } from "react";

const SubmitButtonNormal = ({ errors, text, loading, buttonTextLoading }) => {
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
  }, [errors]);

  return (
    <button
      className={`button form__submit ${
        loading || disabled ? "form__submit_disabled" : ""
      }`}
      type="submit"
      disabled={loading || disabled}
    >
      {loading ? buttonTextLoading : text}
    </button>
  );
};
export default SubmitButtonNormal;
