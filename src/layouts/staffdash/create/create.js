import React,{useState} from 'react'
// import LazyLoad from 'react-lazyload';

import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


const Create=()=>{
    //page switching data
    const [pageno, setpageno] = useState(0)

    // page 1 data 
    const [id, setid] = useState("")
    const [name, setname] = useState("")
    const [noOfQuestions, setnoOfQuestions] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [dept, setdept] = useState("")
    const [duration, setduration] = useState("")
    
    //page 2
    const [questions, setquestions] = useState(null)

     // states and function for the modal
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false); 
     const handleShow = () => setShow(true);

     const submitHandle=()=>{
        handleClose()
        // axios 
        const json = {staffID:window.sessionStorage.getItem("staffID"),staffName:window.sessionStorage.getItem("staffName"),subjectID: id,name:name,noQues:noOfQuestions,date:date,time:time,questions:questions,duration:duration,dept:dept};  
        console.log(json)
        //header configuration for the CORS
        const config  = {
                headers: {
                   'Content-Type': 'application/json',
                }}
                axios.post('https://6fias0ub15.execute-api.us-east-1.amazonaws.com/production', 
                JSON.stringify(json),config)
                .then(function (response) {
                    // console.log(response.data);
                    // console.log(response.data.status)
                    // redirect to the userdash
                   if(response.data.status ==="success"){
                        alert("The Exam info has been updated to the servers.Use the manage option to modify")
                        setpageno(0)
                        setid("")
                        setname("")
                        setnoOfQuestions("")
                        setdate("")
                        settime("")
                        setquestions("")
                   }else{
                        alert("The Exam info has not been submitted. please Try Again.")
                   }
                })
                .catch(function (error) {
                    // setPopupContent("Oh snap! Something went wrong, Try again.");
                    // handleShow();
                    console.log("error")
                });

     }
     

    return(
        <div>
            <h4 className="text-center text-secondary">SET QUESTION PAPER</h4>
            <hr className="pt-2"/>
                <form>
                    {pageno===0?
                        <div>
                            <div className="form-group">
                                <label>Subject ID</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter subject ID" 
                                    value={id}
                                    onChange={(e)=>{setid(e.target.value)}}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Subject Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Subject Name"
                                    value={name}
                                    onChange={(e)=>{setname(e.target.value)}}
                                    />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Department</label>
                                        <select 
                                                        className="form-control text-success"
                                                        onChange={(e)=>{
                                                            setdept(e.target.value)
                                                        }}
                                                        value={dept}
                                                        >        
                                                        <option></option>                                                
                                                        <option>CSE</option>
                                                        <option>ECE</option>
                                                        <option>EEE</option>
                                                        <option>MECH</option>
                                                    </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="enter in minutes"
                                            value={duration}
                                            onChange={(e)=>{setduration(e.target.value)}}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>No Of Questions</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="No Of Questions"
                                    value={noOfQuestions}
                                    onChange={(e)=>{
                                        setnoOfQuestions(e.target.value)
                                        var data=[];
                                        for(var i=0;i<e.target.value;i++){
                                            data.push({"questionNo":i+1,"question":"","optionA":"","optionB":"","optionC":"","optionD":"","ans":""})
                                        }
                                        setquestions(data)
                                        }}
                                    />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Date of Examination</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            placeholder="DD/MM/YYY"
                                            value={date}
                                            onChange={(e)=>{setdate(e.target.value)}}
                                            />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Examination time</label>
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            placeholder="enter railway time HHMM"
                                            value={time}
                                            onChange={(e)=>{settime(e.target.value)}}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>:null}
                        
                    {pageno===1 && pageno<=questions.length?
                        <div>
                        {questions && questions.map((entry,index)=>{
                            return(
                                <div className="questionCard-padding" key={index}>
                                    <h5 className="text-secondary">Question no :{index+1}</h5>
                                    <div className="container">
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="enter the Question here"
                                            onChange={(e)=>{
                                                let temp=[...questions]
                                                // console.log(temp)
                                                temp[index].question=e.target.value
                                                setquestions(temp)
                                            }}
                                            value={questions[index].question}
                                            />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label className="text-secondary">option A</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="enter the option A here"
                                                    onChange={(e)=>{
                                                        let temp=[...questions]
                                                        // console.log(temp)
                                                        temp[index].optionA=e.target.value
                                                        setquestions(temp)
                                                    }}
                                                    value={questions[index].optionA}
                                                    />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className="text-secondary">option B</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="enter the option B here"
                                                    onChange={(e)=>{
                                                        let te=[...questions]
                                                        // console.log(te)
                                                        te[index].optionB=e.target.value
                                                        setquestions(te)
                                                    }}
                                                    value={questions[index].optionB}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label className="text-secondary">option C</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="enter the option C here"
                                                    onChange={(e)=>{
                                                        let t=[...questions]
                                                        // console.log(t)
                                                        t[index].optionC=e.target.value
                                                        setquestions(t)
                                                    }}
                                                    value={questions[index].optionC}
                                                    />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className="text-secondary">option D</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="enter the option D here"
                                                    onChange={(e)=>{
                                                        let td=[...questions]
                                                        // console.log(td)
                                                        td[index].optionD=e.target.value
                                                        setquestions(td)
                                                    }}
                                                    value={questions[index].optionD}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <strong>
                                                    <label className="text-success">Answer</label>
                                                    <select 
                                                        className="form-control text-success"
                                                        onChange={(e)=>{
                                                            let temp=[...questions]
                                                            temp[index].ans=e.target.value
                                                            setquestions(temp)
                                                        }}
                                                        value={questions[index].ans}
                                                        >
                                                        <option></option>
                                                        <option>A</option>
                                                        <option>B</option>
                                                        <option>C</option>
                                                        <option>D</option>
                                                    </select>
                                                </strong>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            ) 
                        })}
                        </div>
                        :null}
                    
                    
                    {pageno===0?
                        <button 
                            type="button" 
                            className="btn btn-primary float-md-right ml-3 px-5"
                            onClick={()=>{
                                //validate the fields
                                if(id!=="" && name !=="" && noOfQuestions!==""&&date!==""&&time!==""){
                                    setpageno(pageno+1)
                                }else{
                                    alert("fill all the fields to continue.")
                                }
                               

                            }}
                    >Next</button>:null}    

                    {pageno===1?
                        <div>
                            <button 
                                    type="button" 
                                    className="btn btn-success float-md-right ml-4"
                                    onClick={()=>{
                                        var temp=0;
                                        for (var i=0;i<questions.length;i++){
                                            console.log(i);
                                            if(questions[i].question==="" || questions[i].optionA===""||questions[i].optionB===""||questions[i].optionC===""||questions[i].optionD===""||questions[i].ans===""){
                                                alert("you forgot to fill question No:"+ (i+1) +". Please fill the question to continue.");
                                                console.log(i);
                                                temp=1;
                                                break;                                                
                                            }
                                        }
                                        if(temp===0){
                                            handleShow()
                                        }
                                        
                                    }}
                            >submit</button>
                            <button 
                                    type="button" 
                                    className="btn btn-dark float-md-right"
                                    onClick={()=>{
                                    setpageno(pageno-1);
                                    }}
                            >previous</button>
                        </div>
                        :null}

                    
                </form>

                 {/* popup  */}
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
                        Once the exam is published, it will Automatically notify on the students Dashboard.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={submitHandle}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                    </Modal.Footer>
                </Modal>
        </div>
    )
}
export default React.memo(Create)