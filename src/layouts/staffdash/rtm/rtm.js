import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const Rtm=()=>{
    const [data,setData]=useState(null)
    //holds the candidates exam data of selected examID
    const [eCandiData,setECandiData]=useState(null)

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);

    //holds the popup page configuration
    const [pageno,setPageno]=useState(1)

    //set image links for the selected candidates
    const [imageData,setImageData]=useState(null)

    //state to hold the actual user data informations
    const [userProfile,setUserProfile]=useState(null)

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
            //   console.log(response.data)
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

    const fetchExamAnsData=(id)=>{
        // axios 
        const json = {eid:id};  
        const config  = {
            headers: {
               'Content-Type': 'application/json',
            }}
            axios.post('https://67xwscju4a.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
            .then(function (response) {
            //   console.log(response.data)
              if(response.data.status==="success"){
                setECandiData(response.data.message.Items)
              }else{
                  alert("something went wrong refresh or try later!")
              }              
            })
            .catch(function (error) {
                alert("something went wrong. Please try again.")
                console.log("error")
            });
    }

    const fetchUserData=(idd)=>{
        //fetch the user data
        // https://zj28gizx9b.execute-api.us-east-1.amazonaws.com/production
        // axios 
        const json = {id:idd};  
        const config  = {
            headers: {
               'Content-Type': 'application/json',
            }}
            axios.post('https://zj28gizx9b.execute-api.us-east-1.amazonaws.com/production', 
            JSON.stringify(json),config)
            .then(function (response) {
            //   console.log(response.data)
              if(response.data.status==="success"){
                setUserProfile(response.data.payload.Item)
                console.log(response.data.payload.Item)
              }else{
                  alert("something went wrong refresh or try later!")
              }              
            })
            .catch(function (error) {
                alert("something went wrong. Please try again.")
                console.log("error")
            });
    }

    return(
        <div>
            <h4 className="text-center text-success">Monitoring Wizard</h4>
            <hr/>
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
                                    fetchExamAnsData(entry.examID)
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
                    size="lg"
                    scrollable={true}
                >
                <Modal.Header closeButton>
                    <Modal.Title>&lt;meriTTrack&gt;</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pageno===1?
                        <div>
                            <div className="px-1">
                            <div className="row mt-4 fonr-weight-bold">
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">SID</p>
                                </div>
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">Credibility</p>
                                </div>
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">Malpractice</p>
                                </div>
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">score</p>
                                </div>
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">submission type</p>
                                </div>
                                <div className="col-sm-2 pt-3 pb-1">
                                    <p className="text-dark">more data</p>
                                </div>
                            </div>
                    {eCandiData && eCandiData.map((entry,index)=>{
                        return(
                            <div className="row mt-4 hovered" key={index}>
                                <div className="col-sm-2 pt-1 pb-2">
                                    <p className="text-secondary">{entry.sid}</p>
                                </div>
                                <div className="col-sm-2 pt-1 pb-2">
                                    <p className="text-secondary">{entry.credibility}</p>
                                </div>
                                <div className="col-sm-2 pt-1 pb-2">
                                    <p className="text-secondary">
                                        {entry.malprac===true?"true":"false"}
                                    </p>
                                </div>
                                <div className="col-sm-2 pt-1 pb-2">
                                    <p className="text-secondary">{entry.score}</p>
                                </div>
                                <div className="col-sm-2 pt-1 pb-2">
                                    <p className="text-secondary">{entry.submitType}</p>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <button 
                                        className="btn btn-sm"
                                        onClick={()=>{
                                            setPageno(2)
                                            setImageData(entry.facereck)
                                            console.log(entry.facereck)
                                            fetchUserData(entry.sid)
                                        }}
                                        ><img src="https://img.icons8.com/nolan/64/info-popup.png" alt="" style={{maxHeight:"32px"}}/></button>
                                </div>
                            </div>
                        )})
                    }
                    </div>
                    {eCandiData===null?
                    <div className="m-4">
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>:null}
                    </div>:null}
                    {/* //----end of page1----// */}
                    {pageno===2?<div>
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="text-center text-info">Candidate Details</h6>
                            </div>
                            <div className="col-sm-6">
                                <h6 className="text-danger text-center">Examination Data</h6> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                {userProfile?<div className="">
                                    <div className="text-center">
                                        <img src={userProfile.imageurl} alt="" className="custom-image-1"/>
                                    </div>                                    
                                    <div className="row ml-1">
                                        <div className="col-sm-5">
                                            <h6 className="text-dark">Register no</h6>
                                            <h6 className="text-dark">Name</h6>
                                            <h6 className="text-dark">Dept</h6>
                                            <h6 className="text-dark">Email</h6>
                                        </div>
                                        <div className="com-md-7">
                                            <h6 className="text-success">{": "+userProfile.registernumber}</h6>
                                            <h6 className="text-success">{": "+userProfile.name}</h6>
                                            <h6 className="text-success">{": "+userProfile.department}</h6>
                                            <h6 className="text-success">{": "+userProfile.email}</h6>
                                        </div>
                                    </div>
                                </div>:null}
                                {/* show the profile data here */}
                            </div>
                            <div className="col-sm-6 text-center overflow-control border border-primary rounded">                            
                                {imageData && imageData.map((entry,index)=>{
                                    return(
                                        <div>
                                            <img src={entry.url} alt="" className="custom-image" key={index}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button 
                            className="btn btn-sm btn-success ml-3 px-4"
                            onClick={()=>{
                                setPageno(1)
                            }}
                            >back</button>
                    </div>:null}
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
export default React.memo(Rtm)