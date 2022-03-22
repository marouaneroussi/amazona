import React from 'react'
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'
import { useSelector, useDispatch } from 'react-redux'
import {getBasketTotal} from "./reducers/reducer"
import{useNavigate} from 'react-router-dom'

function Subtotal() {
  const panier = useSelector(state => state.basket);
  const history = useNavigate();
 

  return (
    
    <div className='subtotlal'>
    <CurrencyFormat  
    renderText={(value)=>(
       <>
       <p>
           Subtotal ({panier.length} items):
           
           <strong>{value}</strong>
       </p>
       <small className='subtotal__gift'>
       <input 
       type="checkbox"></input>This order contains a gift   
       </small>
       </>

    )}
    decimalScale={2} 
    value={getBasketTotal(panier)}
    displayType={"text"}
    thousandSeparator={'.'}
    decimalSeparator={','}
    decimalPrecision= "2"
    prefix={"MAD "}
    
    
    />  
    <button onClick={e=> history("/payment")} className='Btn__checkout'>Proceed to Checkout</button> 
    </div>
  )
}

export default Subtotal