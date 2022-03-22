
    export const initialState = {
        basket:[],
        user :null
    }
    export const getBasketTotal = (basket) =>
    
    basket?.reduce((amount,item)=>item.price*item.quantity + amount,0)
    const reducer = (state=initialState,action)=>{
    switch(action.type){
        case "EMPTY_BASKET":
            return{
              ...state,
              basket:[]
            };
        
        case "ADD_TO_BASKET":
            if(Object.keys(state.basket).length === 0) {
               
                return {
                    ...state,
                    basket:[...state.basket,action.item],
                };
                
            }
            else{
                let search = action.item.id
                console.log(state.basket)
                let filterData = state.basket.some(item => search === item.id);
                if(filterData){
                    const found = state.basket.findIndex(element => element.id === action.item.id);
                    state.basket[found].quantity++
                    state.basket[found].quantity+=action.item.quantity-1
                    return {
                        ...state,
                        basket:[...state.basket],
                    };
                }
                else{
                    return {
                        ...state,
                        basket:[...state.basket,action.item],
                    };
                     
                }
            }
           
         
          
            case "REMOVE_FROM_BASKET":
                let index = -1
    for(let i = 0; i < state.basket.length; i++) {
        if(state.basket[i].id === action.id) {
            index = i;
            break;
        }
        

    }
    let newBasket = [...state.basket]
    if(index>=0){
        newBasket.splice(index,1)
    }     
                
                return {
                    ...state,
                    basket:newBasket
                };
                case "SET_USER":
                    return {
                        ...state,
                        user:action.user,
                    };            
            default:
                return state;

    }
    }

    export default reducer;