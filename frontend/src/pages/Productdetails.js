import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Row, Col,Button } from 'rsuite';
// import { AiOutlineHeart } from 'react-icons/Ai';
import { FaHeart,FaBalanceScale } from 'react-icons/fa';
import Product from '../components/Product'
import { Store } from '../Store'




const Productdetails = (props) => {
    const {cartstate,cartdispatch,comparestate,comparedispatch} = useContext(Store)
    const{ cart } = cartstate
    const{ compare } = comparestate
    const params = useParams()
    let [products,setProducts] = useState({})
    let [relateds,setRelateds] = useState({})
    const [activeColor,setActivecolor] = useState('')
    const [activeSize,setActiveSize] = useState('')

    let [color,setColor] = useState([])
    let [size,setSize] = useState([])
    let [selected,setSelected] = useState("Description")
    

    useEffect(() => {
        async function fetchData(){
            let {data} = await axios.get(`http://localhost:8000/productdetails/${params.id}`)
            let related  = await axios.get(`http://localhost:8000/productdetails/related/${data.brand}`)
            setRelateds(related.data)
            setProducts(data)
            setColor(data.color)
            setSize(data.size)
        }
        fetchData()
    },[])

    let handleQuantity = (item,quantity)=>{
      cartdispatch({type:'CART_ADD_PRODUCT',payload:{...item,quantity}})
  }

  let handleSelected = (select) => {
    setSelected(select)
  }

  let handleAddCompare =(product)=>{
    const color = activeColor
    const size = activeSize
    comparedispatch({type:'COMPARE_ADD_PRODUCT',payload:{...product,color,}})
  }

  return (
    <div className='singleProduct container'>
      <Grid fluid>
        <Row className="show-grid" gutter={30}>
              <Col xs={10}>
                <img width='100%' src={`/${products.image}`}/>
              </Col>
              <Col xs={14} >
                <h1>{products.name}</h1>
                <Row className="show-grid price_bar" gutter={30}>
                      <Col xs={4}>
                        <h3 className='price'>{products.price}<span>351</span></h3>
                      </Col><Col xs={1}></Col>
                      <Col xs={4}>
                          <h3 className='stock'><span></span>in stock</h3>
                      </Col><Col xs={11}></Col>
                      <Col xs={4} style={{display:'flex'}}>
                        <div className='round'><FaHeart /></div>
                        <div onClick={()=>handleAddCompare(products)} className='round'><FaBalanceScale /></div>
                      </Col>
                </Row>
                <p><div dangerouslySetInnerHTML={{ __html: products.description}}></div></p>
                <Row className="show-grid color_size" gutter={30}>
                      <Col xs={10}>
                      <div>
                        <h3 className='color'>select colour
                        {color.length>0
                          &&
                          color.map(item=>(
                            <span className={activeColor == item ? 'productColor activeColor': 'productColor'} onClick={()=>setActivecolor(item)} style={{background:`#${item}`}}></span>
                          ))}
                        </h3>
                      </div>
                      </Col>
                      <Col xs={14}>
                        <div>
                        <h3 className='color'>chosse size
                          {size.length>0
                              &&
                              size.map(item=>(
                                <span className={activeSize == item ? 'productSize activeSize': 'productSize'} onClick={()=>setActiveSize(item)}>{item}</span>
                          ))}
                          </h3>
                        </div>
                      </Col>
                </Row>
                <Row className="show-grid add_cart" gutter={30}>
                      <Col xs={4}>
                          {cart.cartItems.map(item=>(
                            item._id ==params.id &&
                            <>
                              <div className='quantity'>
                              <Button className='button' onClick={()=>handleQuantity(item,item.quantity>1?item.quantity-1:item.quantity)}>-</Button>
                              <h6 className='quantity_count'>{item.quantity}</h6>
                              <Button className='button'onClick={()=>handleQuantity(item,item.quantity+1)}>+</Button>
                            </div>
                            </>
                          ))}
                      </Col>
                      <Col xs={1}></Col>
                      <Col xs={8}>
                        <div className='addCart'>
                            <h3 className='heading'>Add to cart</h3>
                        </div>
                      </Col>
                      <Col xs={1}></Col>
                      <Col xs={2}>
                      {cart.cartItems.map(item=>(
                            item._id ==params.id &&
                            <>
                              <div className='total'>
                                <h3>${item.price * item.quantity}</h3>
                            </div>
                            </>
                          ))}
                      </Col>
                </Row>
              </Col>
              {relateds.length > 0 &&
              relateds.map(item=>(
                  <Col xs={8}>
                    <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                  </Col>
              ))}
        </Row>
    </Grid>
    <Grid>
    <Row style={{marginTop:'20px'}}>
        <Col xs={24} className='tabs'>
            <div style={{textAlign:'center'}}>
              <Button onClick={()=>handleSelected('Description')} className='btn'>Description</Button>
              <Button onClick={()=>handleSelected('Reviews')} className='btn'>Reviews (4)</Button>
              <Button onClick={()=>handleSelected('Additional')} className='btn'>Additional Information</Button>
            </div>
            {selected == "Description" &&
              <h3>
              Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </h3>
            }
            {selected == "Reviews" &&
              <h3>
                Reviews Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </h3>
            }
            {selected == "Additional" &&
              <h3>
              Additional Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </h3>
            }
        </Col>
    </Row>
    </Grid>
    </div>
  )
}

export default Productdetails