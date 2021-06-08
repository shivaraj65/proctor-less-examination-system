import React,{useState,useEffect} from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const datas=[
             {id:"it0001",name:"internet programming"},
             {id:"123",name:"abc"}
            ]
const Delete =()=>{
    const [data,setdata]=useState(datas);   
    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);
    const dummyCleaner=()=>{
        setdata([{id:"it0001",name:"internet programming"}])
        handleClose()
    }
    return(
        <div className="container">
            <h4 className="text-center text-danger font-weight-bold">Delete Exam Window</h4>
            <hr/>
            {data && data.map((entry,index)=>{
                return(
                    <div className="row mt-4 hovered" key={index}>
                        <div className="col-sm-4 pt-2">
                            <p>{entry.id}</p>
                        </div>
                        <div className="col-sm-5 pt-2">
                            <p>{entry.name}</p>
                        </div>
                        <div className="col-sm-3 text-center">
                            <button 
                                className="btn btn-block btn-danger"
                                onClick={()=>{
                                    handleShow()
                                }}
                                >Delete</button>
                        </div>
                    </div>
                )})
            }
            

            {/* popup  */}
            <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                    >
                    <Modal.Header closeButton>
                    <Modal.Title>&lt;meriTTrack&gt;</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Click, Confirm delete this EXAM...
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={dummyCleaner}>
                        Delete
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                    </Modal.Footer>
                </Modal>
        </div>
    )
}
export default React.memo(Delete)