import React, {useEffect, useState} from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {api} from '../utils/api'
import {authApi} from '../utils/authApi'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({}) // context variable
  // PR12
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false) // for popup-Tooltip

  const navigate = useNavigate()

  // Existing token check to render correct path for earlier authorized user
  useEffect(() => {
    const existingToken = localStorage.getItem('token') // check if any tokens available in localstorage
    if (existingToken) {
      authApi.checkToken(existingToken) //if jwt valid get response obj with '_id' (jwt token) & 'email'
        .then((res) => {
          setEmail(res.email) //add email to header because user authorized earlier
          setIsLoggedIn(true)      // redirect to content
          navigate('/')
        })
        .catch((err) => {console.log(`There is an error in token verification, ${err}`)})
    }
  }, [isLoggedIn, navigate])

  // To render initial cards and user data from server
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards)
        })
        .catch(err => console.log("There is an error:", err))
    }
  }, [isLoggedIn])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsTooltipPopupOpen(false)
  }

  const handleCardClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    })
    setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {setCards( (cards) => cards.filter((i) => i._id !== card._id))})
      .catch((err) => {console.log("There is an error while deleting:", err)})
  }

  function handleUpdateUser (profileInputsData) {
    api.sendUserData({name: profileInputsData.name, about: profileInputsData.about})
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log("There is an error while updating profile:", err) })
  }

  function handleUpdateAvatar (avatarLink) {
    api.sendAvatarLink(avatarLink)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log("There is an error while updating avatar:", err) })
  }

  function handleAddPlaceSubmit ({name, link}) {
    api.addNewCard({name: name, link: link})
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err) => {console.log("There is an error while adding place:", err) })
  }

  ///////////// Closing by ESC and on overlay click
  const isAnyPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isTooltipPopupOpen

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isAnyPopupOpen) {
      document.addEventListener("keydown", handleEscClose)
      return () => {
        document.removeEventListener("keydown", handleEscClose)
      }
    }
  }, [isAnyPopupOpen])

  useEffect(() => {
    function handleOverlayClose(e) {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
        closeAllPopups()
      }
    }
    if (isAnyPopupOpen) {
      document.addEventListener('mousedown', handleOverlayClose)
      return () => {
        document.removeEventListener("mousedown", handleOverlayClose)
      }
    }
  }, [isAnyPopupOpen])

  //////////////////////////////////////////////
  //PR12
  //User registration - tooltip popup will show if authorized successfully
  function handleRegister (password, email) {
    authApi.register(password, email)
      .then(() => {
        setIsTooltipPopupOpen(true)
        setIsAuthorized(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        console.log(`There is an error while registering, ${err}`)
        setIsTooltipPopupOpen(true)
        setIsAuthorized(false)
      })
  }

  //User login - tooltip popup will show if authorized successfully
  function handleLogin (email, password) {
    authApi.authorize(email, password)
      .then((res) => {
        // received res object, which contains 'token'
        if (res.token) {
          localStorage.setItem('token', res.token) // save token in localstorage
          setEmail(email)
          setIsLoggedIn(true)
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(`There is an error while logging in, ${err}`)
        setIsTooltipPopupOpen(true)
        setIsAuthorized(false)})
  }

  //Logout - removing token from localstorage
  function handleLogOut(){
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}> {/*  value to provide from App to below components */}
      <Header isLoggedIn={isLoggedIn} logOut={handleLogOut} email={email} />
      <Routes>
        <Route exact
               path="/"
               element={
                 <ProtectedRoute
                   element={Main}
                   cards={cards}
                   onEditProfile={handleEditProfileClick}
                   onAddPlace={handleAddPlaceClick}
                   onEditAvatar={handleEditAvatarClick}
                   onCardClick={handleCardClick}
                   onCardLike={handleCardLike}
                   onCardDelete={handleCardDelete}
                   isLoggedIn = {isLoggedIn}/>} />
        <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
      <Footer />

      {/*  Popup Edit */}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

      {/*  Popup Add */}
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

      {/*  Popup Image */}
      <ImagePopup id="popup-image" card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

      {/* Popup Card delete */}
      <div className="popup" id="popup-delete">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"/>
          <h2 className="popup__heading">Вы уверены?</h2>
          <form className="popup__form" name="card-delete" noValidate="">
            <button className="popup__save-btn" type="submit" aria-label="Подтвердить удаление">Да</button>
          </form>
        </div>
      </div>

      {/* Popup Avatar */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      {/* Tooltip Popup */}
      <InfoTooltip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} isAuthorized={isAuthorized} />
    </CurrentUserContext.Provider>
  )
}

export default App