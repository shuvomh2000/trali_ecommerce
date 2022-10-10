import React, { useState } from 'react'
import {Button} from "rsuite"


const Counter = () => {

    const [val,setVal] = useState(0)
    

    let handleInc1 = ()=>{
        setVal(val+1)
        let val1=val
        console.log(val1)
    }
    let handleDec1 = ()=>{
        setVal(val-1)
        // if(val > 0){
        //     setVal(val-1)
        // }else{
        //     setVal(0)
        // }
    }
    let handleInc2 = ()=>{
        setVal(val+1)
        let val2=val
        console.log(val2)

    }
    let handleDec2 = ()=>{
        setVal(val-1)
        // if(val > 0){
        //     setVal(val-1)
        // }else{
        //     setVal(0)
        // }
    }
    let handleInc3 = ()=>{
        setVal(val+1)
        let val3=val
    }
    let handleDec3 = ()=>{
        setVal(val-1)
        // if(val > 0){
        //     setVal(val-1)
        // }else{
        //     setVal(0)
        // }
    }
  return (
    <div className='container'>
        <div>
            <h1>{val}</h1>
            <Button color="green" appearance="primary" onClick={handleInc1}>inc</Button>
            <Button color="red" appearance="primary" onClick={handleDec1}>Drc</Button>
        </div>
        <div>
            <h1>{val}</h1>
            <Button color="green" appearance="primary" onClick={handleInc2}>inc</Button>
            <Button color="red" appearance="primary" onClick={handleDec2}>Drc</Button>
        </div>
        <div>
            <h1>{val}</h1>
            <Button color="green" appearance="primary" onClick={handleInc3}>inc</Button>
            <Button color="red" appearance="primary" onClick={handleDec3}>Drc</Button>
        </div>
        {/* <h2>{val1+val2+val3}</h2> */}
    </div>
  )
}

export default Counter