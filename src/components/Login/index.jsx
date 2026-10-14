import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Oval } from 'react-loader-spinner'
import './index.css'

const websiteLogo =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'
const landingImageDesktop =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'
const landingImageMobile =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'

const Login = () => {
  const [username, setUsername] = useState('rahul')
  const [password, setPassword] = useState('rahul@2021')
  const [showPassword, setShowPassword] = useState(false)
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // If already authenticated, redirect to Home
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
    if (showSubmitError) setShowSubmitError(false)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    if (showSubmitError) setShowSubmitError(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = error => {
    setShowSubmitError(true)
    setErrorMsg(error || 'Please enter a valid Username & Password')
  }

  const submitForm = async event => {
    event.preventDefault()
    setIsLoading(true)
    setShowSubmitError(false)

    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setIsLoading(false)

      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      setIsLoading(false)
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="login-page-container">
      {/* Mobile Landing Header Image */}
      <div className="login-mobile-banner">
        <img
          src={landingImageMobile}
          alt="website login"
          className="login-mobile-img"
        />
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="login-brand-header">
            <img
              src={websiteLogo}
              alt="website logo"
              className="login-brand-logo"
            />
            <h1 className="login-brand-title">Tasty Kitchens</h1>
          </div>

          <h2 className="login-heading">Login</h2>

          <form className="login-form" onSubmit={submitForm}>
            <div className="input-group">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={onChangeUsername}
                placeholder="Enter Username"
                autoComplete="username"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="input-field password-field"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="eye-icon" />
                  ) : (
                    <AiFillEye className="eye-icon" />
                  )}
                </button>
              </div>
            </div>

            {showSubmitError && (
              <p className="error-message">*{errorMsg}</p>
            )}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <Oval
                  color="#ffffff"
                  secondaryColor="#ffffff"
                  height={20}
                  width={20}
                  strokeWidth={4}
                />
              ) : (
                'Login'
              )}
            </button>

            <div className="demo-credentials-note">
              <p className="demo-note-text">
                Demo Credentials: <strong>rahul</strong> / <strong>rahul@2021</strong>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Desktop Landing Banner */}
      <div className="login-desktop-banner-side">
        <img
          src={landingImageDesktop}
          alt="website login"
          className="login-desktop-img"
        />
      </div>
    </div>
  )
}

export default Login
