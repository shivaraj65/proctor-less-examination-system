import React from 'react'
import { useHistory } from "react-router-dom";
import Login from '../../../login/login'
const Navbar=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand text-light" href="/">Quizzler</a>
                <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="/">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="/">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="/">Contact</a>
                        </li>
                        <li  className="nav-item">
                            <a 
                                className="nav-link text-primary" 
                                onClick={()=>{
                                    redirect("/login");
                                }}
                                >Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);