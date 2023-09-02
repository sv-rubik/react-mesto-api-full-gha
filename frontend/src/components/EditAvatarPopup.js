import React, {useRef, useEffect} from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef()

  useEffect(() => {avatarRef.current.value = ''}, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({ avatar: avatarRef.current.value })
  }

  return (
    <PopupWithForm id="popup-avatar" name="avatar-form" title="Обновить аватар" formID=""
                   btnText = 'Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <label className="popup__label" htmlFor="avatar-input">
          <input
            className="popup__input"
            id="avatar-input"
            name="avatar"
            type="url"
            placeholder="Ссылка на аватар"
            required=""
            ref={avatarRef}
          />
          <span className="popup__error" id="avatar-input-error"/>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
export default EditAvatarPopup