import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register ({onRegister}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(e) {setEmail(e.target.value)}
  function handlePassword(e) {setPassword(e.target.value)}
  function handleSubmitButton(e) {
    e.preventDefault()
    onRegister(password, email)
    setEmail('')
    setPassword('')
  }

  return (
      <div className="auth">
        <h3 className="auth__title">Регистрация</h3>
        <form className="popup__form" onSubmit={ handleSubmitButton }>
          <label className="auth__label" htmlFor="email-value">
            <input className="auth__input" id="email-value" type="email" onChange={handleEmail}
                   name="email" placeholder="Email" minLength="6" maxLength="20" required value={email || ''}/>
            <span className="popup__error" id="auth-register-email-input-error"/>
          </label>
          <label className="auth__label" htmlFor="password-value">
            <input className="auth__input" id="password-value" type="password" onChange={handlePassword}
                   name="password" placeholder="Пароль" minLength="6" maxLength="20" required value={password || ''}/>
            <span className="popup__error" id="auth-register-password-input-error" />
          </label>
          <button className="auth__save-btn" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <div className='auth__go-to-login'>
          <p>Уже зарегистрированы?</p>
          <Link className="auth__link" to="/sign-in">Войти</Link>
        </div>
      </div>
  )
}

export default Register