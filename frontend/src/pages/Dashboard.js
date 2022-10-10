import React from 'react'
import SideDashboard from '../components/SideDashboard'
import {Row,Col} from "rsuite"

const Dashboard = () => {
  return (
    <>
        <Row className="show-grid">
        <Col xs={4}>
            <SideDashboard></SideDashboard> 
        </Col>
        <Col xs={20}>
            <h1>welcome to dashboard</h1>
        </Col>
        </Row>
 
    </>
  )
}

export default Dashboard