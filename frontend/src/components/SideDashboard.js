import React from 'react'
import { Nav } from 'rsuite'
import {Link} from "react-router-dom";


const SideDashboard = () => {
  return (
    <div>
         <Nav>
            <Nav.Item>
                <Link to='/productupload'>Product Upload</Link>
            </Nav.Item><br/>
            <Nav.Item>
                <Link to='/storename'>Create A Store</Link>
            </Nav.Item><br/>
            <Nav.Item>
              <Link to='/coupon'>Create Coupon</Link>  
            </Nav.Item><br/>
            <Nav.Item>Solutions</Nav.Item><br/>
            <Nav.Item>Products</Nav.Item><br/>
            <Nav.Item>About</Nav.Item>
        </Nav>
    </div>
  )
}

export default SideDashboard