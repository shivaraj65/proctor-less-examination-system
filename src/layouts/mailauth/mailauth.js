import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MailRedirect=()=>{
    let {id}=useParams()

    const [responseData,setResponseData]=useState("")
    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    useEffect(()=>{
        // axios 
        let json = {ID:id};    
        // console.log(quizID);
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/json',
        }}
        axios.post('https://h353k1saoe.execute-api.us-east-1.amazonaws.com/production', 
        JSON.stringify(json),config)
        .then(function (response) {
            if(response.data.status ==="success"){
                setResponseData(response.data.message)
                handleShow()
            }else{
                setResponseData(response.data.message)
                handleShow()
            }
        })
        .catch(function (error) {
            alert("Error!! Check your Network and Try again.")
        });
    },[])

    return(
        <div className="custom-findQuiz-bg fullscreen-custom">
                <div className="pt-4 text-center">
                    <div className="card form-signin mt-4 p-4"  style={{"width":"80vw","margin":"auto","maxWidth":"400px"}}>
                        <h5 className="text-secondary">verifying your Account</h5>
                        <hr/>
                        <h5 className="text-secondary pb-2">{"Account ID : "+id}</h5>
                        <div className="d-flex align-items-center mt-4 mx-4">
                            <strong>Verifying...</strong>
                            <div className="spinner-grow text-warning ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header>
                <Modal.Title>meriTTrack</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {responseData}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={()=>{redirect('/')}}>
                    LOGIN
                </Button>
                </Modal.Footer>
            </Modal>                            
        </div>
    )
}
export default React.memo(MailRedirect)