import { useState } from "react";
import api from "../utils/api";
import { NavLink, useHistory } from "react-router-dom";
import { getMessage } from "../utils/utils";
import SubmitButton from "../components/FormElements/SubmitButton";

const Register = ({ setNotificationOpen, setSuccess, setMessage }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    api.postSignUp({
        password: values.pwd,
        email: values.email,
      })
      .then((data) => {
        setSuccess(true);
        setNotificationOpen(true);
        history.push("/sign-in");
      })
      .catch((error) => {
        localStorage.clear();
        setSuccess(false);
        setMessage(error.message)
        setNotificationOpen(true);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: getMessage(e) });
  };
  return (
    <div className="register">
      <form
        className="register__form"
        name="register"
        id={"registerForm"}
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="form__title register_title">Регистрация</h2>
        <input
          className="input form__email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className="form__error" id="email-error">
          {errors.email}
        </span>
        <input
          className="input form__email"
          id="pwd"
          name="pwd"
          type="password"
          required
          placeholder="Пароль"
          value={values.pwd}
          onChange={handleChange}
        />
        <span className="form__error" id="pwd-error">
          {errors.pwd}
        </span>
        <SubmitButton errors={errors} text="Зарегистрироваться" />
      </form>
      <div className="register__footer">
        Уже зарегистрированы?&nbsp;
        <NavLink className="navlink" to={"/sign-in"}>
          Войти
        </NavLink>
      </div>
    </div>
  );
};
export default Register;
