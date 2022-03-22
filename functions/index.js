const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51KbP2AETTwnVoDDQKULGe8tHp4KNDVsdH8yX0YexhG0KpQhZQDtRUHBT1PpahaGhikjSoV7VdReyFXbXVkLKSjld00utPD01W0');

// -API
// - App config
const app=express();

// -Middlewares
app.use(cors({origin:true}));
app.use(express.json());
// -API routes
app.get('/',(request,response)=>response.status(200).send(
    'hello world'
));


app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;

    console.log('Payment Request Received!!! for this amount',total)
    const paymentIntent = await stripe.paymentIntents.create({
       amount : total,//subunits of the currency
       currency:"usd"
    });

    //pk - Created
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    });
});
// -Listen command
exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-app-3fd1d/us-central1/api