import React,{useState} from 'react'
import './login.css'

import axios from 'axios'
import * as QueryString from "query-string"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const Login=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [popupContent,setPopupContent]=useState("")
    // states and function for the popup-modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//submit handler for the website login
const submitHandlerLogin=(event)=>{
    event.preventDefault();
         // axios 
         let formData = {Email: email,Password: password};    
         // console.log(QueryString.stringify(formData));  
         //header configuration for the CORS
         const config  = {
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Access-Control-Allow-Origin':'*'
                 }}
            axios.post('http://localhost:3001/loginUser', 
            QueryString.stringify(formData),config)
            .then(function (response) {
                console.log(response.data);
                setPopupContent(response.data);
                // redirect to the userdash
                if(response.data.id){
                    redirect("/ul/"+response.data.id+"/"+response.data.name);
                }else{
                    setPopupContent(response.data)
                    handleShow()
                }
            })
            .catch(function (error) {
                // setPopupContent("Oh snap! Something went wrong, Try again.");
                // handleShow();
                console.log("error")
            });
            
}      





    return(
        <div className="text-center" id="login">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand  text-primary" href="/">E-Proctor</a>
                <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        {/* <li className="nav-item text-light">{props.name}</li> */}
                        <li className="nav-item">
                            <h1 className="nav-link text-dark active">Home</h1> 
                        </li>
                        <li className="nav-item">
                        <h1 className="nav-link text-dark">Contact</h1>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

            <form className="form-signin card" onSubmit={submitHandlerLogin}>
                {/* <img className="mb-1" src={logo} alt="" width="120" height="60"/> */}
                <h1 className="h3 mt-4 font-weight-bold text-primary">LOGIN</h1>
                <hr className="mb-3"/>
                <label className="sr-only">User ID / Email</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control text-primary" 
                    placeholder="User ID / Email" 
                    value={email}
                    required 
                    autoFocus
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}    
                    />
                <label className="sr-only">Password</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control text-primary" 
                    placeholder="Password" 
                    value={password}
                    required
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                <div className="my-1"><a href="#" className="text-danger">Reset password</a></div>
                
                <button className="btn btn-lg btn-primary btn-block mb-4 pt-1" type="submit">Sign in</button>
            </form>






            {/* popup */}
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title>Quizzler</Modal.Title>
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

export default React.memo(Login);






