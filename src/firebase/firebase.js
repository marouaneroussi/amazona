// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyAE4ddk-7GcmSxTnvFXnVo3Mh5nY9R2Hbk",
  
    authDomain: "clone-app-3fd1d.firebaseapp.com",
  
    projectId: "clone-app-3fd1d",
  
    storageBucket: "clone-app-3fd1d.appspot.com",
  
    messagingSenderId: "432723787766",
  
    appId: "1:432723787766:web:ed5aad530d5c890367d1d7",
  
    measurementId: "G-QY55XF08W9"
  
  };



  const app = initializeApp(firebaseConfig);

  //firestore access
  const db =getFirestore();
  
  
  const auth = getAuth()


    function SignUp(email,password){
     return createUserWithEmailAndPassword(auth,email,password)
  }
    function signIn(email,password){
    return signInWithEmailAndPassword(auth,email,password)
 }
 export {auth,db, SignUp,signIn}
