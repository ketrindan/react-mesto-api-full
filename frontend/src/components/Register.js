import { Link } from 'react-router-dom';
import useForm from "../hooks/useForm";

function Register(props) {
  const { values, errors, isValid, onChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <div className="register auth">
      <h1 className="register__title auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form auth__form" noValidate>
        <input className="register__input auth__input" id="email" name="email" type="email" required placeholder="Email" value={values.email} onChange={onChange} />
        <span className={"form__input-error place-input-error " + (errors.email ? "form__input-error_active" : "")}>{errors.email}</span>
        <input className="register__input auth__input" id="password" name="password" type="password" required minLength="6" placeholder="Пароль" value={values.password} onChange={onChange} />
        <span className={"form__input-error link-input-error " + (errors.password ? "form__input-error_active" : "")}>{errors.password}</span>
        <button type="submit" className={"register__btn auth__btn button " + (isValid ? "" : "auth__btn_inactive" )} onSubmit={handleSubmit} disabled={!isValid}>Зарегистрироваться</button>
      </form>

      <div className="register__signin auth__signin">
        <p className="auth__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__signin-link auth__signin-link">Войти</Link> </p>
      </div>
    </div>
  ) 
}

export default Register;