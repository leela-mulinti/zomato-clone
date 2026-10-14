import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import './index.css'

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <FaCheckCircle className="payment-success-icon" />
        <h1 className="payment-success-heading">Payment Successful</h1>
        <p className="payment-success-description">
          Thank you for ordering
          <br />
          Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="go-to-home-btn">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
