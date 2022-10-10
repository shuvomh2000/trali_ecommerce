import React from 'react'
import { Nav } from 'rsuite'
import {Link} from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div>
         <Nav>
            <Nav.Item>
                <Link to='#'>Create Category</Link>
            </Nav.Item><br/>
            <Nav.Item>
                <Link to='/productposition'>Product Position</Link>
            </Nav.Item><br/>
            <Nav.Item>
                <Link to='#'>Create Brand</Link>
            </Nav.Item><br/>
            <Nav.Item>News</Nav.Item><br/>
            <Nav.Item>Solutions</Nav.Item><br/>
        </Nav>
    </div>
  )
}

export default AdminSideBar