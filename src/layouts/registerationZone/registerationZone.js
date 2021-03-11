import React,{useState} from 'react'
import './registeration.css';

import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const RegisterationZone=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    const [popupContent,setPopupContent]=useState("")
    // states and function for the popup-modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [pageno, setpageno] = useState("0")
    const [dept, setdept] = useState("")
    const [edata,setedata]=useState(null)
    const [selectedData, setselectedData] = useState(null)
    const [checkbox,setcheckbox]= useState(null)

    const submitdept=()=>{
        // axios 
        const json = {dept:dept};  
        // console.log(json)
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
        axios.post('https://3ki1z5thvi.execute-api.us-east-1.amazonaws.com/production', 
        JSON.stringify(json),config)
        .then(function (response) {
           if(response.data.message.Count!==0){
                setedata(response.data.message.Items)
                console.log(response.data.message.Items)
                setselectedData([]);
                let temp=[];
                for(let i=0;i<response.data.message.Count;i++){
                    temp.push(false)
                }
                setcheckbox(temp)
           }
        })
        .catch(function (error) {
            alert("something went wrong. Please try again.")
            console.log("error")
        });        
    }

    const FinalSubmit=()=>{
        //https://e0a5x5pqle.execute-api.us-east-1.amazonaws.com/production
        let tempdata=[];
        for(var i=0;i<checkbox.length;i++){
            if(checkbox[i]===true){
                    tempdata.push({subjectID:edata[i].subjectID,subjectName:edata[i].subjectName})
            }
        }
        setselectedData(tempdata)
        // axios 
        const json = {uID:window.sessionStorage.getItem("userID"),sName:window.sessionStorage.getItem("userName"),dept:dept,rData:tempdata};  
        // console.log(json)
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
        axios.post('https://e0a5x5pqle.execute-api.us-east-1.amazonaws.com/production', 
        JSON.stringify(json),config)
        .then(function (response) {
            
            if(response.data.status==="Registration successfully done!... redirecting to dashboard."){
                setPopupContent(response.data.status)
                handleShow()
                redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"));
            }else if(response.data.status==="failed"){
                setPopupContent(response.data.message) 
                handleShow()
            }
        })
        .catch(function (error) {
            alert("something went wrong. Please try again.")
            console.log("error")
        }); 
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav" style={{backgroundImage: "linear-gradient(to top, rgb(182, 255, 210,0.3), #f2e3bd88)",opacity:"0.7"}}>
                <div className="container">
                    <a className="navbar-brand  text-primary" href="/">&lt;meriTTrack&gt;</a>
                    <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Home</h1> 
                            </li>
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Dashboard</h1> 
                            </li>
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Help</h1>
                            </li>
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">{window.sessionStorage.getItem("userName")}</h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container nav-padding">
                <div className="card card-enhancer p-4 mt-2">
                    <h5 className="text-center text-primary">Registation Zone</h5>
                    <hr/>
                    <p className="text-center text-secondary">register for your semester exams here</p>

                    {pageno && pageno==="0"?
                        <div className="container-custom-register p-4">
                            <label className="text-secondary muted">Select your department here:</label>
                            <select 
                                className="form-control text-info"
                                onChange={(e)=>{setdept(e.target.value)}}
                                value={dept}
                                >
                                <option></option>
                                <option>cse</option>
                                <option>ece</option>
                                <option>eee</option>
                                <option>mech</option>
                            </select>
                            <button 
                                type="button" 
                                className="btn btn-outline-success btn-block float-md-right mt-4"
                                onClick={()=>{
                                    if(dept===""){
                                        alert("enter your department to continue")
                                    }else{
                                        submitdept()
                                        setpageno("1")
                                    }
                                }}
                            >submit</button> 
                        </div>
                    :null}
                    {pageno && pageno==="1"?
                        <div>
                                
                        <div className="row mt-4 mx-2">
                            <div className="col-sm-1 text-center">
                                
                            </div>
                            <div className="col-sm-3 pt-2 text-info">
                                <p>Subject Code</p>
                            </div>
                            <div className="col-sm-8 pt-2 text-info">
                                <p>Subject Name</p>
                            </div>
                        </div>
                        <hr/>
                                {edata && edata.map((entry,index)=>{
                                    return(
                                        <div className="row mt-1 hovered mx-2" key={index}>
                                            <div className="col-sm-1 text-center">
                                                <input 
                                                    className="form-check-input mt-2 ml-1 d-block"
                                                    style={{"width": "20px", "height": "20px"}} 
                                                    type="checkbox" 
                                                    value={entry.subjectID}
                                                    onChange={(e)=>{
                                                        let temp=checkbox;
                                                        temp[index]=!checkbox[index]
                                                        setcheckbox(temp)
                                                    }}
                                                    />
                                                    <br/>
                                            </div>
                                            <div className="col-sm-3 pt-2">
                                                <p>{entry.subjectID}</p>
                                            </div>
                                            <div className="col-sm-8 pt-2 text-secondary">
                                                <p>{entry.subjectName}</p>
                                            </div>
                                            
                                            <hr/>
                                        </div>
                                    )
                                })}
                                
                           
                            <button 
                                type="button" 
                                className="btn btn-outline-success float-md-right mt-4"
                                onClick={()=>{
                                    FinalSubmit();
                                }}
                            >CONFIRM</button> 
                        </div>
                    :null}
                    
                   
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
                <Modal.Title>&lt;meriTTrack&gt;</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupContent}
                </Modal.Body>
                <Modal.Footer>
                {/* <Button variant="primary" onClick={handleClose}>
                    Close
                </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default React.memo(RegisterationZone);
