import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './lobby.css'
import axios from 'axios'

const Lobby=()=>{
    const [examData,setexamData]=useState(null)
    const [dateToday, setdateToday] = useState(null)

    //for the redirects- react-router-dom
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    useEffect(()=>{
        //first fetcht the data for the registered exams
        //then fetch the data for the

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
        var today = new Date();
        setdateToday(today)
        
    },[])

    //current time updater
    useEffect(()=>{
        setTimeout(() =>  {
            setdateToday(new Date())
        }, 1000*60);
      },[dateToday])

    //if already attended block the next entry
    function checkExamForAttending(){

    }

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
                <div className="col-md-8 py-4 card my-4 table-scroll-x">
                    <h5 className="text-secondary text-center mb-3">Registered Exams</h5>
                    <table className="table table-striped table-light table table-borderless table-hover ">
                        <thead>
                            <tr className="text-dark">
                                <th scope="col">Subject Code</th>
                                <th scope="col">Subject Name</th>
                                <th scope="col">Date of Exam</th>
                                <th scope="col">Time</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {examData && examData.map((entry,index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row" className="text-secondary">{entry.subjectID}</th>
                                        <td className="text-secondary">{entry.subjectName}</td>
                                        <td className="text-info">{entry.date}</td>
                                        <td className="text-info">{entry.time}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-secondary" 
                                                style={{padding:"0"}}
                                                onClick={()=>{ 
                                                    //data form the entry
                                                    var slicehrs=parseInt(entry.time.slice(0,2));
                                                    var slicemins=parseInt(entry.time.slice(3,));

                                                    //data from the current time
                                                    const systemHrs=parseInt(dateToday.getHours())
                                                    const systemMins=parseInt(dateToday.getMinutes())
                                                    //system date
                                                    const systemdate =dateToday.getFullYear()+'-'+String(dateToday.getMonth()+1).padStart(2,'0')+'-'+String(dateToday.getDate()).padStart(2,'0');
                                                    //check date for exam
                                                    if(entry.date===systemdate){
                                                            if(true){
                                                        // if(systemHrs===slicehrs && systemMins>=slicemins && systemMins <=(slicemins+10)){                                                            
                                                            // alert("date and time ok")
                                                            //store the examid in session for the next window
                                                            window.sessionStorage.setItem('examID',entry.subjectID);
                                                            //redirect to the examzone
                                                            redirect("/exam")
                                                        }else{
                                                            alert("this is not he right TIME to write the exam!")                                                       
                                                        }
                                                    }else{
                                                        alert("This is not the right DAY to write the exam!")
                                                    }
                                                    }}
                                                >
                                                <img src="https://img.icons8.com/cute-clipart/64/000000/enter-2.png" alt="" style={{maxHeight:"32px"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {examData===null?
                        <div className="m-4">
                            <div className="spinner-border text-warning" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>:null}
                        
                    <button 
                        className="btn btn-info"
                        onClick={()=>{
                            redirect("/feedback")
                        }   
                    }>feedback form</button>
                </div>
            </div>
        </div>
        
        </div>
    )
}
export default React.memo(Lobby)