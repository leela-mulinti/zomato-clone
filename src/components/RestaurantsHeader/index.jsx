import React from 'react'
import { BsFilterLeft } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import './index.css'

const RestaurantsHeader = ({
  sortByOptions,
  selectedSortByValue,
  updateSortByValue,
  searchInput,
  onChangeSearchInput,
}) => {
  const onChangeSort = event => {
    updateSortByValue(event.target.value)
  }

  return (
    <div className="restaurants-header-section">
      <div className="restaurants-title-desc-container">
        <h1 className="restaurants-heading">Popular Restaurants</h1>
        <p className="restaurants-subheading">
          Select Your favourite restaurant that deserves your best taste
        </p>
      </div>

      <div className="restaurants-controls-container">
        {/* Search bar */}
        <div className="search-box-wrapper">
          <FiSearch className="search-box-icon" />
          <input
            type="search"
            className="restaurants-search-input"
            placeholder="Search restaurants..."
            value={searchInput}
            onChange={onChangeSearchInput}
          />
        </div>

        {/* Sort by filter */}
        <div className="sort-by-container">
          <BsFilterLeft className="sort-by-icon" />
          <span className="sort-by-label">Sort by</span>
          <select
            className="sort-by-select"
            value={selectedSortByValue}
            onChange={onChangeSort}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.id || eachOption.value}
                value={eachOption.value}
                className="sort-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantsHeader
