import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './lobby.css'
import axios from 'axios'

const Lobby=()=>{
    const [examData,setexamData]=useState(null)

    //for the redirects- react-router-dom
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    useEffect(()=>{
        // axios 
        const json = {id:window.sessionStorage.getItem("userID")};  
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
        axios.post('https://cbqoiztgpb.execute-api.us-east-1.amazonaws.com/production', 
        JSON.stringify(json),config)
        .then(function (response) {
            if(response.data.status==="success"){
                setexamData(response.data.message.Items[0].registrationData)
                console.log(response.data.message.Items[0].registrationData)
            }
            if(response.data.status==="failed"){
                setexamData([])
            }
        })
        .catch(function (error) {
            alert("something went wrong. Please refresh the page.")
            console.log("error")
        });
    },[])

    return(
        <div>
            {/* <div className="user-background"></div> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav" style={{backgroundImage: "linear-gradient(to top, rgb(182, 255, 210,0.3), #f2e3bd88)",opacity:"0.7"}}>
                <div className="container">
                    <a className="navbar-brand  text-primary" href="/">&lt;meriTTrack&gt;</a>
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
            <div className="row nav-padding">
                {/* left pane */}
                <div className="col-md-4 card-flex-90vw">
                        <div className="card p-4 my-4 card-enhancer">
                            <label className="text-secondary text-center">Test your Environment</label> 
                            <button 
                                className="btn btn-lg btn-outline-secondary btn-block my-3 font-weight-bold" 
                                onClick={()=>{
                                    redirect("/test")
                                }}
                            >TEST</button>
                        </div>
                        <div className="card p-4 my-4 card-enhancer">
                            <label className="text-secondary text-center">Register for your exams here.</label> 
                            <button 
                                className="btn btn-lg btn-outline-secondary btn-block my-3 font-weight-bold" 
                                onClick={()=>{
                                    redirect("/registerationZone/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
                                }}
                            >Registration Zone</button>
                        </div>
                </div>

                {/* right pane */}
                <div className="col-md-8 pt-2 card mt-4">
                            <div className="row mt-1 mx-2">
                                <div className="col-sm-3 pt-2 ml-3">
                                    <p>subject code</p>
                                </div>
                                <div className="col-sm-8 pt-2 text-secondary">
                                    <p>subject name</p>
                                </div>
                                
                                <hr/>
                            </div>
                    {examData && examData.map((entry,index)=>{
                        return(
                            <div className="row mt-1 text-center hovered mx-2 py-2" key={index}>
                                <div className="col-sm-2 pt-2">
                                    <p>{entry.subjectID}</p>
                                </div>
                                <div className="col-sm-8 pt-2 text-secondary">
                                    <p>{entry.subjectName}</p>
                                </div>
                                <div className="col-sm-2 pt-2 text-secondary">
                                    <button className="btn btn-success">start</button>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}
                    





                    <button 
                        className=""
                        onClick={()=>{
                            redirect("/exam")
                        }   
                    }>tester for the invigilation setup</button>
                </div>
            </div>
        </div>
        
        </div>
    )
}
export default React.memo(Lobby)