import React from 'react'
import home from '../img/home.png'

function Home() {
  return (
    <div className="home-container">
        <img className='home' src={home}/>
        <h3>
            Allow yourself to <br/> <span>Bloom !</span>
        </h3>
    </div>
  )
}

export default Home