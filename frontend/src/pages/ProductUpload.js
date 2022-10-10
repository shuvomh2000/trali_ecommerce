import React,{useState,useRef, useEffect} from 'react'
import {Row,Col,Form,ButtonToolbar,Button,Checkbox,SelectPicker,Dropdown} from "rsuite"
import SideDashboard from '../components/SideDashboard'
import JoditEditor from "jodit-react";
import axios from 'axios';



const ProductUpload = () => {
  const editor = useRef(null)
	const [content, setContent] = useState('')
	const [productname, setProductname] = useState('')
	const [productbrand, setProductbrand] = useState('')
	const [productimage, setProductimage] = useState('')
	const [productposition, setProductposition] = useState('')
	const [productcategory, setProductcategory] = useState('')
	const [productprice, setProductprice] = useState('')
	const [color, setColor] = useState([])
	const [colorerr, setColorerr] = useState([])
  const SizeArr = []



  useEffect(()=>{
    async function fetchData(){
      let {data} = await axios.get('http://localhost:8000/productposition')
      setProductposition(data)
      
    }
    fetchData()
  },[])

  let handleColor = (e)=>{
    if(e.includes('#')){
      setColorerr("# not allow")
    }else{
      setColor(e.split(','))
    }
  }

  let handleSM = (e)=>{
    if(SizeArr.indexOf('SM') != -1){
      SizeArr.splice(SizeArr.indexOf('SM'),1)
      console.log(SizeArr)
    }else{
      SizeArr.push('SM')
      console.log(SizeArr)
    }
  }

  let handleM = (e)=>{
    if(SizeArr.indexOf('M') != -1){
      SizeArr.splice(SizeArr.indexOf('M'),1)
      console.log(SizeArr)
    }else{
      SizeArr.push('M')
      console.log(SizeArr)
    }
  }

  let handleL = (e)=>{
    if(SizeArr.indexOf('L') != -1){
      SizeArr.splice(SizeArr.indexOf('L'),1)
      console.log(SizeArr)
    }else{
      SizeArr.push('L')
      console.log(SizeArr)
    }
  }

  let handleXL = (e)=>{
    if(SizeArr.indexOf('XL') != -1){
      SizeArr.splice(SizeArr.indexOf('XL'),1)
      console.log(SizeArr)
    }else{
      SizeArr.push('XL')
      console.log(SizeArr)
    }
  }

  
  let handleSubmit =async ()=>{

    let {data} = await axios.post('http://localhost:8000/productupload',{
      name: productname,
      brand: productbrand,
      image: productimage,
      category: productcategory,
      price: productprice,
      color:color,
      size: SizeArr,
      description: content
    })
    console.log('click')
  }

  return (
    <>
    <Row className="show-grid">
        <Col xs={4}>
            <SideDashboard></SideDashboard> 
        </Col>
        <Col xs={20}>
        <Form fluid>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Name</Form.ControlLabel>
        <Form.Control onChange={(e)=>setProductname(e)} name="name" type='text' placeholder='Product Name'/>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Brand</Form.ControlLabel>
        <Form.Control onChange={(e)=>setProductbrand(e)} name="name" type='text' placeholder='Product Brand'/>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Image</Form.ControlLabel>
        <Form.Control onChange={(e)=>setProductimage(e)} name="name" type='text' placeholder='Product image'/>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Position</Form.ControlLabel>
        <SelectPicker data={productposition}  block /> 
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Category</Form.ControlLabel>
        <Form.Control onChange={(e)=>setProductcategory(e)} name="name" type='text' placeholder='Product Category'/>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Price</Form.ControlLabel>
        <Form.Control onChange={(e)=>setProductprice(e)} name="name" type='number' placeholder='Product Price'/>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Colour</Form.ControlLabel>
        <Form.Control name="name" type='text' placeholder='Product Colour' onChange={handleColor}/>
        {colorerr?
        <span style={{display:'inline-block',margin:'5px',color:'red'}}>{colorerr}</span>:''
        }
        {color.length>0
        &&
        color.map(item=>(
          <span style={{width:'20px', height:'20px',display:'inline-block',margin:'5px',borderRadius:"50%",background:`#${item}`}}></span>
        ))
        }
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Size</Form.ControlLabel>
        <Checkbox onChange={handleSM}> SM</Checkbox>
        <Checkbox onChange={handleM}> M</Checkbox>
        <Checkbox onChange={handleL}> L</Checkbox>
        <Checkbox onChange={handleXL}> XL</Checkbox>
        </Form.Group>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Product Description</Form.ControlLabel>
        <JoditEditor
            	ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {}}
            />
        </Form.Group>
        
        <Form.Group>
        <ButtonToolbar>
            <Button onClick={handleSubmit} appearance="primary">Submit</Button>
            <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
        </Form.Group>
    </Form>
    </Col>
    </Row>
    </>
  )
}

export default ProductUpload