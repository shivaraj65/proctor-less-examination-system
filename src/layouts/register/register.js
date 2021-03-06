import React,{useState} from 'react';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
import './register.css'
import { useHistory } from "react-router-dom";

const Register=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [rollno,setrollno]=useState("");
    const [registerno,setregisterno]=useState("");
    const [imagedata,setimagedata]=useState("");
    const [image64,setimage64]=useState("");
    const [dept,setdept]=useState("");
    const [password,setpassword]=useState("");
    const [passwordTest, setpasswordTest] = useState(null)

    const handleFiles = files => {
        setimage64(files.base64)
        setimagedata(files.fileList[0])
        // console.log(image64);
        // console.log(files.fileList[0])
      }

    //password test function
    const passwordTestfunc=(data)=>{
        if(!data.match(/[a-z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a small letter"; 
        //   console.log("has no small letters");
        }else if(!data.match(/[A-Z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a capital letter"; 
        //   console.log("has no cap letters")
        } else if(!data.match(/[0-9]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a number"; 
        //   console.log("has no a number")
        }else if(!(data.length >= 8)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "minimum password lenght must be 8"; 
        //   console.log("has no 8 digits")
        }else{
            setpasswordTest(true)
        //   console.log("good password")
          document.getElementById("password-validation-text").innerHTML = ""; 
        }
      }

    //form submit handler
    const submitHandlerRegister=(event)=>{
        event.preventDefault();
        if(image64 ==="" || passwordTest ===false ||dept===""){
            if(image64===""){
                alert("Kindly upload the image.")
            }
            if(passwordTest===false ||passwordTest===null){
                alert("Please fill the password field and submit.")
            }
            if(dept===""){
                alert("Please select your department.")
            }
            
        }else{
            // axios 
            const json ={image:image64,Email: email,Name:name,Rollno:rollno,Regno:registerno,Dept:dept,Password: password};    
            // console.log(QueryString.stringify(formData));  
            //header configuration for the CORS
            const config  = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            }
            // console.log(json)
            axios.post('https://4tajhwi4ga.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
                .then(function (response) {
                    // alert(response.data);
                    sendMail()
                })
                .catch(function (error) {
                    // console.log("error")
                    alert("error");
                });

        }//end of else
       
    }

    //send mail handler
    function sendMail(){
        //url https://hy3kqt59l2.execute-api.us-east-1.amazonaws.com/production
        // axios 
        const json ={Email: email,Name:name,ID:registerno};    
        // console.log(QueryString.stringify(formData));  
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/json',
                }
        }
        axios.post('https://hy3kqt59l2.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
                .then(function (response) {
                    if(response.data.status==="success"){
                        alert("A mail has been sent to your emailID. please verify it to continue.")
                        redirect("/")
                    }else{
                        alert(response.data.message)
                    }
                })
                .catch(function (error) {
                    // console.log("error")
                    alert("contact admin to fix the issue")
                });


        
    }   

    return(
        <div className="register">
            <div className="form-signin card shadow m-auto my-4 p-4 width-register">
                <form onSubmit={submitHandlerRegister}>
                    <div className="text-center ">
                        <h3 className="text-warning font-weight-bold register-heading">Registration Form</h3>
                        <hr/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Email address</label>
                        <input 
                            type="email" 
                            value={email}
                            className="form-control text-primary font-weight-bolder" 
                            onChange={(e)=>{
                                setemail(e.target.value);
                            }}
                            required 
                            autoFocus/>
                        <small id="emailHelp" className="form-text text-warning">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Name</label>
                        <input 
                            type="text" 
                            value={name}
                            className="form-control text-primary font-weight-bolder"
                            onChange={(e)=>{
                                setname(e.target.value);
                            }} 
                            required/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Department</label>
                        <select 
                            className="form-control text-primary font-weight-bolder disabled muted"
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
                    <div className="form-group">
                        <label className="text-secondary font-italic">Roll No</label>
                        <input 
                            type="text" 
                            value={rollno}
                            className="form-control text-primary font-weight-bolder" 
                            onChange={(e)=>{
                                setrollno(e.target.value);
                            }}
                            required/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Register Number</label>
                        <input 
                            type="text" 
                            value={registerno}
                            className="form-control text-primary font-weight-bolder" 
                            onChange={(e)=>{
                                setregisterno(e.target.value);
                            }}
                            required/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Upload your Image</label>
                        <small id="emailHelp" className="form-text text-warning pl-2">Upload your image in <span className="badge badge-warning">JPEG</span> format<br></br></small>
                        {/* <span className="badge badge-pill badge-danger">ELSE:</span> cry while taking examination */}
                        <ReactFileReader handleFiles={handleFiles} fileTypes={[".jpeg",'.jpg']} base64={true}>
                            <div className="row px-3 pt-2 text-center">
                                <div className="col-xs-4">
                                    <button type="button" className='btn btn-block btn-sm btn-outline-secondary my-2'>Upload</button>
                                </div>
                                <div className="col-xs-8">
                                    <p className="text-primary mt-3 pl-4">{imagedata!==null?imagedata.name:null}</p>
                                </div>
                            </div>
                        </ReactFileReader>
                        
                    </div>
                    
                    <div className="form-group">
                        <label className="text-secondary font-italic">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            className="form-control text-primary font-weight-bold" 
                            onChange={(e)=>{
                                setpassword(e.target.value)
                                passwordTestfunc(e.target.value);
                            }}
                            required/>
                        <p id="password-validation-text" className="text-danger"></p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default React.memo(Register);