import React, { useState } from 'react';
import './Header.css';
import {Link} from "react-router-dom"
import { useSelector} from 'react-redux'
import { auth } from './firebase/firebase';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShoppingCart from './shoppingCart/ShoppingCart';
import Popover from '@mui/material/Popover';
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from "./reducers/reducer"





const Header = (props) => {
     const [anchorEl, setAnchorEl] = useState(null);

     const open = Boolean(anchorEl);
     const id = open ? 'simple-popover' : undefined;
   
     
     const user = useSelector(state => state.user)     
const panier = useSelector(state => state.basket);
     //hover basket
    
     const  showCartItem = (e) =>{
          
          setAnchorEl(e.currentTarget);

            
        }
      
        const handleClose = () => {
          setAnchorEl(null);
        };
      
     //console.log(headerColor)
     //css class
 
     const[navLinkOpen,setnavLinkOpen] = useState(false)
     
     const handleNavLinksToggle = ()=>{
          setnavLinkOpen(!navLinkOpen)
     }
     const renderClasses=()=>{
          let classes = "navlinks";
          if(navLinkOpen){
               classes+= " active"
          }

          return classes
          
     }
const anchor = 'right'
const handleAuthentication = () => {
     if(user) {
         // console.log(user)
          auth.signOut();
     }
}
  return (
    /*<div className='header'>
         <Link to="/">
        <img
         className='header__logo'
         src="/jrbike_logo.png"/>
      </Link>
        <div
        className='header__search'>
            <input className='header_searchInput' type="text" />
            
            <SearchIcon className="header__searchIcon"></SearchIcon>
        </div>
        <div className='header__nav'>
             <Link to={!user && '/login'}>
            <div onClick={handleAuthentication} className="header__option">
             <span className='header__optionLineOne'>
                 Hello {!user? 'Guest':user.email}
            </span>
            <span className='header__optionLineTwo'>
            {user ? 'Sign Out' : 'Sign In'}
            </span>
            </div>
            </Link>
            <Link to='/orders'>
            <div className="header__option">
            <span className='header__optionLineOne'>
                 Returns
            </span>
            <span className='header__optionLineTwo'>
                 & Orders
            </span>
            </div>
            </Link>
            <div className="header__option">
            <span className='header__optionLineOne'>
                your
            </span>
            <span className='header__optionLineTwo'>
                 Prime
            </span>
            </div>
            <Link to="/checkout">
            <div className="header__optionBasket">
                 
             <ShoppingBasketIcon className='basket__icon'/>
             <span className='header__optionLineTwo header__basketCount'>
                {panier?.length}
            </span>
             </div>
             </Link>
        </div>
    </div>*/

    <nav style={{backgroundColor: props.color, position:props.position}}>
         <Link to="/">
         <div className='logo'>
         <img
         className='header__logo'
         src="/jrbike_logo.png"/>
         </div>
         </Link>
         <ul className={renderClasses()}>
         <li className='link'>Accueil</li>   
         <li className='link'>Vehicule</li>     
         <li className='link'>Casques</li>     
         <li className='link'>Pantalons</li>     
         <li className='link'>Promotion</li>     
         
         </ul>
        
         <div  onClick={handleNavLinksToggle} className='hamburger__toggle' >
         <FontAwesomeIcon icon="fa-solid fa-bars" />
         </div>

         <Link className="header__optionBasket" to="">
         <div onMouseEnter={showCartItem}>
              <FontAwesomeIcon icon={faCartArrowDown}  className="basket__icon"/>
              <span  className="basket__count">{panier?.length}</span>    
           </div>
           </Link>
           {/*<Link to={!user && '/login'}>
            <div onClick={handleAuthentication} className="header__option">
             <span className='header__optionLineOne'>
                 Hello {!user? 'Guest':user.email}
            </span>
            <span className='header__optionLineTwo'>
            {user ? 'Se Connecter' : 'Se déconnecter'}
            </span>
            </div>
  </Link>*/}
          
        
         <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
           {
         panier.map(i => (
                 <ShoppingCart key = { i.id }
                id = { i.id }
                title = { i.title }
                image = { i.image }
                price = { i.price }
                countInStock = { i.countInStock }
                quantity = { i.quantity }
                />
            ))
          }
          <div className='card__total'>
        <h5>Total Panier:</h5>
        <strong>  <CurrencyFormat  
    
    decimalScale={2} 
    value={getBasketTotal(panier)}
    displayType={"text"}
    thousandSeparator={'.'}
    decimalSeparator={','}
    decimalPrecision= "2"
    prefix={"MAD "}
    
    
    />    
        </strong>
    </div>
    <div className='view__basket'>
         <Link to='/checkout'>
    <button className='cart__view'>voir le panier</button>
    </Link>
    <Link to='/payment'>

    <button className='cart_checkout'>commander</button>
    </Link>
    </div>
    
      </Popover>
     
    </nav>

  )
}

export default Header