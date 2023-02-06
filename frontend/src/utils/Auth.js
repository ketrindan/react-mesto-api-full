import { authConfig } from "./utils";

class Auth {
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

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(res => this._serverResponse(res))
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(res => this._serverResponse(res))
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then(res => this._serverResponse(res))
  }
}

const auth = new Auth(authConfig);

export default auth;