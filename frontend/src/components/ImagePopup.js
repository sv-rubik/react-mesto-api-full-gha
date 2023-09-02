import React from 'react'

function ImagePopup ({card, id, isOpen, onClose}) {
  return (
    <div className={`popup popup_dark-overlay ${ isOpen ? 'popup_opened' : ''}`} id={id}>
      <div className="popup__container-image">
        <img className="popup__image" src={card.link}  alt={card.name}/>
        <p className="popup__image-caption">{card.name}</p>
        <button className="popup__close-btn" type="button"  onClick={onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup