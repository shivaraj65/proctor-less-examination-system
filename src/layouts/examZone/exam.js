import React from 'react';

import './exam.css';

import Webcam from "react-webcam";
 
const WebcamComponent = () => <Webcam />;


const Exam=()=>{
   
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 500, height: 300});
      setImgSrc(imageSrc);
      console.log(imageSrc);
    }, [webcamRef, setImgSrc]);

    return(
        <div>
            <div className="user-background"></div>
            <div className="container">
                <div className="row pt-4">
                    <div className="col-lg-3 col-sm-12 custom-examSidebar">
                        <div className="card ">
                            <div className="card p-4 cam-layout">
                                <Webcam
                                    height={150}
                                    weigth={300}
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                />
                                {/* <button onClick={capture}>Capture photo</button> */}
                            </div>
                            <h3 className="text-secondary text-center pt-4">QUESTIONS</h3> 
                            <div className="questions-comp">
                            <div className="row py-3 px-2 text-center ">    
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q1
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q2
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q3
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q4
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q5
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q6
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q7
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q8
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q9
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q10
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q11
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q12
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q13
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q14
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q15
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q13
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q14
                                    </div>
                                </div>
                                <div className="col-sm-4 pb-3">
                                    <div className="btn btn-sm btn-success">
                                        q15
                                    </div>
                                </div>

                            </div>
                            </div>                             
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12">
                        <div className="card text-center p-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>credibility score:100</h5>
                                </div>
                                <div className="col-md-4">
                                    <h5>no of q answered:1/20</h5>
                                </div>
                                <div className="col-md-4">
                                    <h5>timer</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-examQuestion mt-3">

                        </div>
                    </div>  
                </div>
            </div>
            











           
        </div>
    )
}
export default React.memo(Exam);
