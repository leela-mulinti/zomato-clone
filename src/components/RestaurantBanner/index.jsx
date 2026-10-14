import React from 'react'
import { FaStar, FaRupeeSign } from 'react-icons/fa'
import './index.css'

const RestaurantBanner = ({ restaurantData }) => {
  const {
    name,
    imageUrl,
    cuisine,
    location,
    rating,
    costForTwo,
    reviewsCount,
  } = restaurantData

  return (
    <div className="restaurant-banner-section">
      <div className="restaurant-banner-content">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-banner-img"
        />

        <div className="restaurant-banner-details">
          <h1 className="restaurant-banner-name">{name}</h1>
          <p className="restaurant-banner-cuisine">{cuisine}</p>
          <p className="restaurant-banner-location">{location}</p>

          <div className="restaurant-banner-metrics-container">
            <div className="metric-box">
              <div className="metric-value-row">
                <FaStar className="metric-star-icon" />
                <span className="metric-value">{rating}</span>
              </div>
              <span className="metric-label">{reviewsCount}+ Ratings</span>
            </div>

            <div className="vertical-divider" />

            <div className="metric-box">
              <div className="metric-value-row">
                <FaRupeeSign className="metric-rupee-icon" />
                <span className="metric-value">{costForTwo}</span>
              </div>
              <span className="metric-label">Cost for two</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBanner
