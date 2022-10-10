import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Grid,Row,Col } from 'rsuite';



const Deal = () => {
    let [dealData,setDeal] =useState([])

    useEffect(async()=>{
        let dealData = await axios.get('http://localhost:8000/deal')
        setDeal(dealData.data)
    },[])

  return (
    <>
        <div className='container deal_part'>
        <Grid fluid>
            <Row className="show-grid" gutter={20}>
                {dealData.map((item,index)=>(
                      <Col xs={12}>
                          <div className='dealbox' style={{backgroundImage: `url(${item.img})`}}>
                                <h5>{item.subheading}</h5>
                                <h3>{item.heading}</h3>
                                <a className={`dealbtn${index}`}>{item.button}</a>
                          </div>
                      </Col>
                ))}
            </Row>
        </Grid>
        </div>
    </>
  )
}

export default Deal