import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiResponse: apiStatusConstants.loading,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiResponse: apiStatusConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleSearch, rating, category} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiResponse: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiResponse: apiStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeTitleSearch = search => {
    this.setState({titleSearch: search}, this.getProducts)
  }

  changeCategorySearch = id => {
    this.setState({category: id}, this.getProducts)
  }

  changeRating = id => {
    this.setState({rating: id}, this.getProducts)
  }

  clearAllFilters = () => {
    this.setState(
      {
        productsList: [],
        apiResponse: apiStatusConstants.loading,
        activeOptionId: sortbyOptions[0].optionId,
        titleSearch: '',
        category: '',
        rating: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    let productsView
    // TODO: Add No Products View
    if (productsList.length !== 0) {
      productsView = (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    } else {
      productsView = (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-productsView-image"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-description">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return productsView
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="no-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="no-productsView-image"
      />
      <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
      <p className="no-products-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderView = () => {
    const {apiResponse} = this.state
    switch (apiResponse) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {titleSearch, rating} = this.state
    console.log(rating)
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          changeTitleSearch={this.changeTitleSearch}
          title={titleSearch}
          categoryOptions={categoryOptions}
          changeCategorySearch={this.changeCategorySearch}
          ratingsList={ratingsList}
          changeRating={this.changeRating}
          clearAllFilters={this.clearAllFilters}
        />

        {this.renderView()}
      </div>
    )
  }
}

export default AllProductsSection
