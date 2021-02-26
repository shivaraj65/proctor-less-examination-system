import React,{useState} from 'react'
// import LazyLoad from 'react-lazyload';

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
    
    //from page 2
    const [questions, setquestions] = useState(null)

     // states and function for the modal
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false); 
     const handleShow = () => setShow(true);

     

    return(
        <div>
            <h4 className="text-center">SET QUESTION PAPER</h4>
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
                            <div className="form-group">
                                <label>No Of Questions</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="No Of Questions"
                                    value={noOfQuestions}
                                    onChange={(e)=>{setnoOfQuestions(e.target.value)}}
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
                        
                    {pageno>=1 && pageno<=questions.length?
                        <div>
                            <h5>Question no :{questions[pageno-1].questionNo+1}</h5>
                            <div className="container">
                                <div className="form-group">
                                    {/* <label>Question</label> */}
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="enter the Question here"
                                        value=""
                                        />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>option A</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="enter the option A here"
                                                value=""
                                                />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>option B</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="enter the option B here"
                                                value=""
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>option C</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="enter the option C here"
                                                value=""
                                                />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>option D</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="enter the option D here"
                                                value=""
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <strong>
                                                <label className="text-success">Answer</label>
                                                <select id="inputState" className="form-control text-success">
                                                    <option>_</option>
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
                        </div>:null}
                    
                    
                     
                        <button 
                            type="button" 
                            className="btn btn-primary float-md-right ml-3"
                            onClick={()=>{
                                if(pageno===0){
                                    var data=[];
                                    for(var i=0;i<noOfQuestions;i++){
                                        data.push({"questionNo":i,"question":"","option1":"","option2":"","option3":"","option4":"","ans":""})
                                    }
                                    console.log(data)
                                    setquestions(data)
                                }
                                if(pageno==noOfQuestions){
                                   //set the modal for the submit
                                   handleShow()
                                }else{
                                    setpageno(pageno+1);
                                }
                                
                            }}
                        >Next</button>
                       
                    
                    {pageno!==0 && pageno<=questions.length+1?<button 
                        type="button" 
                        className="btn btn-secondary float-md-right"
                        onClick={()=>{
                        setpageno(pageno-1);
                        }}
                    >previous</button>:null}
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
                    <Modal.Title>HAWKEYE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Once the exam is published, it will Automatically notify on the students Dashboard.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" >
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