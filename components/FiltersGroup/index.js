import {IoSearchOutline} from 'react-icons/io5'
import './index.css'

const FiltersGroup = props => {
  const {changeTitleSearch, title} = props
  const onChangeTitleSearch = event => {
    changeTitleSearch(event.target.value)
    console.log(event.target.value)
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
    </div>
  )
}

export default FiltersGroup
