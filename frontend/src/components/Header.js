import logo from '../images/logo.svg'
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleBurgerClick() {
    setMenuOpen((state) => !state);
  }

  function handleSignOut() {
    props.onSignOut();
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className={`header__menu ${isMenuOpen ? "header__menu_opened" : ""}`}>
          <p className="header__user-email">{props.userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={handleSignOut}>Выйти</Link>
      </div>
      
      <div className="header__container">
        <Link to="/">
          <img src={logo} className="header__logo" alt="Логотип"/>
        </Link>
        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route exact path="/">
            <div className="header__infobox">
              <p className="header__user-email">{props.userEmail}</p>
              <Link to="/sign-in" className="header__link" onClick={props.onSignOut}>Выйти</Link>
            </div>
            <div className={`header__burger-btn button ${isMenuOpen ? "header__burger-btn_transformed" : ""}`} onClick={handleBurgerClick}>
              <span className="header__burger-layer"></span>
              <span className="header__burger-layer"></span>
              <span className="header__burger-layer"></span>
            </div>
          </Route> 
        </Switch> 
      </div>
    </header>
  )
}

export default Header;
