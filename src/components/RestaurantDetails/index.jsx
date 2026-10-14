import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'
import Header from '../Header'
import RestaurantBanner from '../RestaurantBanner'
import FoodItemCard from '../FoodItemCard'
import Footer from '../Footer'
import './index.css'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [foodItemsList, setFoodItemsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setIsLoading(true)
      setHasError(false)
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/restaurants-list/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      try {
        const response = await fetch(url, options)
        if (response.ok === true) {
          const data = await response.json()
          const formattedRestaurantData = {
            costForTwo: data.cost_for_two,
            cuisine: data.cuisine,
            foodItems: data.food_items,
            id: data.id,
            imageUrl: data.image_url,
            itemsCount: data.items_count,
            location: data.location,
            name: data.name,
            opensAt: data.opens_at,
            rating: data.rating,
            reviewsCount: data.reviews_count,
          }

          const formattedFoodItems = (data.food_items || []).map(each => ({
            cost: each.cost,
            foodType: each.food_type,
            id: each.id,
            imageUrl: each.image_url,
            name: each.name,
            rating: each.rating,
          }))

          setRestaurantData(formattedRestaurantData)
          setFoodItemsList(formattedFoodItems)
        } else {
          setHasError(true)
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurantDetails()
  }, [id])

  return (
    <div className="restaurant-details-route">
      <Header />

      <main className="restaurant-details-main">
        {isLoading ? (
          <div
            className="details-loader-container"
            testid="restaurant-details-loader"
            data-testid="restaurant-details-loader"
          >
            <Oval
              color="gold"
              secondaryColor="gold"
              height={40}
              width={50}
              ariaLabel="oval-loading"
            />
          </div>
        ) : hasError || !restaurantData ? (
          <div className="restaurant-error-view">
            <h2 className="error-title">Failed to load restaurant details</h2>
            <p className="error-desc">Please try again later or check your network.</p>
          </div>
        ) : (
          <>
            <RestaurantBanner restaurantData={restaurantData} />

            <div className="food-items-section">
              <h2 className="food-menu-heading">Menu Items</h2>
              <ul className="food-items-grid">
                {foodItemsList.map(foodItem => (
                  <FoodItemCard
                    key={foodItem.id}
                    foodItem={foodItem}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default RestaurantDetails
