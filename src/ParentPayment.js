import React from 'react'
import Payment from './Payment'
import {Elements} from "@stripe/react-stripe-js"
import{loadStripe} from "@stripe/stripe-js"

function ParentPayment() {
    const stripePromise = loadStripe('pk_test_51KbP2AETTwnVoDDQTjw5FYQ3X3BQuiEipxjZj9dLgjOxfDLXoOewzBfvAfZo6l2V6MywDZRGcxBgd6VSja20Itu8009z0GA1Pl');
  return (

    <Elements stripe={stripePromise} >
    <Payment />
    </Elements>
  
  )
}

export default ParentPayment