import React,{useEffect,useState,useCallback} from 'react';
import axios from 'axios'
import './exam.css';
import Clock from './clock/clock'
import Webcam from "react-webcam";
import { useHistory } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
 
const WebcamComponent = () => <Webcam />;

const Exam=()=>{
     //for the redirects- react-router-dom
     let history = useHistory();
     const redirect=(path)=>{
         history.push(path)
     }

    //fullscreen setup
    const [endexamflag,setendexamflag]=useState(0)
    const [fullscreen,setFullscreen]=useState(false)
    const screen1 = useFullScreenHandle();
    const reportChange = useCallback((state, handle) => {
        if (handle === screen1) {
          console.log('Screen 1 went to', state, handle);
          if(fullscreen ===true && state===false){
            //fullscreen is our handle... set at start and the end
            //state is the current state held by the full screen component
            console.log("violation due to exit full screen before the quiz ends")
            //submit for violation
            if(endexamflag!==1){
                violationsubmit("malP")
            }            
          }
        }
      }, [screen1]);

    const fullscreenFunc=(value)=>{
      if(value==="enter"){
        //fullscreen flag is set to true
        setFullscreen(true)
        screen1.enter() 
      }
      if(value==="exit"){
        //fullscreen flag is set to false
        setFullscreen(false)
        screen1.exit()
      }
    }
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         fullscreenFunc("exit")
    //         redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
    //        },15000)
    // },[endexamflag])

    //states for the data from sever
    const [questiondata,setquestiondata]=useState(null)

    //state to hold the clock time
    const [timer,settimer] = useState(null)
    const [timerActive,setTimerActive] = useState(false)  
    const [questions,setquestions]=useState(null)
    const [noOfQuestions,setNoOfQuestions]=useState(null)

    //states for monitoring this window
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [freqSubmitTimer,setFreqSubmitTimer]=useState(0);

    //states for the answered questions
    const [answeredQuestionsData, setansweredQuestionsData] = useState(null)
    const [scoreobtained,setscoreobtained]=useState(0)
    //states for the monitoring purpose
    const [cred,setcred]=useState(100)
    const [imagedata,setimagedata]=useState([])
    // var imagedata=[];
    const [fekogFlag,setrekogFlag]=useState(false)
    const [facetimer,setfacetimer]=useState(0)

    useEffect(()=>{
        fullscreenFunc("enter")
         // axios 
         const json = {id:window.sessionStorage.getItem("examID")};  
         //header configuration for the CORS
         const config  = {
                 headers: {
                    'Content-Type': 'application/json',
                 }}
        axios.post('https://6vn05a0lk3.execute-api.us-east-1.amazonaws.com/production', 
        JSON.stringify(json),config)
        .then(function (response) {
            if(response.data.status==="success"){
               console.log(response.data.payload.Item)
               setquestiondata(response.data.payload.Item)
               setquestions(response.data.payload.Item.questions)
               setNoOfQuestions(parseInt(response.data.payload.Item.NoOfQuestions))
               settimer(response.data.payload.Item.duration*60)
               setTimerActive(true)
               setrekogFlag(true)
               let tempdata=[]
               for(var i=0;i<response.data.payload.Item.questions.length;i++){
                   tempdata.push(-1)
               }
               setansweredQuestionsData(tempdata)
            }
        })
        .catch(function (error) {
            alert("something went wrong. Please refresh the page.")
            console.log("error")
        });
    },[])

     //function for the timer countdown
     useEffect(()=>{
        if(timerActive){
            timer > 0 && setTimeout(() => settimer(timer - 1), 1000);
            if(timer===0){                
                autosubmit()
            }
        }  
      },[timer,timerActive])

    //face rekognition module
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 500, height: 300});
      setImgSrc(imageSrc);
    //hided the face rekog for sometime
    //   faceRecok(imageSrc);
    }, [webcamRef, setImgSrc]);

    //automated counter for the rekog transmitter
    useEffect(()=>{
        if(fekogFlag){
            timer >= 10 && setTimeout(() => {
                // alert("rekog trigger"); 
                //call the imagecapture--it will  call the facerecok....
                capture()
                setfacetimer(facetimer+1)
                // freqSubmitTimer,setFreqSubmitTimer
            }, 6000);
        }  
      },[facetimer,fekogFlag])

    useEffect(() => {
        if(endexamflag!==1){
        //axios request
        const json = JSON.stringify({ image: imgSrc,rollno:window.sessionStorage.getItem("userRollno")});
        const config  = {
            headers: {
                'Content-Type': 'application/json',
            }}
            axios.post(' https://clx74mh9ue.execute-api.us-east-1.amazonaws.com/production', 
            json,config)
            .then(function (response) {
                //add the image url to the array
                addurl(response.data.url)
               
                //assess the confidence score
                if(response.data.rekog.FaceMatches.length===1 && response.data.rekog.UnmatchedFaces.length===0){
                    if(response.data.rekog.FaceMatches[0].Similarity<99.6){
                        //problem---reduce cred
                        console.log("low similarity")
                        setcred(cred-5)
                        if(cred-5<=70){
                            violationsubmit("lowCred")
                        }
                        // alert("reducing cred")
                    }
                }else if(response.data.rekog.UnmatchedFaces.length>=1 ||response.data.rekog.FaceMatches.length===0 ||response.data.rekog.FaceMatches.length>1){
                    violationsubmit("malP")
                    // alert("malP")
                }
            })
            .catch(function (error) {             
                console.log("error from face rekog")
            });
        }
    }, [imgSrc])

    function addurl(url){
                setimagedata([...imagedata,{"url":url}])
                console.log(imagedata)
    }   



    //function for the submit feature from submit button
    const submitbuttonSubmit=()=>{
        //windingup the facerekog session
        setrekogFlag(false)

        //calculate the score
        let scoreinc=0;
        for(var j=0;j<questions.length;j++){
            if(questions[j].ans===answeredQuestionsData[j]){
                scoreinc=scoreinc+1
            }
        }
        setscoreobtained(scoreinc)
        console.log("score: "+scoreinc);
        // axios 
        const data={
            "id": window.sessionStorage.getItem("userID")+""+window.sessionStorage.getItem("examID"),
            "cred": cred,
            "score": scoreinc,
            "sid": window.sessionStorage.getItem("userID"),
            "ans": answeredQuestionsData,
            "sType": "candidateSubmit",
            "malprac": false,
            "imageData": imagedata
        }
        // const json = {id:window.sessionStorage.getItem("userID")};  
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
                axios.post('https://7pusl8hexl.execute-api.us-east-1.amazonaws.com/production', 
                JSON.stringify(data),config)
                .then(function (response) {
                   if(response.data.status==="success"){                       
                       if(endexamflag!==1){
                        alert("wait for few seconds... Data is being sent to server.")
                        setendexamflag(1)   
                                redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
                       }               
                   }else{
                       alert("network error.. contact admin for further details")
                        //redirect("/")
                   }
                })
                .catch(function (error) {
                    console.log("error")
                });
    }

    //function for the auto submit feature
    function autosubmit(){
        //windingup the facerekog session
        setrekogFlag(false)

        //calculate the score
        let scoreinc=0;
        for(var j=0;j<questions.length;j++){
            if(questions[j].ans===answeredQuestionsData[j]){
                scoreinc=scoreinc+1
            }
        }
        setscoreobtained(scoreinc)
        console.log("score: "+scoreinc);
        // axios 
        const data={
            "id": window.sessionStorage.getItem("userID")+""+window.sessionStorage.getItem("examID"),
            "cred": cred,
            "score": scoreinc,
            "sid": window.sessionStorage.getItem("userID"),
            "ans": answeredQuestionsData,
            "sType": "autoSubmit",
            "malprac": false,
            "imageData": imagedata
        }
        // const json = {id:window.sessionStorage.getItem("userID")};  
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
                axios.post('https://7pusl8hexl.execute-api.us-east-1.amazonaws.com/production', 
                JSON.stringify(data),config)
                .then(function (response) {
                   if(response.data.status==="success"){
                       
                       if(endexamflag!==1){
                        alert("wait for few seconds... Data is being sent to server.")
                        setendexamflag(1)   
                        redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
                       }
                   }else{
                       alert("network error.. contact admin for further details")
                        //redirect("/")
                   }
                })
                .catch(function (error) {
                    console.log("error")
                });
    }

    //function for the violation submit
    function violationsubmit(violFlag){
        //windingup the facerekog session
        setrekogFlag(false)

        //calculate the score
        let scoreinc=0;
        for(var j=0;j<questions.length;j++){
            if(questions[j].ans===answeredQuestionsData[j]){
                scoreinc=scoreinc+1
            }
        }
        setscoreobtained(scoreinc)
        console.log("score: "+scoreinc);
        // axios 
        const data={
            "id": window.sessionStorage.getItem("userID")+""+window.sessionStorage.getItem("examID"),
            "cred": cred,
            "score": scoreinc,
            "sid": window.sessionStorage.getItem("userID"),
            "ans": answeredQuestionsData,
            "sType": violFlag,
            "malprac": true,
            "imageData": imagedata
        }
        // const json = {id:window.sessionStorage.getItem("userID")};  
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
                axios.post('https://7pusl8hexl.execute-api.us-east-1.amazonaws.com/production', 
                JSON.stringify(data),config)
                .then(function (response) {
                   if(response.data.status==="success"){
                       
                       if(endexamflag!==1){
                        alert("wait for few seconds... Data is being sent to server. Due to malpractice your session is closed!")
                        setendexamflag(1)   
                        redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
                       } 
                       
                   }else{
                       alert("network error.. contact admin for further details")
                        //redirect("/")
                   }
                })
                .catch(function (error) {
                    console.log("error")
                });
    }


    //timer for the periodic submit  feature
    useEffect(()=>{
        if(fekogFlag){
            timer > 70 && setTimeout(() => {
                // alert("submit trigger");       
                periodicSubmit()          
                setFreqSubmitTimer(freqSubmitTimer+1)
                // freqSubmitTimer,setFreqSubmitTimer
            }, 60000);
        }  
      },[freqSubmitTimer,fekogFlag])

    //function for the periodic submit--every 2minutes
    function periodicSubmit(){
        // axios 
        const data={
            "id": window.sessionStorage.getItem("userID")+""+window.sessionStorage.getItem("examID"),
            "cred": cred,
            "score": -1,
            "sid": window.sessionStorage.getItem("userID"),
            "ans": answeredQuestionsData,
            "sType": "PeriodicSubmit",
            "malprac": false,
            "imageData": imagedata
        }
        const config  = {
            headers: {
               'Content-Type': 'application/json',
            }}
            axios.post('https://7pusl8hexl.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(data),config)
            .then(function (response) {
               if(response.data.status==="success"){                      
                if(endexamflag!==1){
                    console.log("periodic submit success")
                }                    
               }else{
                //   alert("network error.. contact admin for further details")                    
               }
            })
            .catch(function (error) {
                console.log("error")
            });



    }

    function credreducer(){
        setcred(cred-5)
    }

    return(
       
            <FullScreen handle={screen1} onChange={reportChange}>
            <div className="body-e">
            <div className="user-background"></div>
            <div className="container">
                <div className="row pt-4 pb-5">
                    <div className="col-lg-3 col-sm-12 custom-examSidebar">
                        <div className="">
                            <div className="cam-layout">
                                <Webcam
                                    className={"webcam-element-e"} 
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                />
                                {/* <button onClick={capture}>Capture photo</button> */}
                                <div className="card card-enhancer p-2 mt-3">
                                    <div className="">
                                    <table className="table">
                                        <tr className="text-secondary">
                                            <td>Credibility Score</td>
                                            <td>: {cred}</td>
                                        </tr>
                                        <tr className="text-secondary">
                                            <td>total Questions</td>
                                            <td>: {noOfQuestions}</td>
                                        </tr>
                                    </table>
                                        <div className="card m-auto text-center mx-4 py-2">
                                            <Clock time={timer}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                       
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12">
                        <div className="card custom-examQuestion p-4">
                            {questiondata===null?
                                <div className="m-4">
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>:null}
                                {questions!==null?
                                    <div>
                                        <h5>{questions[currentQuestion].questionNo+") "+questions[currentQuestion].question}</h5>
                                        <div className="ml-5 mt-3"
                                            onChange={(e)=>{
                                                let tempans=answeredQuestionsData
                                                tempans[currentQuestion]=e.target.value
                                                setansweredQuestionsData(tempans)
                                            }}>
                                            <div className="form-check pb-2">
                                                <input className="form-check-input" type="radio" name={currentQuestion+"flexRadioDefault"} value="A" id="flexRadioDefault1"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    {questions[currentQuestion].optionA}
                                                </label>
                                            </div>
                                            <div className="form-check pb-2">
                                                <input className="form-check-input" type="radio" name={currentQuestion+"flexRadioDefault"} value="B" id="flexRadioDefault2"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    {questions[currentQuestion].optionB}
                                                </label>
                                            </div>
                                            <div className="form-check pb-2">
                                                <input className="form-check-input" type="radio" name={currentQuestion+"flexRadioDefault"} value="C" id="flexRadioDefault3"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                    {questions[currentQuestion].optionC}
                                                </label>
                                            </div>
                                            <div class="form-check pb-2">
                                                <input class="form-check-input" type="radio" name={currentQuestion+"flexRadioDefault"} value="D" id="flexRadioDefault4"/>
                                                <label class="form-check-label" htmlFor="flexRadioDefault4">
                                                    {questions[currentQuestion].optionD}
                                                </label>
                                            </div>
                                        </div>
                                    </div>:null}
                            
                        </div>
                        
                        {currentQuestion+1===noOfQuestions?
                            <button 
                                className="btn btn-warning btn-sm float-right mt-2 mb-5 mr-1 px-5 py-2" 
                                onClick={()=>{submitbuttonSubmit()}}               
                                >Submit</button>
                            :
                            <button 
                            className="btn btn-success btn-sm float-right mt-2 mr-1 px-5 py-2"
                            onClick={()=>{
                                if(currentQuestion+1<=noOfQuestions-1){
                                    setCurrentQuestion(currentQuestion+1)
                                    console.log(currentQuestion)
                                    console.log(answeredQuestionsData)
                                    //setting the selected question option to empty
                                    document.getElementById('flexRadioDefault1').checked = false
                                    document.getElementById('flexRadioDefault2').checked = false
                                    document.getElementById('flexRadioDefault3').checked = false
                                    document.getElementById('flexRadioDefault4').checked = false
                                }
                                }}
                            >Next</button>  }
                            <button class="btn py-4 px-5 hover-hider" onClick={credreducer}>.</button>
                    </div>  
                </div>
            </div>
            </div>
            </FullScreen> 
        
    )
}
export default React.memo(Exam);