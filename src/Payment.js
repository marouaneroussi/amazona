import React,{useEffect, useState} from 'react'
import Header from './Header'
import  './Payment.css'
import {Link} from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from "./reducers/reducer"
import { useSelector,useDispatch  } from 'react-redux'
import{useNavigate} from 'react-router-dom'
import axios from './axios'
import {db} from './firebase/firebase'
import { collection, addDoc,setDoc ,doc} from "firebase/firestore"; 
import {CardElement ,useStripe,useElements} from "@stripe/react-stripe-js"
import instance from './axios'

function Payment({id,image,title,price,rating}) {
    const basket = useSelector(state => state.basket);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    //navigation router
    const navigate = useNavigate()

//stripe form submit

const stripe = useStripe();
const elements = useElements();

const [error,setError] = useState(null)
const [disabled, setDisabled] = useState(true)
const [succeeded, setSucceeded] = useState(false)
const [processing, setProcessing] = useState("")
const [clientSecret, setClientSecret] = useState(true)

useEffect(()=>{
    //generate the special stripe secret with allows us to charge a customer
    const getClientSecret = async () =>{
       /* const response = await axios({
            method: 'post',
            //stripe expects the total in a currencies subunits
            url:`/payments/create?total=${getBasketTotal(basket)*100}`
         })
        setClientSecret(response.data.clientSecret)*/
         await fetch(`https://ilaftech.com/api/stripe-payement/${getBasketTotal(basket)*100}`,{
            method:'POST',
            mode:'no-cors',
            headers: {
                'Content-Type': 'application/json',
              },
             
              body: JSON.stringify({
                currency: 'usd',
              })
        }).then((response)=>response.text())
        .then((data) =>setClientSecret(data))

        
        
    }
    getClientSecret()
},[basket])

//console.log("the secret is >>",clientSecret);
//console.log(db)
const handleSubmit = async (e) =>{
    
    e.preventDefault();
    setProcessing(true)
      
    const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method : {
            card : elements.getElement(CardElement)
        }
    }).then(({paymentIntent})=>{

        //paymentIntent = payment confirmation
        
        setSucceeded(true)
        setError(null)
        setProcessing(false)
         dispatch({
             type:'EMPTY_BASKET'
         })

         try {
             
            const paymentRef = doc(db, "users",user.uid , "orders", paymentIntent.id);
            setDoc(paymentRef, {
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
       
        }

       catch (e) {
            console.log("Error adding document: ", e);
          }
  
        navigate('/orders')


    })
}

//handle change

const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message:"")
}
    
  return (
    <>
<Header color="rgb(15, 15, 15)" position="relative"/>
      <div className='payment'>
          <div className='payment__container'>
               <h1>Checkout (
                   <Link to='/checkout'>{basket?.length} items)</Link>
                   </h1>    

          <div className='payment__section'>
              <div className='payment__title'>
               <h3>Delivery Address</h3>
               </div>
              
               <div className='address__info'>
                <p>{!user?'Guest':user.email}</p>
                <p>123 React lane Los Angeles,CA</p>
               </div>
               
          </div>    
          <div className='payment__section'>
              <div className='payment__title'>
          <h3>Review items and Delivery</h3>  
          </div>
          <div className='payment__items'>

          {basket.map(i=>(
            <CheckoutProduct 
            key ={i.id}
            id={i.id}
            title={i.title}
            image={i.image}
            price={i.price}
            rating={i.rating}
            />
          ))}
          </div> 
          </div>    
          <div className='payment__section'>
          <h3>Payment Method</h3>    
          <div className='card__detail'>
           <h5>Card Detail</h5>  
           {/* stripe goes here */}  
           <form onSubmit={handleSubmit}>
               <CardElement onChange={handleChange}/>
               <div className='payment__priceContainer'>
               <CurrencyFormat  
    renderText={(value)=>(
       <>
       <h3>
           Order Total : {value}
           
       </h3>
       
       </>

    )}
    decimalScale={2} 
    value={getBasketTotal(basket)}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"$"}
    
    />  
    <button disabled={processing || disabled || succeeded}>
     <span>{processing ? <p>Processing</p> : "Buy Now"}</span>    
    </button>
               </div>
               {error && <div>error</div>}
           </form>
          </div>
          </div>    
          
          </div>

      </div>
   </>
  )
}

export default Payment