import React from "react"
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  // to subscribe to context
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      {/*  Section profile  */}
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__avatar-zone">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар пользователя"/>
          <button className="profile__avatar-edit-btn" type="button" aria-label="Редактировать аватар"
                  onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать профиль"
                  onClick={onEditProfile}/>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить фотографию"
                onClick={onAddPlace}/>
      </section>
      {/*  Section elements  */}
      <section className="elements" aria-label="Галерея фотографий интересных мест в России">
        <div></div>
        <ul className="elements-grid">
          {cards.map((card) => (
            <Card card={card} key={card._id} link={card.link} name={card.name} likes={card.likes.length}
                  onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main