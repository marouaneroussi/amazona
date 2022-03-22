    import React from 'react'
    import './CheckoutProduct.css'
    import StarIcon from '@mui/icons-material/Star';
    import CurrencyFormat from 'react-currency-format'

    import { useSelector, useDispatch } from 'react-redux'

    function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
        const baseUrl = "http://127.0.0.1:8000/"

        function formatToCurrency(amount) {
            return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        const dispatch = useDispatch()
        const panier = useSelector(state => state.basket);
        const removeFromBasket = () => {
            dispatch({
                //remove the item from the basket
                type: 'REMOVE_FROM_BASKET',
                id: id,
            })
        }
        return ( 
            <div className = 'checkoutProduct' >
     <img className = 'checkoutProduct__image' src={baseUrl+image} /> 

            <div className = 'checkoutProduct__info' >
            <p className = 'checkoutProduct__title' > { title } 
            </p> 
            < p className = 'checkoutProduct__price' >
            <small> MAD </small>   
             <strong> < CurrencyFormat value = { price }
            displayType = {'text'}
            thousandSeparator = {true}
            prefix = {''}

            /></strong >
            </p> <div className = 'checkoutProduct__rating' > {
                Array(rating).fill().map((_, i) => ( 
                    <StarIcon key = { i }
                    className = 'product__starIcon' />

                ))

            } 
            </div> {
                !hideButton && ( 
                    <button onClick = { removeFromBasket } > remove from basket </button>

                )
            }

            </div>
             </div>
        )
    }

    export default CheckoutProduct