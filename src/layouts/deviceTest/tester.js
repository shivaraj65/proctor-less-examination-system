import React from 'react';
import './tester.css';
import Webcam from "react-webcam";
import axios from 'axios'


const WebcamComponent = () => <Webcam />;

const Tester=()=>{
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
        const json = JSON.stringify({ image: imagedata,rollno:"17cs48"});
        const config  = {
            headers: {
                'Content-Type': 'application/json',
            }}
            axios.post('https://ydiu1o5plh.execute-api.us-east-1.amazonaws.com/production', 
            json,config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {                
                console.log("error")
            });
    }
    return(
        <div className="text-center">
        {/* <div className="background-tester-custom"></div> */}
            <div className="tester-custom">
                <Webcam
                    className={"webcam-element"}                    
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <br/>
                <button 
                    className="btn btn-secondary mt-3"
                    onClick={capture}>TEST VIDEO RECOGNITION</button>
            </div>
        </div>
    )
}

export default React.memo(Tester);