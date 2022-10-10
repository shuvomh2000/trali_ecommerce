import React,{useState,useContext} from 'react'
import { Grid, Row, Col,Button } from 'rsuite';
import { BsStarFill,BsStarHalf,BsStar,BsHandbag } from 'react-icons/bs';
import { Store } from '../Store'


const Compare = () => {
    const {comparestate,comparedispatch,cartstate,cartdispatch} = useContext(Store)
    const {cart} = cartstate
    const {compare} = comparestate

    let handleCartProductAdd = (product)=>{
      const existingItem = cart.cartItems.find((item)=>item._id === product._id)
      const quantity = existingItem?existingItem.quantity+1:1
      cartdispatch({type:'CART_ADD_PRODUCT',payload:{...product,quantity}})
    }

    let handleDeleteCompare = (item) => {
      comparedispatch({type:'COMPARE_REMOVE_PRODUCT',payload:item})
      localStorage.removeItem('compareItems')
    }

  return (
    <div className='container compare'>
      <h1>Compare Items</h1>
         <Grid fluid>
              <Row className="show-grid" gutter={30}>
                    <Col xs={7}>item</Col>
                    <Col xs={4}>color</Col>
                    <Col xs={3}>size</Col>
                    <Col xs={6}>material</Col>
                    <Col xs={2}>price</Col>
              </Row>
              
                {compare.compareItems.map(item=>(
                  <Row style={{marginTop:'20px'}}>
                      <Col xs={7} >
                      <div style={{display:'flex'}}>
                          <div >
                            <img width='100px' src={item.image}/>
                          </div>
                          <div>
                              <h6>{item.brand}</h6>
                              <h3 style={{display:'block'}}>{item.name}</h3>
                              <span onClick={()=>handleCartProductAdd(item)} style={{display:'block'}} className='Btn_art'><BsHandbag className='cart_btn'/></span>
                          </div>
                        </div>
                           
                        
                      </Col>
                      <Col xs={4}>
                        <span style={{display:'inline-block',width:'16px',height:'16px',marginTop:'20px',borderRadius:'50%',background:`#${item.color}`}}></span>
                      </Col>
                      <Col xs={3}>
                        <span style={{display:'block',marginTop:'20px'}}>
                          {item.color}
                        </span>
                      </Col>
                      <Col xs={6} style={{marginTop:'20px'}}>material</Col>
                      <Col xs={2} className='price'>${item.price}</Col>
                      <Col xs={2} style={{marginTop:'20px'}} onClick={()=>handleDeleteCompare(item)}>X</Col>
                      </Row>
                ))}
              

          </Grid>
    </div>
  )
}

export default Compare