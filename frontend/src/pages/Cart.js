import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Grid,Row,Col,Button,Input} from 'rsuite'
import { Store } from '../Store'

const Cart = () => {

    const {cartstate,cartdispatch} = useContext(Store)
    const{ cart } = cartstate

    let [total,setTotal] = useState('')
    let [shipping,setShipping] = useState(0)
    let [intercoupon,setIntercoupon] = useState(0)
    let [interdiscount,setInterdiscount] = useState(0)

    let handleApply = async()=>{
        let {data} = await axios.get(`http://localhost:8000/coupon/${intercoupon}`)
        console.log(data)
        setInterdiscount(data[0].discount)
    }

    useEffect(()=>{
        let price = 0
        cart.cartItems.map((item)=>{
            price += item.price * item.quantity 
            setTotal(price)
            if(price>=600){
                setShipping(100)
            }else if(price>=200){
                setShipping(150)
            }else{
                setShipping(200)
            }
        })
    },[cart.cartItems])

    let handleQuantity = (item,quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT',payload:{...item,quantity}})
    }

    let handleDeleteCart = (item)=>{
        cartdispatch({type:'CART_REMOVE_PRODUCT',payload:item})
        localStorage.removeItem('cartItems')
    }
    
  return (
    <div className='container'>
        <div className='cartpage'>
            <h1>cart page</h1>
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={16}>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col className='subheading' xs={11}>item</Col>
                            <Col className='subheading' xs={3}>price</Col>
                            <Col className='subheading' xs={5}>quantity</Col>
                            <Col className='subheading' xs={4}>subtotal</Col>
                            <Col className='subheading' xs={1}></Col>
                        </Row>
                    </Grid>
                    {cart.cartItems.map(item=>(
                            <Row className="show-grid" style={{marginTop:'20px'}}>
                                    <Grid fluid>
                                        <Row className="show-grid">
                                            <Col xs={11}>
                                                <div className='box'>
                                                    <div className='img'>
                                                        <img src={item.image} width='124px'/>
                                                    </div>
                                                    <div className='details'>
                                                        <h6 className='brand'>{item.brand}</h6>
                                                        <h6 className='name'>{item.name}</h6>
                                                        <h6 className='color'>Color<span style={{display:'inline-block',margin:'0 10px',width:'16px',height:'16px',borderRadius:'50%',background:`#${item.color}`}}></span></h6>
                                                        <h6 className='color'>size</h6>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className='subheading' xs={3}>
                                                <h6 className='car_pricing'>${item.price}</h6>
                                            </Col>
                                            <Col className='subheading' xs={5}>
                                                <div className='quantity'>
                                                <Button className='button' onClick={()=>handleQuantity(item,item.quantity>1?item.quantity-1:item.quantity)}>-</Button>
                                                <h6 className='quantity_count'>{item.quantity}</h6>
                                                <Button className='button'onClick={()=>handleQuantity(item,item.quantity+1)}>+</Button>
                                                </div>
                                            </Col>
                                            <Col className='subheading' xs={4}>
                                                <h6 className='subtotal'>${item.price * item.quantity}</h6>
                                            </Col>
                                            <Col className='subheading' xs={1}>
                                                <Button onClick={()=>handleDeleteCart(item)} className='cross'>x</Button>
                                            </Col>
                                        </Row>
                                    </Grid>
                            </Row>
                        ))}
                </Col>
                <Col xs={8}>
                    <div className='payment'>
                            <h4 className='heading'>shipping</h4>
                            <Input placeholder="state" />
                            <Input placeholder="adress" />
                            <Input placeholder="phone number" />
                            <div  className='coupon_input'>
                            <Input onChange={(e)=>setIntercoupon(e)} placeholder="coupon code" />
                            <Button onClick={handleApply} className='coupon_btn'>Apply</Button>
                            </div>
                            
                        <div className='subtotal'>
                                <div className='left'>subtotal</div>
                                <div className='right'>${total}</div>
                        </div>
                        <div className='shipping'>
                                <div className='left'>shipping</div>
                                <div className='right'>${shipping}</div>
                        </div>
                        <div className='shipping'>
                                <div className='left'>Discount: {interdiscount}%</div>
                                <div className='right'>
                                    ({interdiscount?((total+shipping)*interdiscount/100):0})
                                </div>
                        </div>
                        <div className='total'>
                                <div className='left'>order total</div>
                                <div className='right'>${interdiscount?((total+shipping)-(total+shipping)*interdiscount/100):total+shipping}</div>
                        </div>
                    </div>
                </Col>
                
            </Row>

           
        </Grid>
        </div>
    </div>
  )
}

export default Cart