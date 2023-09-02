import React from 'react'
import tickIcon from '../images/tickIcon.svg'
import crossIcon from '../images/crossIcon.svg'

//popup of authorization_status
function InfoTooltip({isOpen, onClose, isAuthorized}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose}/>
        <div className="auth__tooltip">
          {isAuthorized ? (
            <>
              <img className="auth__tooltip-icon" src={tickIcon} alt="Иконка галочка" />
              <p className="auth__tooltip-text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img className="auth__tooltip-icon" src={crossIcon} alt="Иконка крестик" />
              <p className="auth__tooltip-text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip