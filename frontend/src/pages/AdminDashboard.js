import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import {Row,Col} from "rsuite"


const AdminDashboard = () => {
  return (
    <>
        <Row className="show-grid">
        <Col xs={6}>
            <AdminSideBar></AdminSideBar> 
        </Col>
        <Col xs={18}>
            <h1>welcome to dashboard</h1>
        </Col>
        </Row>
 
    </>
  )
}

export default AdminDashboard