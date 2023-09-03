class AuthApi {
  constructor(authURL) {
    this._url = authURL
  }

  //to avoid double-coding in methods below
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  // user registration on server
  register(password, email) {
    // console.log(password, email, this._url)
    return fetch(`${this._url}/signup`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({password, email})
    })
      //we get res objet, which contains '_id' (jwt token) & 'email'
      .then(res => {return this._handleServerResponse(res)})
  }

  // Check if user's email & password exists on server.
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({email, password})
    })
      //we get res objet, which contains 'token'
      .then(res => {return this._handleServerResponse(res)})
  }

  // Check existing token validity on server. This token check to be used in App.js during page rendering
  // in order to redirect user to the necessary page.
  checkToken(token){
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, //if token is valid
      },
      method: 'GET'
    })
      //we get res objet, which contains '_id' (jwt token) & 'email'
      .then(res => {return this._handleServerResponse(res)})
  }
}
////// TODO
// export const authApi = new AuthApi('https://auth.nomoreparties.co')
// export const authApi = new AuthApi('http://localhost:3000')
export const authApi = new AuthApi('https://api.sv-rubik-mesto.nomoredomainsicu.ru')
