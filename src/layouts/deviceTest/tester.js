import React,{useState} from 'react';
import './tester.css';
import Webcam from "react-webcam";
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const WebcamComponent = () => <Webcam />;

const Tester=()=>{

    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    
    const [popupContent,setPopupContent]=useState("")
    // states and function for the popup-modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dynamicClass, setdynamicClass] = useState("")

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 500, height: 300});
      setImgSrc(imageSrc);
    //   console.log(imageSrc);
        //call axios post
        testImage(imageSrc);
    }, [webcamRef, setImgSrc]);
    const testImage=(imagedata)=>{
        //axios request
        const json = JSON.stringify({ image: imagedata,rollno:window.sessionStorage.getItem("userRollno")});
        const config  = {
            headers: {
                'Content-Type': 'application/json',
            }}
            axios.post('https://ydiu1o5plh.execute-api.us-east-1.amazonaws.com/production', 
            json,config)
            .then(function (response) {
                console.log(response.data);
                // console.log(response.data.FaceMatches[0].Similarity)
                if(response.data.FaceMatches.length===1 && response.data.UnmatchedFaces.length===0){
                    setdynamicClass("text-success")
                    setPopupContent("Verified with a confidence score of :"+response.data.FaceMatches[0].Similarity.toFixed(3))
                    handleShow()
                }else if(response.data.FaceMatches.length===1 && response.data.UnmatchedFaces.length>=1){
                    setdynamicClass("text-warning")
                    setPopupContent("Unknown persons are Identified with you, You are requested to attend the Exam separetely. thankyou!")
                    handleShow()
                }else if(response.data.UnmatchedFaces.length>=1){
                    setdynamicClass("text-danger")
                    setPopupContent("Our systems just picked "+response.data.UnmatchedFaces.length+" unknown persons, we request you to attend the Exam separeately. If anyone is found other than you, your examination will be disqualified.")
                    handleShow()
                }
                
            })
            .catch(function (error) {    
                setPopupContent("Error Communicating the server.. try agin! if error persists contact the admin.")
                handleShow()            
                console.log("error")
            });
    }
    return(
        <div className="text-center">
            <div className="background-tester-custom"></div>
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
        
            <div className="tester-custom">
                <Webcam
                    className={"webcam-element mt-4"}                    
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <br/>
                <button 
                    className="btn btn-dark mt-3 px-4"
                    onClick={capture}>TEST VISUAL RECOGNITION</button>
                    <p className="muted text-secondary mt-2">*confidence score should be above 99.7</p>
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
                    <h6 className={dynamicClass}>{popupContent}</h6>
                    
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

export default React.memo(Tester);