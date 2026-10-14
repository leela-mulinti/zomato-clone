import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import './index.css'

const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    cuisine,
    imageUrl,
    name,
    rating,
    ratingColor,
    totalReviews,
    opensAt,
  } = restaurant

  return (
    <li
      className="restaurant-card-item"
      testid="restaurant-item"
      data-testid="restaurant-item"
    >
      <Link to={`/restaurant/${id}`} className="restaurant-card-link">
        <div className="restaurant-card-image-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-card-image"
            loading="lazy"
          />
          {opensAt && (
            <span className="restaurant-availability-badge">
              Opens {opensAt}
            </span>
          )}
        </div>

        <div className="restaurant-card-info">
          <h2 className="restaurant-card-name">{name}</h2>
          <p className="restaurant-card-cuisine">{cuisine}</p>

          <div className="restaurant-card-rating-container">
            <div
              className="rating-badge"
              style={{
                backgroundColor: ratingColor
                  ? `#${ratingColor}`
                  : rating >= 4.0
                  ? '#22c55e'
                  : '#f59e0b',
              }}
            >
              <FaStar className="star-icon" />
              <span className="rating-number">{rating}</span>
            </div>
            <span className="total-reviews-count">
              ({totalReviews} ratings)
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
