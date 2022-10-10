import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {Panel} from 'rsuite'
import { BsStarFill,BsStarHalf,BsStar,BsHandbag } from 'react-icons/bs';
import { getSelectedItems } from 'rsuite/esm/CheckTreePicker/utils';
import { Store } from '../Store';


const Product = (props) => {
  const {cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate
  const [activeColor,setActivecolor] = useState('')
  const [activeSize,setActiveSize] = useState('')

  let handleCartProductAdd = (product)=>{
    const existingItem = cart.cartItems.find((item)=>item._id === product._id)
    const quantity = existingItem?existingItem.quantity+1:1
    const color = activeColor
    const size = activeSize
    cartdispatch({type:'CART_ADD_PRODUCT',payload:{...product,quantity,color,size}})
  }

  return (
  <>
    <Panel  bodyFill style={{ display: 'inline-block', width: "100%" }}>
      <img src={props.image} style={{ width: "100%" }}/>
      <div className='ratingbox'>
        <div>
            {props.rating >= 1?<BsStarFill className='ratingIcon'/>:props.rating >= .5? <BsStarHalf className='ratingIcon'/>:<BsStar className='ratingIcon'/>}
            {props.rating >= 2?<BsStarFill className='ratingIcon'/>:props.rating >= 1.5? <BsStarHalf className='ratingIcon'/>:<BsStar className='ratingIcon'/>}
            {props.rating >= 3?<BsStarFill className='ratingIcon'/>:props.rating >= 2.5? <BsStarHalf className='ratingIcon'/>:<BsStar className='ratingIcon'/>}
            {props.rating >= 4?<BsStarFill className='ratingIcon'/>:props.rating >= 3.5? <BsStarHalf className='ratingIcon'/>:<BsStar className='ratingIcon'/>}
            {props.rating >= 5?<BsStarFill className='ratingIcon'/>:props.rating >= 4.5? <BsStarHalf className='ratingIcon'/>:<BsStar className='ratingIcon'/>}
        </div>
        <div>
          <h4 className='ratingBoxBrand'>{props.brand}</h4>
        </div>
      </div>

      <Panel className='heading'>

        <div className='ratingbox'>
          <Link to={`productdetails/${props.product._id}`}>
            <h3>{props.heading}</h3>
          </Link>
          <div>
            {props.color.map(item=>(
              <span className={activeColor == item ? 'productColor activeColor': 'productColor'} onClick={()=>setActivecolor(item)} style={{background: `#${item}`}}></span>
            ))}
          </div>
          <div>
            {props.size.map(item=>(
                <span className={activeSize == item ? 'productSize activeSize': 'productSize'} onClick={()=>setActiveSize(item)}>{item}</span>
              ))}
          </div>
        </div>
        <div className='productPrice'>
          <span onClick={()=>handleCartProductAdd(props.product)} className='productPriceBox'>
              <BsHandbag className='productPriceIcon'/>
          </span>
          <span className='productRate'>
          {`$${props.price}`}
          </span>
        </div>
      </Panel>
    </Panel>
  </>
  )
}

export default Product