import React from 'react'
import './Product.css'
import StarIcon from '@mui/icons-material/Star';
import { useSelector, useDispatch } from 'react-redux'
import { faCartArrowDown, faCartPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate,Link } from "react-router-dom";
const Product = ({id,title, image, price, rating,slug,countInStock,qte}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const panier = useSelector(state => state.basket);
  const baseUrl = "http://127.0.0.1:8000/"
  console.log(panier)
  const  formatToCurrency= (amount)=>{
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}
  //navigate with slug

  const changeRoute = () =>{
    navigate(`product/${slug}`);
  }
  const addToBasket = ()=>{
    
    //dispatch the item into the data layer
   dispatch({
     type:"ADD_TO_BASKET",
     item:{
       id:id,
       title:title,
       image:image,
       price:price,
       rating:rating,
       countInStock:countInStock,
       quantity:1
       
     },
   })
  }
  return (
    
    <div
    className='product'  >
      
      <div className='product__info' onClick={changeRoute}>
        
        <p>
{title}
</p>
        <p className='product__price' onClick={changeRoute}>
          <small>MAD </small>
          <strong>{formatToCurrency(price)}</strong>
          </p>
          <div className='product__rating'>
           {Array(rating).fill().map((_,i) => (
          <StarIcon key ={i} className='product__starIcon'/>
          
          ))
          
           }
         
          </div>
        </div>


        <div className='mkdf-pli-image' onClick={changeRoute}>
        <img src={baseUrl+image} alt="lean startup" />
        </div>

        { /*<button className='add__toBasketBtn' onClick={addToBasket}>Add to Basket</button>*/}
     <div className='center'>
        <div className='show__product__detail' onClick={changeRoute}><FontAwesomeIcon  icon={faMagnifyingGlass}  className="basket__icon"/></div>
        <div className='add__toBasketBtn' onClick={addToBasket}><FontAwesomeIcon  icon={faCartPlus} /></div>
    
        </div>
        
    </div>
    
  )
}

export default Product