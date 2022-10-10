import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Row,Col,Form,ButtonToolbar,Button,Panel,Modal} from "rsuite"
import SideDashboard from '../components/SideDashboard'
import { Store } from '../Store'

const StoreName = () => {

    let [storename,setStorename] = useState('')
    let [store,setStore] = useState('')
    let [storedetails,setStoredetails] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let {state} = useContext(Store)

    let handleSubmit =async ()=>{
        let {data} = await axios.post('http://localhost:8000/storename',{
            storename: storename,
            owner: state.userInfo._id,
            ownername: state.userInfo.Name
        })
    }

    let handleChangeName =async ()=>{
        setOpen(false)
        let {data} = await axios.put('http://localhost:8000/storename',{
            storename: storename,
            id: storedetails[0]._id
        })
    }

    let handleStoredata =async()=>{
        let {data} = await axios.delete(`http://localhost:8000/storename/${storedetails[0]._id}`,{
            storename: storename,
            id: storedetails[0]._id
        })
    }

    useEffect(()=>{
            async function store(){
                let {data} = await  axios.get(`http://localhost:8000/storename/${state.userInfo._id}`)
                setStore(data[0].storename)
                setStoredetails(data)
            }
            store()
    },[])

  return (
    <>  
        <Row className="show-grid">
            <Col xs={4}>
                <SideDashboard></SideDashboard> 
            </Col>
            <Col xs={20}>
                {store
                ?
                <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                    <img src="https://via.placeholder.com/240x240" height="240" />
                    <Panel header={store}>
                    <Button color="green" appearance="primary" onClick={handleOpen}>edit</Button>
                    <Button color="violet" appearance="primary" onClick={handleStoredata}>delete</Button>
                    </Panel>
                </Panel>
                :
                <Form fluid>
                    <Form.Group controlId="name-1">
                    <Form.ControlLabel>Store Name</Form.ControlLabel>
                    <Form.Control name="name" type='text' placeholder='Store Name' onChange={(e)=>setStorename(e)}/>
                    </Form.Group>
                    
                    <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                    </Form.Group>
                </Form>
                }
        </Col>
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
            <Modal.Title>Edit Store Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid>
                    <Form.Group controlId="name-1">
                    <Form.Control name="name" type='text' placeholder='New Store Name' onChange={(e)=>setStorename(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleChangeName} appearance="primary">
                Change Name
            </Button>
            <Button onClick={handleClose} appearance="subtle">
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
        </Row>
        </>
  )
}

export default StoreName