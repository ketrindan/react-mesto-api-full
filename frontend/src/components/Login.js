import React, { useState } from 'react';

function Login(props) {
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
    <div className="login auth">
      <h1 className="login__title auth__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form auth__form">
        <input className="login__input auth__input" id="email" name="email" type="email" placeholder="Email" value={inputs.email || values.email} onChange={handleChange} />
        <input className="login__input auth__input" id="password" name="password" type="password" placeholder="Пароль" value={inputs.password || values.password} onChange={handleChange} />
        <button type="submit" className="login__btn auth__btn button" onSubmit={handleSubmit}>Войти</button>
      </form>
    </div>
  ) 
}

export default Login;