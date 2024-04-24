import {IoSearchOutline} from 'react-icons/io5'
import './index.css'

const SelectCategoryOptions = props => {
  const {id, name, getCategoryId} = props
  const onClickedCategory = () => {
    getCategoryId(id)
  }
  return (
    <button type="button" className="btn-style" onClick={onClickedCategory}>
      <p className="category-para">{name}</p>
    </button>
  )
}

const SelectRatings = props => {
  const {ratingId, imageUrl, getRatingId} = props
  const onClickedRating = () => {
    getRatingId(ratingId)
  }
  const imageAlt = 'rating{ratingId}'
  return (
    <button
      type="button"
      className="rating-btn-style"
      onClick={onClickedRating}
    >
      <img src={imageUrl} alt={imageAlt} className="rating-image" />
      <p className="rating-up">& up</p>
    </button>
  )
}

const FiltersGroup = props => {
  const {
    changeTitleSearch,
    title,
    categoryOptions,
    changeCategorySearch,
    ratingsList,
    changeRating,
    clearAllFilters,
  } = props
  const onChangeTitleSearch = event => {
    changeTitleSearch(event.target.value)
    console.log(event.target.value)
  }
  const getCategoryId = id => {
    changeCategorySearch(id)
  }
  const getRatingId = id => {
    changeRating(id)
  }
  const onClickClearFilters = () => {
    clearAllFilters()
  }
  return (
    <div className="filters-group-container">
      <div className="input-search-element">
        <input
          type="search"
          className="input-search"
          placeholder="search"
          onChange={onChangeTitleSearch}
          value={title}
        />
        <IoSearchOutline />
      </div>
      <div className="select-label-container">
        <h1 className="select-category-label">Category</h1>
        {categoryOptions.map(cat => (
          <SelectCategoryOptions
            key={cat.categoryId}
            id={cat.categoryId}
            name={cat.name}
            getCategoryId={getCategoryId}
          />
        ))}
      </div>
      <div className="select-label-container">
        <label htmlFor="category" className="select-category-label">
          Rating
        </label>
        {ratingsList.map(rat => (
          <SelectRatings
            key={rat.ratingId}
            ratingId={rat.ratingId}
            imageUrl={rat.imageUrl}
            getRatingId={getRatingId}
          />
        ))}
      </div>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={onClickClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
