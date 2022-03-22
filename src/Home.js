import React,{useEffect,useState} from 'react'
import "./Home.css"
import Product from './Product'
import Header from './Header'
import Showcase from './components/Showcase'

function Home() {
  const [product,setProduct] = useState([])
  useEffect(()=>{
  
    const getproductData = async () =>{
     
      await fetch(`http://127.0.0.1:8000/api/list_product`)
      .then((res)=>res.json())
      .then((json)=>{
       
        setProduct(json)
      })
  
    }
    getproductData()
  
  },[])
  //console.log(product)
  return (
    <>
    <Header color="rgb(15, 15, 15)" position="relative" />
    <div className='home'>
      
        <div className='home__container'>
            <div className='main__container'>
              <Showcase />
              </div>
            
        
        <div className='home__row'>
          {
          Object.keys(product).map((item,i)=>(
            <Product 
            key={i}
            id={product[item].id}
            title={product[item].name}
            price={product[item].price}
            image={product[item].image}
            rating={product[item].rating}
            slug={product[item].slug}
            countInStock={product[item].countInStock}
            />
           
          ))
          
          }
        
      
        </div>

        <div className='home__row'>
          {
          Object.keys(product).map((item,i)=>(
            <Product 
            key={i}
            id={product[item].id}
            title={product[item].name}
            price={product[item].price}
            image={product[item].image}
            rating={product[item].rating}
            slug={product[item].slug}
            />
           
          ))
          
          }
        
      
        </div>

        <div className='home__row'>
          {
          Object.keys(product).map((item,i)=>(
            <Product 
            key={i}
            id={product[item].id}
            title={product[item].name}
            price={product[item].price}
            image={product[item].image}
            rating={product[item].rating}
            slug={product[item].slug}
            />
           
          ))
          
          }
        
      
        </div>
        </div>
    </div>
    </>
  )
}

export default Home