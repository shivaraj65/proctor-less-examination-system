import React,{useState} from 'react';
import './css.css';
import Wallpaper from '../../assets/images/wallpaper-06.jpg';

import axios from 'axios'
import * as QueryString from "query-string"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const DL =()=>{
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
                     'Access-Control-Allow-Origin':'*',  
                 }}
            axios.post('http://localhost:3001/loginUser', 
            QueryString.stringify(formData),config)
            .then(function (response) {
                console.log(response.data);
                setPopupContent(response.data);
                // redirect to the userdash
                if(response.data.id){
                    localStorage.setItem('userID', response.data.id);
                    localStorage.setItem('userName', response.data.name);
                    localStorage.setItem('userRollno', response.data.rollno);
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
        <div className="body">
            <div className="background1" style={{backgroundImage:"url("+Wallpaper+")"}}></div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custo fixed-top py-3" id="mainNav" style={{backgroundImage: "linear-gradient(to top, rgb(182, 255, 210,0.3), #f2e3bd88)",opacity:"0.7"}}>
                <div className="container">
                    <a className="navbar-brand  text-primary" href="/">E-Proctor</a>
                    <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
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

            <div className="blurred-box p-4">
                <div className="inner-box px-4">
                    <form className="form-signin" onSubmit={submitHandlerLogin}>
                        {/* <img className="mb-1" src={logo} alt="" width="120" height="60"/> */}
                        <h1 className="h3 mt-4 font-weight-bold text-light">LOGIN</h1>
                        <hr className="mb-3"/>
                        <label className="sr-only">User ID / Email</label>
                        <input 
                            type="email" 
                            id="inputEmail" 
                            className="form-control text-dark mb-3 input-transparent" 
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
                            className="form-control text-dark  input-transparent" 
                            placeholder="Password" 
                            value={password}
                            required
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                            />
                        <div className="my-1 mb-4"><a href="/" className="text-warning">Reset password</a></div>
                        
                        <button className="btn btn-lg btn-success btn-block mb-4 pt-1" type="submit">Sign in</button>
                    </form>

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
export default React.memo(DL)