import React, { useState } from 'react'

function Login ({onLogin}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(e) {setEmail(e.target.value)}
  function handlePassword(e) {setPassword(e.target.value)}
  function handleSubmitButton (e) {
    e.preventDefault()
    onLogin(email, password)
    setEmail('')
    setPassword('')
  }

  return (
      <div className="auth">
        <h3 className="auth__title">Вход</h3>
        <form className="popup__form" onSubmit={handleSubmitButton}>
          <label className="auth__label" htmlFor="email-value">
            <input className="auth__input" id="email-value" type="email" value={email || ''} name="email"
                   placeholder="Email" minLength="6" maxLength="20" required onChange={handleEmail} />
            <span className="popup__error" id="auth-login-email-input-error"/>
          </label>
          <label className="auth__label" htmlFor="password-value">
            <input className="auth__input" id="password-value" type="password" value={password || ''} name="password"
                   placeholder="Пароль" minLength="6" maxLength="20" required onChange={handlePassword}/>
            <span className="popup__error" id="auth-login-password-input-error"/>
          </label>
          <button className="auth__save-btn" type="submit" aria-label="Войти">Войти</button>
        </form>
      </div>
  )
}

export default Login