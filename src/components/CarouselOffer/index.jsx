import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import { Oval } from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const CarouselOffer = () => {
  const [offersList, setOffersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/restaurants-list/offers'
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
          const updatedOffers = data.offers.map(each => ({
            id: each.id,
            imageUrl: each.image_url,
          }))
          setOffersList(updatedOffers)
        }
      } catch (error) {
        console.error('Error fetching offers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOffers()
  }, [])

  if (isLoading) {
    return (
      <div
        className="carousel-loader-container"
        testid="restaurants-offers-loader"
        data-testid="restaurants-offers-loader"
      >
        <Oval
          color="gold"
          secondaryColor="gold"
          height={40}
          width={50}
          ariaLabel="oval-loading"
        />
      </div>
    )
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: 'slick-dots custom-dots',
  }

  return (
    <div className="carousel-section">
      <ul className="carousel-slider-container">
        <Slider {...sliderSettings}>
          {offersList.map(offer => (
            <li key={offer.id} className="carousel-slide-item">
              <img
                src={offer.imageUrl}
                alt="offer"
                className="carousel-banner-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  )
}

export default CarouselOffer
