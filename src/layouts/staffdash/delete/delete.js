import React,{useState,useEffect} from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


const Delete =()=>{
    useEffect(()=>{

    },[])
     // states and function for the modal
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false); 
     const handleShow = () => setShow(true);

    return(
        <div className="container">
            <h4 className="text-center text-danger font-weight-bold">Delete Exam Window</h4>
            <hr/>
            <div className="row mt-4 hovered">
                <div className="col-sm-4 pt-2">
                    <p>exam id</p>
                </div>
                <div className="col-sm-5 pt-2">
                    <p>exam name</p>
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
            <div className="row mt-4 hovered">
                <div className="col-sm-4 pt-2">
                    <p>exam id</p>
                </div>
                <div className="col-sm-5 pt-2">
                    <p>exam name</p>
                </div>
                <div className="col-sm-3 text-center">
                    <button className="btn btn-block btn-danger">Delete</button>
                </div>
            </div>
            <div className="row mt-4 hovered">
                <div className="col-sm-4 pt-2">
                    <p>exam id</p>
                </div>
                <div className="col-sm-5 pt-2">
                    <p>exam name</p>
                </div>
                <div className="col-sm-3 text-center">
                    <button className="btn btn-block btn-danger">Delete</button>
                </div>
            </div>
            <div className="row mt-4 hovered">
                <div className="col-sm-4 pt-2">
                    <p>exam id</p>
                </div>
                <div className="col-sm-5 pt-2">
                    <p>exam name</p>
                </div>
                <div className="col-sm-3 text-center">
                    <button className="btn btn-block btn-danger">Delete</button>
                </div>
            </div>

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
                    <Button variant="danger">
                        Delete
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                    </Modal.Footer>
                </Modal>
        </div>
    )
}
export default React.memo(Delete)