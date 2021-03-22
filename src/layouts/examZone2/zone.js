import React,{useState,useCallback,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from "react-router-dom";
import Wallpaper from '../../assets/images/wallpaper-04.jpg'
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import './zone.css'

const Zone=()=>{
    //for the redirects- react-router-dom
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    // variable holding the full screen trigger
    const screen1 = useFullScreenHandle();

    // callback function from the react-fullscreen package
    const reportChange = useCallback((state, handle) => {
        if (handle === screen1) {
          console.log('Screen 1 went to', state)
          //handle is a function holding the active state , enter & exit function
          console.log("handle ",handle)
        }
    }, [screen1]);

    const fullscreenFunc=(value)=>{
        if(value==="enter"){
          //fullscreen flag is set to true         
          screen1.enter() 
        }
        if(value==="exit"){
          //fullscreen flag is set to false          
          screen1.exit()
        }
    }
    
    return(
        <div className="body">
        <FullScreen handle={screen1} onChange={reportChange}>
        <div className="background1" style={{backgroundImage:"url("+Wallpaper+")"}}></div>

        <div className="blurred-box p-4 custom-blurred-box">
            <div className="inner-box px-4">
                <h4 className="text-center text-primary">INSTRUCTIONS</h4>
                <hr/>
                <li className="text-light fs-13 my-2">Make sure you have a decent amount of network stability.</li>
                <li className="text-light  fs-13 my-2">Never use any other Applications.</li>
                <li className="text-light fs-13 my-2">Dont move out of camera.</li>
                <li className="text-light fs-13 my-2">If the system finds any suspecious activity it will automatically terminate the examination.</li>
                <button 
                    className="btn btn-lg btn-info float-right mt-4"
                    onClick={()=>{redirect("/zone/")}}
                    >Agree & Continue</button>
            </div>
        </div>
        </FullScreen>
    </div>
    )
}
export default React.memo(Zone)