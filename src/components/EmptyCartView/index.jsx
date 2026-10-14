import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const emptyCartImg =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png'

const EmptyCartView = () => {
  return (
    <div className="empty-cart-container">
      <img
        src={emptyCartImg}
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )
}

export default EmptyCartView
