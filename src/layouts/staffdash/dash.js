import React,{useState} from 'react'
import Snav from './navbar/snavbar'
import './dash.css'
import Nodata from '../../assets/images/no_data_1.png'
// staff modules
import Create from './create/create'
import Delete from './delete/delete'

const Dash =()=>{
    const [rightPanelselector, setrightPanelselector] = useState(null);

    return(
        <div>
        {/* <div className="user-background"></div> */}
            <Snav/>
            <div className="container">
                <div className="row nav-padding ">                     
                    <div className="col-md-3">
                        <div className="card p-4 card-shadow card-enhancer">
                        <h1 className="h5 text-secondary text-center"><strong>Staff C-Panel</strong></h1>
                            <div className="px-2 py-2">
                                <button 
                                    className="btn btn-block btn-outline-success font1 my-2 mt-4"
                                    onClick={()=>{
                                        setrightPanelselector("create")
                                    }}
                                ><strong>Create</strong></button>
                                <button 
                                    className="btn btn-block btn-outline-info font1 my-3"
                                    onClick={()=>{
                                        setrightPanelselector("manage")
                                    }}
                                ><strong>Manage</strong></button>
                                {/* <button 
                                    className="btn btn-block btn-outline-secondary font1 my-3"
                                    onClick={()=>{
                                        setrightPanelselector("override")
                                    }}
                                ><strong>Override</strong></button> */}
                                {/* <button 
                                    className="btn btn-block btn-outline-info font1 my-3"
                                    onClick={()=>{
                                        setrightPanelselector("viewResult")
                                    }}
                                ><strong>View Result</strong></button> */}
                                <button 
                                    className="btn btn-block btn-outline-danger font1 my-3"
                                    onClick={()=>{
                                        setrightPanelselector("delete")
                                    }}
                                ><strong>Delete</strong></button>
                                {/* <button 
                                    className="btn btn-block btn-outline-dark font1 my-3"
                                    onClick={()=>{
                                        setrightPanelselector("publish")
                                    }}
                                ><strong>Publish Result</strong></button> */}
                                <button 
                                    className="btn btn-block btn-outline-dark font1 my-2"
                                    onClick={()=>{
                                        setrightPanelselector("rtm")
                                    }}
                                ><strong>RT Monitoring</strong></button>
                            </div>                            
                        </div>
                        
                    </div>
                    <div className="col-md-9">
                        <div className="card p-4 inner-scroll card-shadow">    
                            {rightPanelselector==null?<img classname="nodata" src={Nodata} alt="no data to display"/>:null}
                            {rightPanelselector==="create"?<Create/>:null}
                            {rightPanelselector==="delete"?<Delete/>:null}
                        </div>
                    </div>
                </div> 
                
            </div>
        </div>
    )
}

export default React.memo(Dash)


//create separate components for create ,.... and import them here