import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithConfirmation from './PopupWithConfirmation';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupWithConfirmationOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function openInfoToolTip() {
    setInfoToolTipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(cardId) {
    setSelectedToDeleteCard(cardId);
    setPopupWithConfirmationOpen(true);
  }
  
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setPopupWithConfirmationOpen(false);

    setSelectedCard({});
    setSelectedToDeleteCard({});

    setInfoToolTipOpen(false);
  }

  function handleUpdateUser(newInfo) {
    setLoading(true);
    const token = localStorage.getItem('token');

    api.setUserData(newInfo, token)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  } 

  function handleUpdateAvatar(newInfo) {
    setLoading(true);
    const token = localStorage.getItem('token');

    api.changeAvatar(newInfo, token)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function handleAddPlaceSubmit(newData) {
    setLoading(true);
    const token = localStorage.getItem('token');

    api.addNewCard(newData, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const token = localStorage.getItem('token');
    
    api.changeLikeCardStatus(card._id, isLiked, token)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  } 

  function handleCardDelete(cardId) {
    setLoading(true);
    const token = localStorage.getItem('token');

    api.deleteCard(cardId, token)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== cardId));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    if(isLoggedIn) {
      const token = localStorage.getItem('token');
      Promise.all([api.getUserData(token), api.getCards(token)])
      .then(([userData, cardsdata]) => {
        setCurrentUser(userData);
        setCards(cardsdata);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [isLoggedIn])

  function onRegistration(data) {
    auth.register(data.email, data.password)
    .then((res) => {
      setIsSuccessful(true);
      openInfoToolTip();
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessful(false);
      openInfoToolTip();
    });
  }

  function onLogin(data) {
    auth.authorize(data.email, data.password)
    .then((data) => {
      setLoggedIn(true);
      localStorage.setItem('token', data.token);
      history.push('/');
      handleTokenCheck();
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessful(false); 
      openInfoToolTip();
    });
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } 
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentUser({});
    history.push('/sign-in');
  }

  useEffect(() => {
    handleTokenCheck()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          /> 

          <PopupWithConfirmation 
            name="delete" 
            title="Вы уверены?"
            card={selectedToDeleteCard}
            isOpen={isPopupWithConfirmationOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            onLoading={isLoading}
          />

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isSuccessful={isSuccessful}
          />

          <Header 
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />

          <Switch>
            <Route path="/sign-up">
              <Register onSubmit={onRegistration} />
            </Route>
            <Route path="/sign-in">
              <Login onSubmit={onLogin} />
            </Route>
            <ProtectedRoute exact path="/" 
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              isLoggedIn={isLoggedIn}
            />
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
