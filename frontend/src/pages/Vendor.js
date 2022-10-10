import React, { useState,useContext } from 'react'
import {Checkbox,Button} from 'rsuite'
import {Store} from '../Store'
import axios from 'axios'

const Vendor = () => {
    let [agree,setAgree] = useState(false)
    const {state} = useContext(Store)

    let handleVendor = async ()=>{
        let {data} = await axios.put(`http://localhost:8000/vendor/${state.userInfo._id}`)
        console.log(data)
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo',JSON.stringify(data))
    }

  return (
    <div className='vendor'>
        <div className='container'>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <Checkbox onChange={()=>setAgree(!agree)}> accept the agreement</Checkbox><br/>
            {
                agree
                ?
                <Button appearance="primary" onClick={handleVendor}>becomer a vendor</Button>
                :
                <Button appearance="primary" disabled>becomer a vendor</Button>
            }

           
        </div>
    </div>
  )
}

export default Vendor