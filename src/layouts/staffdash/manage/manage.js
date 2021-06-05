import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const Manage =()=>{
    const [data,setData]=useState(null)

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        // axios 
        const json = {sid:window.sessionStorage.getItem("staffID")};  
        const config  = {
            headers: {
               'Content-Type': 'application/json',
            }}
            axios.post('https://7vqla7ygik.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
            .then(function (response) {
              console.log(response.data)
              if(response.data.status==="success"){
                setData(response.data.message.Items)
              }else{
                  alert("something went wrong refresh ot try later!")
              }              
            })
            .catch(function (error) {
                alert("something went wrong. Please try again.")
                console.log("error")
            });   
    },[])
    return(
        <div>            
            {data && data.map((entry,index)=>{
                return(
                    <div className="row mt-4 hovered" key={index}>
                        <div className="col-sm-4 pt-3 pb-2">
                            <p className="text-secondary">{entry.examID}</p>
                        </div>
                        <div className="col-sm-6 pt-3 pb-2">
                            <p className="text-secondary">{entry.examName}</p>
                        </div>
                        <div className="col-sm-2 text-center">
                            <button 
                                className="btn btn-sm"
                                onClick={()=>{
                                    handleShow()
                                }}
                                ><img src="https://img.icons8.com/nolan/64/info-popup.png" alt="" style={{maxHeight:"32px"}}/></button>
                        </div>
                    </div>
                )})
            }
            {data===null?
                <div className="m-4">
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>:null}
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
                    <h5 className="text-primary">it0001</h5>
                    <table className="text-secondary">
                        <tr>
                            <td>No of students Attended</td>
                            <td>: 2</td>
                        </tr>
                        <tr>
                            <td>No of Questions</td>
                            <td>: 10</td>
                        </tr>
                        <tr>
                            <td>Date of Examination</td>
                            <td>: 20-3-2021</td>
                        </tr>
                        <tr>
                            <td>Duration</td>
                            <td>: 10</td>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default React.memo(Manage)