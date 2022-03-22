import React from 'react'
import './ShoppingCart.css'
import CurrencyFormat from 'react-currency-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {useDispatch } from 'react-redux'

function ShoppingCart({id,title, image, price,quantity}) {

    const baseUrl = "http://127.0.0.1:8000/"
    const dispatch = useDispatch()
    const removeFromBasket = () => {
        dispatch({
            //remove the item from the basket
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
  return (

<div className="container">
  <div className="shopping-cart">
    <div className="shopping-cart-header">
       <div className='shoppingCart__image'>
       <img width="100" height="100" src={baseUrl+image}  loading="lazy" />
      </div>
      <div className='ShoppingCart__items'>
       <span className='title'><h5>{title}</h5></span>
       <span className='qte'>Quantité:{quantity}</span>
       <span className='price'><strong>  <CurrencyFormat  
    value={price}
    decimalScale={2} 
    displayType={"text"}
    thousandSeparator={'.'}
    decimalSeparator={','}
    prefix={"MAD "}
    
    
    />  </strong></span>
      </div>
      <div onClick={removeFromBasket} className='ShoppingCart__remove__items'><FontAwesomeIcon icon={faXmark} /></div>
    </div> 
    
   
  </div> 
</div> 
  )
}

export default ShoppingCart