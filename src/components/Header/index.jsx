import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCloseCircle } from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const websiteLogoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { cartList } = useContext(CartContext)

  const currentPath = location.pathname
  const cartItemsCount = cartList.reduce((acc, item) => acc + (item.quantity || 1), 0)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo-container" onClick={closeMobileMenu}>
          <img
            src={websiteLogoUrl}
            alt="website logo"
            className="navbar-website-logo"
          />
          <h1 className="navbar-title">Tasty Kitchens</h1>
        </Link>

        {/* Desktop Nav Items */}
        <ul className="desktop-nav-items">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${currentPath === '/' ? 'active-nav-link' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cart"
              className={`nav-link ${currentPath === '/cart' ? 'active-nav-link' : ''}`}
            >
              Cart
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/profile"
              className={`nav-link ${currentPath === '/profile' ? 'active-nav-link' : ''}`}
            >
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <div className="mobile-menu-btn-container">
          <button
            type="button"
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-menu">
          <div className="mobile-nav-header">
            <span className="mobile-nav-title">Menu</span>
            <button
              type="button"
              className="close-menu-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
          <ul className="mobile-nav-items">
            <li className="mobile-nav-item">
              <Link
                to="/"
                className={`mobile-nav-link ${currentPath === '/' ? 'active-nav-link' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/cart"
                className={`mobile-nav-link ${currentPath === '/cart' ? 'active-nav-link' : ''}`}
                onClick={closeMobileMenu}
              >
                Cart
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/profile"
                className={`mobile-nav-link ${currentPath === '/profile' ? 'active-nav-link' : ''}`}
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
            <li className="mobile-nav-item">
              <button
                type="button"
                className="logout-btn mobile-logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Header
