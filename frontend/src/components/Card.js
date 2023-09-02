import React, {useContext} from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card (props) {
  // to subscribe to context
  const currentUser = useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id)

  function handleClick() {props.onCardClick(props.card)}
  function handleLikeClick() {props.onCardLike(props.card)}
  function handleDeleteClick() {props.onCardDelete(props.card)}

  return (
    <li className="element" >
      <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
      {isOwn && <button className="element__trash" type="button" aria-label="удалить фотографию"
                        onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes">
          <button className={ `element__like ${ isLiked ? 'element__like_active' : '' }` } type="button"
                  aria-label="поставить лайк" onClick={handleLikeClick}></button>
          <p className="element__likes-counter">{props.likes}</p>
        </div>
      </div>
    </li>
  )
}

export default Card