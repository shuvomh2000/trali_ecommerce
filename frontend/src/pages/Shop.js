import React,{ useEffect, useState,useContext }  from 'react'
import { Grid, Row, Col,Dropdown } from 'rsuite'
import Banner from '../components/Banner'
import Product from '../components/Product'
import axios from 'axios'

const Shop = () => {
    let [products,setProducts] = useState([])
    let [zara,setZara] = useState([])
    let [easy,setEasy] = useState([])
    let [man,setMan] = useState([])
    let [women,setWomen] = useState([])
    let [kids,setKids] = useState([])
    let [selected,setSelected] = useState("red")

  useEffect(()=>{
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/products')
      setProducts(data)
    }
    fetchProduct()
  },[])

  let handleBrandZara = (select) => {
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/shop/brand/zara')
      setZara(data)
      setSelected(select)
    }
    fetchProduct()
  }

  let handleBrandEasy = (select) => {
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/shop/brand/easy')
      setEasy(data)
      setSelected(select)
    }
    fetchProduct()
  }

  let handleCategoryMan = (select) => {
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/shop/category/man')
      setMan(data)
      setSelected(select)
    }
    fetchProduct()
  }

  let handleCategoryWomen = (select) => {
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/shop/category/women')
      setWomen(data)
      setSelected(select)
    }
    fetchProduct()
  }

  let handleCategoryKids = (select) => {
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/shop/category/kids')
      setKids(data)
      setSelected(select)
    }
    fetchProduct()
  }


  return (
    <>
        <Banner/>
        <div className='container shop'>
        <Grid fluid>
            <Row className="show-grid" gutter={30}>
                <Col xs={6}>
                    {/* <ShopSideBAR/> */}
                    <div>
                        <Dropdown title={selected == "man"?"Man":selected == "women"?"Women":selected == "kids"?"Kids":"Categories"}>
                            <Dropdown.Item onClick={()=>handleCategoryMan("man")}>Man</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleCategoryWomen("women")}>Women</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleCategoryKids("kids")}>Kids</Dropdown.Item>
                        </Dropdown>
                        <Dropdown title={selected == "zara"?"Zara":selected == "easy"?"Easy":"Brand"}>
                            <Dropdown.Item onClick={()=>handleBrandZara("zara")}>Zara</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleBrandEasy("easy")}>Easy</Dropdown.Item>
                        </Dropdown>
                      </div>
                </Col>
                <Col xs={18}>
                  {selected == 'zara'
                    ?
                    <>
                       {zara.map(item=>(
                      <Col xs={8}>
                        <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                      </Col>
                        ))}
                    </>
                  :
                  selected == 'easy'
                  ?
                  <>
                    {easy.map(item=>(
                    <Col xs={8}>
                      <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                    </Col>
                  ))}
                  </>
                  :
                  selected == 'man'
                  ?
                  <>
                    {man.map(item=>(
                    <Col xs={8}>
                      <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                    </Col>
                  ))}
                  </>
                  :
                  selected == 'women'
                  ?
                  <>
                    {women.map(item=>(
                    <Col xs={8}>
                      <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                    </Col>
                  ))}
                  </>
                  :
                  selected == 'kids'
                  ?
                  <>
                    {kids.map(item=>(
                    <Col xs={8}>
                      <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                    </Col>
                  ))}
                  </>
                  :
                 <>
                 {products.map(item=>(
                     <Col xs={8} >
                         <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
                     </Col>
                   ))}
                 </>
                  } 

                </Col>
            </Row>
        </Grid>
        </div>
    </>
  )
}

export default Shop