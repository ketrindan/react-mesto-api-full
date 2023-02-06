import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const values = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(values);

  function handleChange(e) {
    const {name, value} = e.target;
    setInputs((input) => ({
      ...input, [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(inputs);
  }

  return (
    <div className="register auth">
      <h1 className="register__title auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form auth__form">
        <input className="register__input auth__input" id="email" name="email" type="email" placeholder="Email" value={inputs.email || values.email} onChange={handleChange} />
        <input className="register__input auth__input" id="password" name="password" type="password" placeholder="Пароль" value={inputs.password || values.password} onChange={handleChange} />
        <button type="submit" className="register__btn auth__btn button" onSubmit={handleSubmit}>Зарегистрироваться</button>
      </form>

      <div className="register__signin auth__signin">
        <p className="auth__caption">Уже зарегистрированы? <Link to="/sign-in" className="register__signin-link auth__signin-link">Войти</Link> </p>
      </div>
    </div>
  ) 
}

export default Register;