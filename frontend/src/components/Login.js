import useForm from "../hooks/useForm";

function Login(props) {
  const { values, errors, isValid, onChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <div className="login auth">
      <h1 className="login__title auth__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form auth__form" noValidate>
        <input className="login__input auth__input" id="email" name="email" type="email" required placeholder="Email" value={values.email} onChange={onChange} />
        <span className={"form__input-error place-input-error " + (errors.email ? "form__input-error_active" : "")}>{errors.email}</span>
        <input className="login__input auth__input" id="password" name="password" type="password" required minLength="8" placeholder="Пароль" value={values.password} onChange={onChange} />
        <span className={"form__input-error link-input-error " + (errors.password ? "form__input-error_active" : "")}>{errors.password}</span>
        <button type="submit" className={"register__btn auth__btn button " + (isValid ? "" : "auth__btn_inactive" )} onSubmit={handleSubmit} disabled={!isValid}>Войти</button>
      </form>
    </div>
  )  
}

export default Login;