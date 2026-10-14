import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaUtensils, FaSignOutAlt } from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Profile = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <div className="profile-route-container">
      <Header />

      <main className="profile-main-content">
        <div className="profile-card">
          <div className="profile-header-banner">
            <div className="profile-avatar-wrapper">
              <FaUserCircle className="profile-avatar-icon" />
            </div>
            <h1 className="profile-user-name">Rahul Sharma</h1>
            <span className="profile-badge">Tasty Member</span>
          </div>

          <div className="profile-details-list">
            <div className="profile-detail-item">
              <div className="detail-icon-circle">
                <FaEnvelope className="detail-icon" />
              </div>
              <div className="detail-texts">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">rahul@example.com</span>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon-circle">
                <FaMapMarkerAlt className="detail-icon" />
              </div>
              <div className="detail-texts">
                <span className="detail-label">Delivery Address</span>
                <span className="detail-value">Sindhi Colony, Begumpet, Hyderabad, Telangana</span>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon-circle">
                <FaUtensils className="detail-icon" />
              </div>
              <div className="detail-texts">
                <span className="detail-label">Favourite Cuisines</span>
                <span className="detail-value">North Indian, Chinese, Bakery, Fast Food</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="profile-logout-btn"
            onClick={onClickLogout}
          >
            <FaSignOutAlt className="logout-action-icon" />
            Logout from Tasty Kitchens
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile
