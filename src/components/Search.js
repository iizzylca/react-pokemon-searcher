import React from 'react'



const Search = props => {


  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" onChange={props.searchHandler} value={props.searchInput}/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search
