import axios from 'axios';
import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import {Form,ButtonToolbar,Button} from 'rsuite';

const Registration = () => {

    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let navigate = useNavigate()


let handleSubmit = ()=>{
    async function fetchData() {
        let{data} = await axios.post('http://localhost:8000/Registration',{
            name: name,
            email: email,
            password: password
        })
        console.log(data)
        navigate("/login")
      }
      fetchData();
}

  return (
    <div className='registration'>
      <div className='container'>
        <div className='regbox'>
            <Form>
                <Form.Group controlId="name">
                    <Form.ControlLabel>Name</Form.ControlLabel>
                    <Form.Control name="name" onChange={(e)=>setName(e)}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.ControlLabel>email</Form.ControlLabel>
                    <Form.Control name="name" type="email" onChange={(e)=>setEmail(e)}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" onChange={(e)=>setPassword(e)} />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                    <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                    <p>already have an account? <Link to='/login'>login</Link></p>
                </Form.Group>
            </Form>
        </div>
      </div>
    </div>
  )
}

export default Registration