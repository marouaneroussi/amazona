import './App.css';
import Home from './Home'
import Login from './Auth/Login'
import Orders from './Orders'; 
import {useEffect} from 'react'
import {auth} from './firebase/firebase'
import {onAuthStateChanged} from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import {BrowserRouter  as Router, Routes, Route} from "react-router-dom"
import Checkout from './Checkout';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars,faChartPie, faHeart } from '@fortawesome/free-solid-svg-icons'
import ParentPayment from './ParentPayment';
import ProductInfo from './product/ProductInfo';
import React from 'react';
function App() {

  library.add(fab,faBars,faHeart)

 
  const userState = useSelector(state => state.user)
  //console.log('the user state is >>>>',userState)
  const dispatch = useDispatch()
  useEffect(()=>{
    
     onAuthStateChanged(auth,(authUser) =>{
      // console.log('the user is >>>',authUser)
       if(authUser){
       //the user just logged in / the user was logged in
       dispatch({
         type: 'SET_USER',
         user:authUser
       })
      }
      else{
      // the use is logged out
      dispatch({
        type: 'SET_USER',
        user:null
      })
      }
     
      })
    
  },[])
  return (
    <Router>
    <div className="app">
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      
      <Route path="/payment" element={<ParentPayment />} />
      <Route path="/orders" element={<Orders />} />
      <Route  path="/product/:slug" element={<ProductInfo />} />

    </Routes>
      
    </div>
    </Router>
  );
}

export default App;
