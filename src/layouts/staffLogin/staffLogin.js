import React,{useState} from 'react'
import './staffLogin.css';
import Wallpaper from '../../assets/images/login-bg-123.jpg'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const StaffLogin=()=>{

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //states to hold the data of the input fields
    const [emailid, setemailid] = useState("")
    const [pass, setpass] = useState("")
    const submitHandlerLogin=(event)=>{
        event.preventDefault();
        //axois to the backend...
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
        </div>
    )
}

export default React.memo(StaffLogin);