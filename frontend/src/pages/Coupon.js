import React, { useState } from 'react'
import SideDashboard from '../components/SideDashboard'
import {Row,Col,Input,Button} from "rsuite"
import axios from 'axios'

const Coupon = () => {

    let [coupon,setCoupon] = useState('')
    let [discount,setDiscount] = useState('')

    let handleSubmit =async ()=>{
        let {data} = await axios.post('http://localhost:8000/coupon',{
            coupon: coupon,
            discount: discount
        })
    }

  return (
    <div className='coupon_part'>
        <Row className="show-grid">
        <Col xs={4}>
            <SideDashboard></SideDashboard> 
        </Col>
        <Col xs={20}>
            <div className='details'>
                <h3>Creating Coupon</h3>
                <Input onChange={(e)=>setCoupon(e)} placeholder="Coupon Name" />
                <Input onChange={(e)=>setDiscount(e)} placeholder="Discount" />
                <Button onClick={handleSubmit}>Create</Button>
            </div>
        </Col>
        </Row>
    </div>
  )
}

export default Coupon