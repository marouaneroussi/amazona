import React, { useEffect, useState } from 'react'
import './ProductInfo.css'
import Header from '../Header'
import { useParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format'
import StarIcon from '@mui/icons-material/Star';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'
import { useSelector, useDispatch } from 'react-redux'

function ProductInfo() {
    //handle numeric input
    const [qte,setQte] = useState(1)
    const handleInputChange = (e)=>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        setQte(value)
    }
    //const panier = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const panier = useSelector(state => state.basket);
    console.log(panier.id)
    //console.log(panier)
    const baseUrl = 'http://127.0.0.1:8000/api/list_product_slug/';
    const [product, setProduct] = useState({})
    //get Slug Params
    const { slug } = useParams();
    //console.log(slug)
    useEffect(() => {

            const getproductData = async() => {

                await fetch(`${baseUrl}${slug}`)
                    .then((res) => res.json())
                    .then((json) => {

                        setProduct(json)

                    })

            }
            getproductData()


        }, [])
      
        
        //const {name} = product

        
       //ajouter au panier

       const addToBasket = ()=>{
    
        //dispatch the item into the data layer
        if(product.id!=panier.id){
       dispatch({
         type:"ADD_TO_BASKET",
         item:{
           id:product.id,
           title:product.name,
           image:product.image,
           price:product.price,
           rating:product.rating,
           countInStock:product.countInStock,
           quantity:Number(qte),
           
         },
       })
    }
      }
            
        
    return ( 
        <>
        <Header color = "rgb(15, 15, 15)" position="relative" />
           <div className='app__container'>
               <div className='details'>
                   <div className='big-img'>
                   <InnerImageZoom src={`http://127.0.0.1:8000/`+product.image} />
                       
                   </div>
                   <div className='box'>
                       <div className='row'>
                           <h2>{product.name}</h2>
                           <bdi><span className='price__amount'> <CurrencyFormat  
   
    decimalScale={2} 
    value={product.price}
    displayType={"text"}
    thousandSeparator={'.'}
    decimalSeparator={','}
    
    prefix={"MAD "}
    
    
    />  </span></bdi>
    <span className='product__InStock'>{product.countInStock>3 ?"Produit en stock"  :"Victime de son succée"}</span>
    <div className='product__rating'>
           {Array(product.rating).fill().map((_,i) => (
          <StarIcon key ={i} className='product__starIcon'/>
          
          ))
          
           }
         
          </div>
                       </div>
                       <p>{product.description}</p>
                       <p></p>
                       <div className='thumb'>

                       </div>
                       <div className='qte__row'>
                       {product.countInStock>3 ?
                      
                         
                         <input type="number"   className="input-text" value={qte}
                         onChange={handleInputChange}  step="1" min="1"  inputMode="numeric"></input>
                         :
                         <div></div>
                       }
                       <button className='cart' onClick={addToBasket}>ajouter au panier</button>
                       </div>
                   </div>
               </div>
           
        
               </div>
               <div className='app__container'>
               <div className='details'>
                  <div className='row__description'>
                      <h3>Description</h3>
                      <hr className="hr-24 hr-gray-100" />
                      <p>Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", proviennent de la section 1.10.32.

L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).</p>
                  </div>
               </div>
           
        
               </div>
               
       </>


        )
}

export default ProductInfo