import React,{useState} from 'react'
import './registeration.css';

const RegisterationZone=()=>{
    const [pageno, setpageno] = useState("0")
    const [dept, setdept] = useState("")

    const submitdept=()=>{

    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav" style={{backgroundImage: "linear-gradient(to top, rgb(182, 255, 210,0.3), #f2e3bd88)",opacity:"0.7"}}>
                <div className="container">
                    <a className="navbar-brand  text-primary" href="/">&lt;meriTTrack&gt;</a>
                    <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Home</h1> 
                            </li>
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Dashboard</h1> 
                            </li>
                            <li className="nav-item">
                                <h1 className="nav-link text-dark">Help</h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container nav-padding">
                <div className="card card-enhancer p-4 mt-2">
                    <h5 className="text-center text-primary">Registation Zone</h5>
                    <hr/>
                    <p className="text-center text-secondary">register for your semester exams here</p>

                    {pageno && pageno==="0"?
                        <div className="container-custom-register p-4">
                            <label className="text-secondary muted">Enter your department here:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your department" 
                                value={dept}
                                onChange={(e)=>{setdept(e.target.value)}}
                            />
                            <button 
                                type="button" 
                                className="btn btn-outline-success btn-block float-md-right mt-4"
                                onClick={()=>{
                                    if(dept===""){
                                        alert("enter your department to continue")
                                    }else{
                                        submitdept()
                                        setpageno("1")
                                    }
                                }}
                            >submit</button>
                        </div>
                    :null}
                    
                   
                </div>
            </div>

        </div>
    )
}

export default React.memo(RegisterationZone);
