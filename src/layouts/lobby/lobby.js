import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";

import './lobby.css'

const Lobby=()=>{
    let {uid,uname}=useParams()
    //for the redirects- react-router-dom
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    return(
        <div>
            <div className="user-background"></div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand  text-primary" href="/">E-Proctor</a>
                <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <h1 className="nav-link text-dark active">Home</h1> 
                        </li>
                        <li className="nav-item">
                        <h1 className="nav-link text-dark">Help</h1>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="row nav-padding container">
                {/* left pane */}
                <div className="col-md-4">
                        <div className="card p-4 my-4 mx-3 custom-findQuiz-bg">
                            <label className="text-secondary text-center">Check your Device Compatability.</label> 
                            <button className="btn btn-lg btn-primary btn-block my-3" >TEST</button>
                        </div>
                </div>
                {/* right pane */}
                <div className="col-md-8">
                    
                </div>
            </div>
        </div>
        
        </div>
    )
}
export default React.memo(Lobby)