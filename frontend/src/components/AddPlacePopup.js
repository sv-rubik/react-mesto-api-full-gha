import React, {useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [placeName, setPlaceName] = useState('')
  const [placeLink, setPlaceLink] = useState('')

  //clear fields
  useEffect( () => {
    setPlaceName('')
    setPlaceLink('')
  }, [isOpen])

  function handleName(e) {setPlaceName(e.target.value)}
  function handleLink(e) {setPlaceLink(e.target.value)}
  function handleSubmit (e){
    e.preventDefault()
    onAddPlace({name: placeName, link: placeLink})
  }

  return (
    <PopupWithForm id="popup-add" name="card-form" title="Новое место" formID="new-cards"
                   btnText = 'Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <label htmlFor="card-name" className="popup__label">
          <input className="popup__input" type="text" id="card-name" name="title" placeholder="Название"
                 minLength={1} maxLength={30} required="" onChange={handleName} value={placeName || ''}/>
          <span className="popup__error" id="card-name-error"/>
        </label>
        <label htmlFor="card-link" className="popup__label">
          <input className="popup__input" type="url" id="card-link" name="link" placeholder="Ссылка на картинку"
                 required="" onChange={handleLink} value={placeLink || ''}/>
          <span className="popup__error" id="card-link-error"/>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup