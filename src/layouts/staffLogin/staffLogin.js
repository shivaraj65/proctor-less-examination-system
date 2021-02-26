import React,{useState} from 'react'
import './staffLogin.css';
import Wallpaper from '../../assets/images/login-bg-123.jpg'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const StaffLogin=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    // states and function for the modal
    const [popupContent,setPopupContent]=useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //states to hold the data of the input fields
    const [emailid, setemailid] = useState("")
    const [pass, setpass] = useState("")
    const submitHandlerLogin=(event)=>{
        event.preventDefault();
         // axios 
         const json = {email: emailid,password: pass};  
         console.log(json)
         //header configuration for the CORS
         const config  = {
                 headers: {
                    'Content-Type': 'application/json',
                 }}
            axios.post('https://aehpbsq038.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
            .then(function (response) { 
                console.log(response.data);
                // console.log(response.data.status)
                // redirect to the userdash
                if(response.data.status ==="verified"){
                    localStorage.setItem('staffID', response.data.cred.staffID);
                    localStorage.setItem('staffName', response.data.cred.name);
                    localStorage.setItem('staffRollno', response.data.cred.rollno);
                    redirect("/sd/"+response.data.cred.staffID+"/"+response.data.cred.name);
                }else{
                    setPopupContent(response.data.status)
                    handleShow()
                }
            })
            .catch(function (error) {
                setPopupContent("Oh snap! Something went wrong, Try again.");
                handleShow();
                console.log("error")
            });

    }
    return(
        <div>
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 login-section-wrapper">
                <div className="brand-wrapper">
                    {/* <img src="" alt="logo" className="logo"/> */}
                    <h5 className="text-warning font-weight-bold">Staff Login</h5>
                </div>
                <div className="login-wrapper my-auto">
                    <h1 className="login-title">Log in</h1>
                    <form onSubmit={submitHandlerLogin}>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            required 
                            className="form-control" 
                            placeholder="email@example.com"
                            value={emailid}
                            onChange={(e)=>{setemailid(e.target.value)}}
                            />
                    </div>
                    <div className="form-group mb-4">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            required
                            className="form-control" 
                            placeholder="enter your passsword"
                            value={pass}
                            onChange={(e)=>{setpass(e.target.value)}}
                            />
                    </div>
                    <button 
                        className="btn btn-block login-btnn" 
                        type="submit"
                        >Login</button>
                    </form>
                    <a href="#!" className="forgot-password-link">Forgot password?</a>
                    {/* <p className="login-wrapper-footer-text">Don't have an account? <a href="#!" class="text-reset">Register here</a></p> */}
                </div>
                </div>
                <div className="col-sm-6 px-0 mx-0 d-none d-sm-block">
                <img src={Wallpaper} alt="login image1" className="login-img"/>
                </div>
            </div>
            </div>

            {/* popup */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header closeButton>
                <Modal.Title>E-proctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupContent}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(StaffLogin);