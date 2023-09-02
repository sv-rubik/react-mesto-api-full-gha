import React, {useContext, useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleName(e) {setName(e.target.value)}
  function handleDescription(e) {setDescription(e.target.value)}
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({ name: name, about: description })
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }, [currentUser, isOpen])

  return (
    <PopupWithForm id="popup-edit" name="profile-form" title="Редактировать профиль" formID="profile"
                   btnText = 'Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <label className="popup__label" htmlFor="profile-name">
          <input
            className="popup__input"
            type="text"
            id="profile-name"
            name="name"
            placeholder="ФИО"
            minLength={2}
            maxLength={40}
            required=""
            value={name || ''}
            onChange={handleName}
          />
          <span className="popup__error" id="profile-name-error"/>
        </label>
        <label className="popup__label" htmlFor="profile-description">
          <input
            className="popup__input"
            type="text"
            id="profile-description"
            name="description"
            placeholder="Профессия"
            minLength={2}
            maxLength={200}
            required=""
            value={description || ''}
            onChange={handleDescription}
          />
          <span className="popup__error" id="profile-description-error"/>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup