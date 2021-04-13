import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const Invite=()=>{
    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);

    const copytext=()=>{
        var copyText = document.getElementById("inviteID");        
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    return(
        <div>
            <h3 className="text-center mb-4 text-primary">Exam Invite Link</h3>
            <hr/>
            <input className="form-control mt-3" id="inviteID" type="text" value="https://shivaraj65.github.io/proctor-less-examination-system/#/register" readOnly/>
            <button 
                className="btn btn-outline-success font1 my-3 px-4 py-2"
                onClick={()=>{
                    copytext()
                    handleShow()
                }}
            ><strong>COPY</strong></button>
            <p className="text-muted mt-3">*share this link to your students to join the exam platform</p>

            {/* popup  */}
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={true}
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title>&lt;meriTTrack&gt;</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="text-success">Link Copied!</h6>
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
export default React.memo(Invite);
