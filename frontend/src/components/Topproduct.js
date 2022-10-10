import React, { useEffect, useState } from 'react'
import { Grid, Row, Col } from 'rsuite';
import Product from './Product';
import axios from 'axios'

const Topproduct = () => {

  let [products,setProducts] = useState([])
  useEffect(()=>{
    async function fetchProduct(){
      let {data} = await axios.get('http://localhost:8000/products')
      setProducts(data)
    }
    fetchProduct()
  },[])
  return (
    <>
    <div className='container topProduct'>
    <Grid fluid>
        <Row className="show-grid">
        <Col xs={12}>
            <h2>top product</h2>
        </Col>
        <Col xs={12}>
            <ul className='catogeries'>
                <li>All</li>
                <li>Boys Collection</li>
                <li>Girl Collection</li>
                <li>Shose Collection</li>
            </ul>
        </Col>
        </Row>
    </Grid>
    <Grid fluid>
        <Row className="show-grid" gutter={30}>
        
            {products.map(item=>(
              <Col xs={6} >
                  <Product product={item} image={item.image}  heading={item.name} brand={item.brand} color={item.color} size={item.size} price={item.price}/>
              </Col>
            ))}
        </Row>
    </Grid>
    </div>
    </>
  )
}

export default Topproduct