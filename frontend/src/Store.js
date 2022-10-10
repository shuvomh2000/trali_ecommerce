import { createContext,useReducer } from "react";

const Store = createContext()

const userInitialState = {
    userInfo: localStorage.getItem('userInfo')
    ?
    JSON.parse(localStorage.getItem('userInfo'))
    :
    null
}

const cartInitialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
    }
}

const compareInitialState = {
    compare:{
        compareItems: localStorage.getItem('compareItems')?JSON.parse(localStorage.getItem('compareItems')):[]
    }
}

function userReducer(state,action){
    switch(action.type){
        case 'USER_LOGIN':
            return({...state,userInfo:action.payload})
        case 'USER_LOGOUT':
            localStorage.removeItem('userInfo')
            return({...state,userInfo: null
             })
            default:
                return state
    }
}

function cartReducer(state,action){
    switch(action.type){
        case 'CART_ADD_PRODUCT':{
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find((item)=> item._id === newItem._id)
            const cartItems = existingItem
                  ?
                  state.cart.cartItems.map((item)=> item._id === existingItem._id?newItem:item)
                  :
                  [...state.cart.cartItems,newItem]
                  localStorage.setItem("cartItems",JSON.stringify(cartItems))
                  return {...state,cart:{...state.cart,cartItems}}
        }
        case 'CART_REMOVE_PRODUCT':{
            const cartItems = state.cart.cartItems.filter((item)=>item._id !== action.payload._id)
            return {...state,cart:{...state.cart,cartItems}}
        }
        case 'CLEAR_CART':{
            localStorage.removeItem('cartItems')
            return {...state,cart:{...state.cart,cartItems:[]}}
        }
            
        default:
            return state
    }
}

function compareReducer(state,action){
    switch(action.type){
        case 'COMPARE_ADD_PRODUCT':{
            const newItem = action.payload
            const existingItem = state.compare.compareItems.find((item)=> item._id === newItem._id)
            const compareItems = existingItem
                  ?
                  state.compare.compareItems.map((item)=> item._id === existingItem._id?newItem:item)
                  :
                  [...state.compare.compareItems,newItem]
                  localStorage.setItem("compareItems",JSON.stringify(compareItems))
                  return {...state,compare:{...state.compare,compareItems}}
        }
        case 'COMPARE_REMOVE_PRODUCT':{
            const compareItems = state.compare.compareItems.filter((item)=>item._id !== action.payload._id)
            return {...state,compare:{...state.compare,compareItems}}
        }
        // case 'CLEAR_COMPARE':{
        //     localStorage.removeItem('compareItems')
        //     return {...state,compare:{...state.compare,compareItems:[]}}
        // }
            
        default:
            return state
    }
}



function StoreProvider(props){
    let [state,dispatch] = useReducer(userReducer,userInitialState)
    let [cartstate,cartdispatch] = useReducer(cartReducer,cartInitialState)
    let [comparestate,comparedispatch] = useReducer(compareReducer,compareInitialState)
    const value = {state,dispatch,cartstate,cartdispatch,comparestate,comparedispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
export {Store,StoreProvider}