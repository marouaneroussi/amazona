import React from 'react'
import Header from './Header'
import Subtotal from './Subtotal'
import './Checkout.css'
import './CheckoutProduct'
import { useSelector } from 'react-redux'
import CheckoutProduct from './CheckoutProduct'

function Checkout() {
    const panier = useSelector(state => state.basket);
    const user = useSelector(state => state.user);

    return ( 
        <>
        <Header color = "rgb(15, 15, 15)"
        position = "relative" />
        <div className = "checkout" >
        <div className = 'checkout__left' >
        <img className = 'checkout__ad'
        src = "https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" / >

        <div>
        <h3> Hello, { user ?.email } </h3> 
        <h2 className = 'checkout__title' >
        Your shopping Basket 
        </h2> { /* checkout product */ } {
            panier.map(i => (
                 <CheckoutProduct key = { i.id }
                id = { i.id }
                title = { i.title }
                image = { i.image }
                price = { i.price }
                rating = { i.rating }
                />
            ))
        } 
        </div>
         </div>
         <div className = 'checkout__right' >
        <Subtotal/>

        </div> 
        </div>
         </>
    )
}

export default Checkout