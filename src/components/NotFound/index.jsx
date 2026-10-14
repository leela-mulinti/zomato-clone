import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const notFoundImg =
  'https://res.cloudinary.com/sravangunaganti/image/upload/v1653302585/TastyKitchens/erroring_1_l730sf.png'

const NotFound = () => {
  return (
    <div className="not-found-route-container">
      <Header />
      <div className="not-found-content">
        <img
          src={notFoundImg}
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage
        </p>
        <Link to="/">
          <button type="button" className="not-found-home-btn">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
