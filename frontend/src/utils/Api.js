import { apiConfig } from "./utils";

class Api {
  constructor (config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }


  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(res => this._serverResponse(res))
  }


  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(res => this._serverResponse(res))
  }


  setUserData(data, token) {
    return fetch(`${this._baseUrl}/users/me`,
      {method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({name: data.name, about: data.job})
    })
    .then(res => this._serverResponse(res))
  }


  addNewCard(data, token) {
    return fetch(`${this._baseUrl}/cards`,
      {method: 'POST',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({name: data.place, link: data.link})
    })
    .then(res => this._serverResponse(res))
  }


  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(res => this._serverResponse(res))
  }


  _putLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(res => this._serverResponse(res))
  }


  _deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(res => this._serverResponse(res))
  }


  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this._deleteLike(cardId, token)
    } else {
      return this._putLike(cardId, token)
    }
  }


  changeAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
    {method: 'PATCH',
    headers: {
      ...this._headers,
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify({avatar: data.avatar})
    })
    .then(res => this._serverResponse(res))
  }
}

const api = new Api(apiConfig);

export default api;