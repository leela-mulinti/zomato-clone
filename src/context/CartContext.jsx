import React, { createContext, useState, useEffect } from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  getItemQuantity: () => 0,
})

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartData')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (e) {
      console.error('Error reading cartData from localStorage', e)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cartData', JSON.stringify(cartList))
    } catch (e) {
      console.error('Error saving cartData to localStorage', e)
    }
  }, [cartList])

  const addCartItem = item => {
    const formattedItem = {
      cost: Number(item.cost),
      quantity: Number(item.quantity) || 1,
      id: String(item.id),
      imageUrl: item.imageUrl || item.image_url,
      name: item.name,
    }

    setCartList(prevList => {
      const existingItem = prevList.find(each => String(each.id) === String(formattedItem.id))
      if (existingItem) {
        return prevList.map(each => {
          if (String(each.id) === String(formattedItem.id)) {
            return {
              ...each,
              quantity: each.quantity + (formattedItem.quantity || 1),
            }
          }
          return each
        })
      }
      return [...prevList, formattedItem]
    })
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevList =>
      prevList.map(each => {
        if (String(each.id) === String(id)) {
          return { ...each, quantity: each.quantity + 1 }
        }
        return each
      }),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevList => {
      const targetItem = prevList.find(each => String(each.id) === String(id))
      if (targetItem && targetItem.quantity > 1) {
        return prevList.map(each => {
          if (String(each.id) === String(id)) {
            return { ...each, quantity: each.quantity - 1 }
          }
          return each
        })
      }
      // If quantity is 1 or less, decrementing removes it from cartData
      return prevList.filter(each => String(each.id) !== String(id))
    })
  }

  const removeCartItem = id => {
    setCartList(prevList => prevList.filter(each => String(each.id) !== String(id)))
  }

  const removeAllCartItems = () => {
    setCartList([])
    try {
      localStorage.removeItem('cartData')
    } catch (e) {
      console.error('Error clearing cartData', e)
    }
  }

  const getItemQuantity = id => {
    const item = cartList.find(each => String(each.id) === String(id))
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
