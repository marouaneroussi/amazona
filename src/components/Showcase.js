import React from 'react'
import './Showcase.css'
function showcase() {
  return (
    <div className='showcase__container'>
        
        <h2>Discover an Adventure</h2>
        <h1>Travel the World</h1>
        <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</p>
        <div className='showcase__buttons'>
        <button className='showcase__btn-services'>Services</button>    
        <button className='showcase__btn-about'>About</button>    

        </div>
    </div>
  )
}

export default showcase