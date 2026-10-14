import React, { useState, useContext } from 'react'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import CartTotal from '../CartTotal'
import PaymentSuccess from '../PaymentSuccess'
import Footer from '../Footer'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const { cartList, removeAllCartItems } = useContext(CartContext)

  const onPlaceOrder = () => {
    removeAllCartItems()
    setIsOrderPlaced(true)
  }

  const isCartEmpty = cartList.length === 0

  return (
    <div className="cart-route-container">
      <Header />

      <main className="cart-main-content">
        {isOrderPlaced ? (
          <PaymentSuccess />
        ) : isCartEmpty ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-wrapper">
            <h1 className="cart-main-heading">My Cart</h1>

            <div className="cart-table-header">
              <span className="cart-header-title">Item</span>
              <span className="cart-header-title center">Quantity</span>
              <span className="cart-header-title right">Price</span>
            </div>

            <ul className="cart-items-list">
              {cartList.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <CartTotal onPlaceOrder={onPlaceOrder} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Cart
