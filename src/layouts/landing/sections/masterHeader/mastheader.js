import React from 'react'
import { useHistory } from "react-router-dom";
import './mastheader.css'

const MastHeader=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    return(
    <header className="masthead">
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-10 align-self-end">
                    <h1 className="text-uppercase text-white-75 font-weight-bold font-black-ops-one">HAWK-EYE</h1>
                    <hr className="divider my-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white-50 font-weight-light mb-5">were Examinations done right.</p>
                    <button 
                        className="btn btn-outline-primary btn-xl loginbutton-l" 
                        onClick={()=>{
                            redirect("/login")
                        }}
                        >Login</button>
                </div>
            </div>
        </div>
    </header>
    )
}
export default React.memo(MastHeader)