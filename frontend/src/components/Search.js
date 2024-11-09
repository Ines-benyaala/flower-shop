import React from 'react'

function Search({setSearch}) {
  return (
    <div className="search-container">
        <input className="search" type="text" placeholder="Search" onChange={(e)=> { setSearch(e.target.value)}}></input>     
    </div>
  )
}

export default Search