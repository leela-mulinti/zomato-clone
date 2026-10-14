import React, { useContext } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const CartTotal = ({ onPlaceOrder }) => {
  const { cartList } = useContext(CartContext)

  const totalCost = cartList.reduce(
    (acc, eachItem) => acc + (Number(eachItem.cost) * Number(eachItem.quantity)),
    0,
  )

  return (
    <div className="cart-total-section">
      <hr className="cart-divider-line" />
      <div className="cart-total-content">
        <h2 className="cart-order-total-label">Order Total:</h2>
        <div className="cart-price-action-container">
          <div
            className="cart-total-price-wrapper"
            testid="total-price"
            data-testid="total-price"
          >
            <FaRupeeSign className="total-rupee-icon" />
            <span className="total-amount-val">{totalCost}</span>
          </div>

          <button
            type="button"
            className="place-order-btn"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
