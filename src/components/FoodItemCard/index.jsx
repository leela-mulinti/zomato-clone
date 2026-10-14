import React, { useContext } from 'react'
import { FaRupeeSign, FaStar } from 'react-icons/fa'
import { HiOutlineMinusSm } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

const FoodItemCard = ({ foodItem }) => {
  const {
    id,
    cost,
    name,
    imageUrl,
    rating,
    foodType,
  } = foodItem

  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const cartItem = cartList.find(each => String(each.id) === String(id))
  const quantity = cartItem ? cartItem.quantity : 0

  const onClickAdd = () => {
    addCartItem({
      cost,
      quantity: 1,
      id,
      imageUrl,
      name,
    })
  }

  const onClickDecrement = () => {
    decrementCartItemQuantity(id)
  }

  const onClickIncrement = () => {
    incrementCartItemQuantity(id)
  }

  return (
    <li
      className="food-item-card"
      testid="foodItem"
      data-testid="foodItem"
    >
      <div className="food-item-img-container">
        <img
          src={imageUrl}
          alt={name}
          className="food-item-img"
          loading="lazy"
        />
        {foodType && (
          <span className={`food-type-tag ${foodType.toLowerCase()}`}>
            {foodType}
          </span>
        )}
      </div>

      <div className="food-item-details">
        <h3 className="food-item-title">{name}</h3>

        <div className="food-item-cost-row">
          <FaRupeeSign className="food-cost-rupee" />
          <span className="food-item-cost">{cost}</span>
        </div>

        <div className="food-item-rating-row">
          <FaStar className="food-rating-star" />
          <span className="food-item-rating-value">{rating}</span>
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            className="food-add-button"
            onClick={onClickAdd}
          >
            ADD
          </button>
        ) : (
          <div className="quantity-controls-box">
            <button
              type="button"
              className="qty-btn"
              onClick={onClickDecrement}
              testid="decrement-count"
              data-testid="decrement-count"
              aria-label="Decrease quantity"
            >
              <HiOutlineMinusSm className="qty-icon" />
            </button>

            <span
              className="qty-number"
              testid="active-count"
              data-testid="active-count"
            >
              {quantity}
            </span>

            <button
              type="button"
              className="qty-btn"
              onClick={onClickIncrement}
              testid="increment-count"
              data-testid="increment-count"
              aria-label="Increase quantity"
            >
              <BsPlus className="qty-icon plus-icon" />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItemCard
