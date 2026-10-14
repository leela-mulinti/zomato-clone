import React from 'react'
import Header from '../Header'
import CarouselOffer from '../CarouselOffer'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'
import './index.css'

const Home = ({ sortByOptions }) => {
  return (
    <div className="home-route-container">
      <Header />
      <main className="home-main-content">
        <CarouselOffer />
        <PopularRestaurants sortByOptions={sortByOptions} />
      </main>
      <Footer />
    </div>
  )
}

export default Home
