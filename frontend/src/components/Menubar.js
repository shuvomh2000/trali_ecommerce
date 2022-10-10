import React, { useEffect, useState,useContext } from 'react'
import {Link} from "react-router-dom";
import { Navbar, Nav,Dropdown,Drawer,List,Button,Message} from 'rsuite';
import { FaRegUserCircle,FaBalanceScale } from 'react-icons/fa';
import { AiOutlineHeart,AiOutlineShoppingCart } from 'react-icons/ai';
import { Store } from '../Store';
import axios from 'axios'

const Menubar = () => {
  const [open, setOpen] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);

  let [logo,setLogo] = useState({})
  const {state,dispatch,cartstate,cartdispatch} = useContext(Store)
  // const {cart} = cartstate
  // console.log('cartState', cart)

  useEffect(async()=>{
    let logoData = await axios.get('http://localhost:8000/logo')
    setLogo(logoData.data.img)
  },[])

  let handleLogout =()=>{
    dispatch({type: "USER_LOGOUT",})
    
  }

  let handleQuantity = (item,quantity)=>{
    cartdispatch({type:'CART_ADD_PRODUCT',payload:{...item,quantity}})
  }

  let handleDeleteCart = (item)=>{
    cartdispatch({type:'CART_REMOVE_PRODUCT',payload:item})
    localStorage.removeItem('cartItems')
  }

  let handleClearCart = (item)=>{
    cartdispatch({type:'CLEAR_CART'})
  }

  return (
    <>
    <div className='container menubar'>
        <Navbar className='main_menu'>
            <Navbar.Brand href="#">
            <img src={logo}/>
            </Navbar.Brand>
            <Nav className='menu_item'>
            <Nav.Item className='menu_items'>Home</Nav.Item>
            <Nav.Item className='menu_items'>pages</Nav.Item>
            <Nav.Item className='menu_items'>blog</Nav.Item>
            <Nav.Item className='menu_items'>contacts</Nav.Item>
            {state.userInfo
            ?
            <Dropdown className='menu_items' title={state.userInfo.Name}>
              {state.userInfo.isAdmin&&
                <Dropdown.Item><Link to='/admin'>Admin Dashboard</Link></Dropdown.Item>
              }
              <Dropdown.Item>About</Dropdown.Item>
                {state.userInfo.isVendor
                ?
                  <Dropdown.Item><Link to='/dashboard'>go to dashboard</Link></Dropdown.Item>
                :
                  <Dropdown.Item><Link to='/vendor'>become a vendor</Link></Dropdown.Item>
                }
              <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
            </Dropdown>
            :
              <Nav.Item>
                <Link to='/Registration'>
                sign up
                </Link>
              </Nav.Item>
            }
            </Nav>
            <Nav pullRight>
            <div className='icon'>
            <FaRegUserCircle className='icon_item'/>
            <AiOutlineHeart className='icon_item'/>
            <FaBalanceScale className='icon_item'/>
            <span onClick={() => setOpen(true)}>
            <AiOutlineShoppingCart className='icon_item cart'/>
                
            </span>
            <div className='round'>
                <p>{cartstate.cart.cartItems.length}</p>
            </div>
            </div>
            </Nav>
        </Navbar>
                  <Drawer open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                      <Drawer.Title>Shopping Cart</Drawer.Title>
                      <Drawer.Actions>
                      </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                      {cartstate.cart.cartItems.length > 0
                      
                      ?
                      <List>
                          {cartstate.cart.cartItems.map((item=>
                            <List.Item >
                              <img width='50' src={item.image}/>
                              <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.name}</h5>
                              <span style={{display:'inline-block',margin:'0 10px',width:'16px',height:'16px',borderRadius:'50%',background:`#${item.color}`}}></span>
                              <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.price}</h5>
                              <Button onClick={()=>handleQuantity(item,item.quantity+1)} color="green" appearance="primary">+</Button>
                              <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.quantity}</h5>
                              <Button onClick={()=>handleQuantity(item,item.quantity>1?item.quantity-1:item.quantity)} color="green" appearance="primary">-</Button>
                              <Button onClick={()=>handleDeleteCart(item)} style={{margin:'0 10px'}} color="red" appearance="primary">delete</Button>
                          </List.Item>
                          ))}
                      </List>
                      :
                      <Message type="error">Cart Is Empty</Message>
                    }
                      <Link to='/cartpage'>
                        <Button  style={{margin:'0 10px'}} color="green" appearance="primary">Cart Page</Button>
                      </Link>
                      <Link to='/compare'>
                        <Button  style={{margin:'0 10px'}} color="green" appearance="primary">compare</Button>
                      </Link>
                        <Button onClick={handleClearCart} style={{margin:'0 10px'}} color="red" appearance="primary">Delete</Button>
                    </Drawer.Body>
                  </Drawer>
    </div>
    </>
  )
}

export default Menubar