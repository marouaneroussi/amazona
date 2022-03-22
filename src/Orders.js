import React,{useState,useEffect} from 'react'
import Header from './Header'
import './Orders.css'
import { useSelector  } from 'react-redux'
import { collection,query,onSnapshot,orderBy } from "firebase/firestore"; 
import {db} from './firebase/firebase'
import Order from './Order';

function Orders() {
    const[orders,setOrders]= useState([])
    const user = useSelector(state => state.user);
    console.log(user?.uid)
    useEffect(()=>{
        if(user){
            const unsub =query(collection(db, "users", user?.uid,'orders'),orderBy("created", "desc")) 
            onSnapshot(
                unsub,(snapshot)=>{
                    setOrders(snapshot.docs.map(doc=>({
                        id:doc.id,
                        data:doc.data()
                    })))
             
                }
            )
        }
        else{
            setOrders([])
        }
   
       
    },[user])
  return (
      <>
     <Header color="rgb(15, 15, 15)" position="relative"/>
    <div className='orders'>
        
        <h1>Your Orders</h1>
        <div className="orders__order" >
        {orders?.map(order=>(
        <Order key={order.id} order={order} />
        ))

        }    
        </div>
     
        
        </div>
    </>
  )
}

export default Orders