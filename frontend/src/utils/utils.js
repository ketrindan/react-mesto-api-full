export const apiConfig = {
  baseUrl: 'http://api.mesto.ketrindan.nomoredomainsclub.ru',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
}


export const authConfig = {
  baseUrl: 'http://api.mesto.ketrindan.nomoredomainsclub.ru',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}  
