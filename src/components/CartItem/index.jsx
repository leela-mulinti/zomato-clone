import React, { useContext } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { HiOutlineMinusSm } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({ item }) => {
  const { id, name, cost, quantity, imageUrl } = item
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onClickDecrement = () => {
    decrementCartItemQuantity(id)
  }

  const onClickIncrement = () => {
    incrementCartItemQuantity(id)
  }

  const onClickRemove = () => {
    removeCartItem(id)
  }

  const itemTotalCost = cost * quantity

  return (
    <li
      className="cart-item-row"
      testid="cartItem"
      data-testid="cartItem"
    >
      <div className="cart-item-info-col">
        <img src={imageUrl} alt={name} className="cart-item-image" />
        <span className="cart-item-name">{name}</span>
      </div>

      <div className="cart-item-quantity-col">
        <div className="cart-qty-controllers">
          <button
            type="button"
            className="cart-qty-btn"
            onClick={onClickDecrement}
            testid="decrement-quantity"
            data-testid="decrement-quantity"
            aria-label="Decrease quantity"
          >
            <HiOutlineMinusSm className="cart-minus-icon" />
          </button>

          <span
            className="cart-qty-val"
            testid="item-quantity"
            data-testid="item-quantity"
          >
            {quantity}
          </span>

          <button
            type="button"
            className="cart-qty-btn"
            onClick={onClickIncrement}
            testid="increment-quantity"
            data-testid="increment-quantity"
            aria-label="Increase quantity"
          >
            <BsPlus className="cart-plus-icon" />
          </button>
        </div>
      </div>

      <div className="cart-item-price-col">
        <span className="cart-item-price-val">
          <FaRupeeSign className="cart-rupee-icon" />
          {itemTotalCost}
        </span>
        <button
          type="button"
          className="cart-item-remove-btn"
          onClick={onClickRemove}
          title="Remove item"
          aria-label="Remove item"
        >
          <AiFillCloseCircle className="cart-remove-icon" />
        </button>
      </div>
    </li>
  )
}

export default CartItem
