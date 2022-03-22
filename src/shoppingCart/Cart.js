import React from 'react'
import ShoppingCart from './ShoppingCart';
import {useSelector} from 'react-redux'
import './Cart.css'
function Cart() {
    const panier = useSelector(state => state.basket);

  return (
    <>
  {
  panier.map(i => (
               <ShoppingCart
              
                  />
                  
               ))
            }
        <div className='card__total'>
        <h5>Total Panier:</h5>
        <span> MAD 122</span>
    </div>
    </>
  )
}

export default Cart