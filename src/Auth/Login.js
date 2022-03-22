import React, {useState} from 'react'
import Header from '../Header'
import './Login.css'
import {Link} from 'react-router-dom'
import {SignUp,signIn} from '../firebase/firebase'
import{useNavigate} from 'react-router-dom'


function Login() {

 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const history = useNavigate();

 const Signin = async (e) =>{
  e.preventDefault()
  await signIn(email,password).then((authData) => {
    console.log("User login successfully with payload -", authData);
    if( authData){
      history("/")
    } 
}).catch((_error) => {
    console.log("Login Failed!", _error);
})
    
 }
 const  register = async (e) =>{
  e.preventDefault()
 
 
  await SignUp(email,password).then((authData) => {
    console.log("User created successfully with payload-", authData);
    if( authData){
      history("/")
    } 
}).catch((_error) => {
    console.log("Login Failed!", _error);
})
  
}
  return (
    <>
<Header color="rgb(15, 15, 15)"/>
    <div className='login'>
    <Link to='/'>
    <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
    </Link>
    <div className='login__container'>
    <h1>Sign-In</h1>
    <form>
      <h5>E-mail</h5>
      <input type='text' value={email} onChange={e=>setEmail(e.target.value)} />
      <h5>Password</h5>
      <input type='password'  value={password} autoComplete="on" onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={Signin} className='login_signinButton' >Sign In</button>
      
    </form> 
    <p>
        By signing-in you agree to the AMAZON 
        FAKE CLONE Conditions of Use & Sale.
        Please see our Privacy Notice, our 
        Cookies Notice and our Interest-Based
         Ads Notice.
      </p>
      <button onClick={register} className='login_registerButton' >Create your Amazon Account</button> 
    </div>
    
    </div>
    </>
  )
}

export default Login