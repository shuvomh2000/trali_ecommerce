import axios from 'axios';
import React, { useState,useContext } from 'react'
import {Link,useNavigate} from "react-router-dom";
import { Store } from '../Store';
import {Form,ButtonToolbar,Button} from 'rsuite';

const Login = () => {
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    const {state,dispatch} = useContext(Store)
    let navigate = useNavigate()


    let handleSubmit = ()=>{
      async function fetchData() {
          let{data} =await axios.post('http://localhost:8000/login',{
              email: email,
              password: password
          })
          console.log(data)
          dispatch({type:"USER_LOGIN", payload: data.data})
          localStorage.setItem('userInfo',JSON.stringify(data.data))
          navigate("/")
        }
        fetchData();
  }
  
  return (
    <div className='registration'>
      <div className='container'>
        <div className='regbox'>
            <Form>
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
                    <Button appearance="primary" onClick={handleSubmit} >Log In</Button>
                    </ButtonToolbar>
                    <p>don't have an account? <Link to='/Registration'>sign up</Link></p>
                </Form.Group>
            </Form>
        </div>
      </div>
    </div> 
  )
}

export default Login