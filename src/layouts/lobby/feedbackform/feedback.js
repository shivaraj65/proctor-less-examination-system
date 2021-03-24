import React,{useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Feedback=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    const [feedback,setfeedback]=useState("");
    const [rating,setrating]=useState("");
   
    const ratingChanged = (newRating) => {
        setrating(newRating)
        console.log(newRating)
      };
    
    const submithandeler=(event)=>{
        event.preventDefault();
        if(rating===""){
            alert("enter your rating")
        }else{
            // axios 
            const json ={sid:window.sessionStorage.getItem("userID"),feedback:feedback,rating:rating};    
            // console.log(QueryString.stringify(formData));  
            //header configuration for the CORS
            const config  = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
            }
            axios.post('https://g6et3ab26a.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
                .then(function (response) {
                    alert('thanks for your feedback')
                    redirect("/ul/"+window.sessionStorage.getItem("userID")+"/"+window.sessionStorage.getItem("userName"))
                })
                .catch(function (error) {
                    alert("error");
                });
        }
    }


    return(
        <div className="registr mt-5">
            <div className="form-signin card card-enhancer shadow m-auto mt-4 p-4 width-register">
                <form className="" onSubmit={submithandeler}>
                    <div className="text-center">
                        <h3 className="text-success font-weight-bold register-heading">Feedback Form</h3>
                        <hr/>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">User ID / Register no</label>
                        <input 
                            type="text"                             
                            className="form-control text-primary font-weight-bolder" 
                            required 
                            autoFocus/>                        
                    </div>
                    <div className="form-group">
                        <label className="text-secondary font-italic">Feedback:</label>
                            <textarea 
                                className="form-control text-primary font-weight-bolder" 
                                rows="3"
                                value={feedback}
                                onChange={(e)=>{
                                setfeedback(e.target.value)
                                }} 
                                required
                                />
                    </div>
                    <div className="form-group">
                    <label className="text-secondary font-italic">Rating :</label>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={35}
                        a11y= {true}
                        activeColor="#ffd700"
                    />
                    </div>                       
                    <button type="submit" className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default React.memo(Feedback);