import React, { useState, useEffect, useCallback } from 'react'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import RestaurantsHeader from '../RestaurantsHeader'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const LIMIT = 9

const PopularRestaurants = ({ sortByOptions }) => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const [selectedSortByValue, setSelectedSortByValue] = useState(sortByOptions[0].value)
  const [searchInput, setSearchInput] = useState('')
  const [totalPages, setTotalPages] = useState(4)

  const fetchRestaurants = useCallback(async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * LIMIT
    const searchParam = searchInput.trim() ? `&search=${encodeURIComponent(searchInput.trim())}` : ''
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}${searchParam}`

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
        if (data.restaurants && Array.isArray(data.restaurants)) {
          const formattedRestaurants = data.restaurants.map(each => ({
            id: each.id,
            cuisine: each.cuisine,
            imageUrl: each.image_url,
            name: each.name,
            rating: each.user_rating.rating,
            ratingColor: each.user_rating.rating_color,
            ratingText: each.user_rating.rating_text,
            totalReviews: each.user_rating.total_reviews,
            costForTwo: each.cost_for_two,
            hasOnlineDelivery: each.has_online_delivery,
            opensAt: each.opens_at,
          }))

          setRestaurantsList(formattedRestaurants)
          if (data.total) {
            setTotalPages(Math.max(1, Math.ceil(data.total / LIMIT)))
          } else {
            setTotalPages(4)
          }
        } else {
          setRestaurantsList([])
          setTotalPages(1)
        }
      } else {
        setRestaurantsList([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error)
      setRestaurantsList([])
    } finally {
      setIsLoading(false)
    }
  }, [activePage, selectedSortByValue, searchInput])

  useEffect(() => {
    fetchRestaurants()
  }, [fetchRestaurants])

  const updateSortByValue = newSortValue => {
    setSelectedSortByValue(newSortValue)
    setActivePage(1)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
    setActivePage(1)
  }

  const onClickPrevPage = () => {
    if (activePage > 1) {
      setActivePage(prev => prev - 1)
      window.scrollTo({ top: 350, behavior: 'smooth' })
    }
  }

  const onClickNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(prev => prev + 1)
      window.scrollTo({ top: 350, behavior: 'smooth' })
    }
  }

  return (
    <div className="popular-restaurants-section">
      <RestaurantsHeader
        sortByOptions={sortByOptions}
        selectedSortByValue={selectedSortByValue}
        updateSortByValue={updateSortByValue}
        searchInput={searchInput}
        onChangeSearchInput={onChangeSearchInput}
      />

      {isLoading ? (
        <div
          className="restaurants-loader-container"
          testid="restaurants-list-loader"
          data-testid="restaurants-list-loader"
        >
          <Oval
            color="gold"
            secondaryColor="gold"
            height={40}
            width={50}
            ariaLabel="oval-loading"
          />
        </div>
      ) : restaurantsList.length > 0 ? (
        <>
          <ul className="restaurants-grid">
            {restaurantsList.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination-wrapper">
            <button
              type="button"
              className="pagination-btn"
              onClick={onClickPrevPage}
              disabled={activePage === 1}
              testid="pagination-left-button"
              data-testid="pagination-left-button"
              aria-label="Previous page"
            >
              <FaChevronLeft className="pagination-arrow" />
            </button>

            <span className="pagination-text">
              <span
                testid="active-page-number"
                data-testid="active-page-number"
                className="active-page-num"
              >
                {activePage}
              </span>{' '}
              of {totalPages}
            </span>

            <button
              type="button"
              className="pagination-btn"
              onClick={onClickNextPage}
              disabled={activePage >= totalPages}
              testid="pagination-right-button"
              data-testid="pagination-right-button"
              aria-label="Next page"
            >
              <FaChevronRight className="pagination-arrow" />
            </button>
          </div>
        </>
      ) : (
        <div className="no-restaurants-view">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png"
            alt="no restaurants"
            className="no-restaurants-img"
          />
          <h2 className="no-restaurants-heading">No Restaurants Found</h2>
          <p className="no-restaurants-desc">
            We couldn't find any restaurants matching "{searchInput}". Please try a different search.
          </p>
        </div>
      )}
    </div>
  )
}

export default PopularRestaurants
