import React, { useState } from 'react'
import AdminSideBar from '../components/AdminSideBar'
import {Row,Col,Form,ButtonToolbar,Button} from "rsuite"
import axios from 'axios'

const ProductPosition = () => {

    let [name,setName] = useState('')
    let handleSubmit =async ()=>{
        let {data} = await axios.post('http://localhost:8000/productposition',{
            name: name
        })
        console.log(data)
    }
  return (
    <Row className="show-grid">
        <Col xs={6}>
            <AdminSideBar></AdminSideBar> 
        </Col>
        <Col xs={18}>
        <Form fluid>
                <Form.Group controlId="name">
                    <Form.ControlLabel>Name</Form.ControlLabel>
                    <Form.Control name="name" onChange={(e)=>setName(e)}/>
                </Form.Group>    
                <Form.Group>
                    <ButtonToolbar>
                    <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                </Form.Group>
        </Form>
        </Col>
        </Row>
  )
}

export default ProductPosition