class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

//to avoid double-coding in methods below
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  sendUserData(profileInputsData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        name: profileInputsData.name,
        about: profileInputsData.about })
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({name, link})
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  sendAvatarLink(avatarLink) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  addCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => {
        console.log(cardId)
        return this._handleServerResponse(res)
      })
  }

  deleteCardLike(cardId) {
    console.log("Deleting like from card with ID:", cardId);
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      }
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  changeLikeCardStatus (cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${ localStorage.getItem('token') }`,
        }
      })
        .then(res => { return this._handleServerResponse(res)})
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${ localStorage.getItem('token') }`,
        }
      })
        .then(res => { return this._handleServerResponse(res)})
    }
  }

}

////// TODO
export const api = new Api({
  baseUrl: 'https://api.sv-rubik-mesto.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
})
