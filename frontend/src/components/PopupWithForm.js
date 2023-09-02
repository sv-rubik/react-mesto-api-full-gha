import React from 'react'

function PopupWithForm(props) {
  return (
    <div className={`popup ${ props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={props.onClose}/>
        <h2 className="popup__heading">{props.title}</h2>
        <form className="popup__form" name={props.name} id={props.formID} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__create-btn popup__save-btn" type="submit"  // popup__save-btn_disabled
                  aria-label={props.title}>{props.btnText || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm