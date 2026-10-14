import React from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const footerLogoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo-title-container">
        <img
          src={footerLogoUrl}
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-social-icons-container">
        <a
          href="https://in.pinterest.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Pinterest"
        >
          <FaPinterestSquare
            className="social-icon pinterest-icon"
            testid="pintrest-social-icon"
            data-testid="pintrest-social-icon"
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Instagram"
        >
          <FaInstagram
            className="social-icon instagram-icon"
            testid="instagram-social-icon"
            data-testid="instagram-social-icon"
          />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Twitter"
        >
          <FaTwitter
            className="social-icon twitter-icon"
            testid="twitter-social-icon"
            data-testid="twitter-social-icon"
          />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Facebook"
        >
          <FaFacebookSquare
            className="social-icon facebook-icon"
            testid="facebook-social-icon"
            data-testid="facebook-social-icon"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
