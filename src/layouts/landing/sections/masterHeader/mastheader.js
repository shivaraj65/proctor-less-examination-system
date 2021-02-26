import React from 'react'
import { useHistory } from "react-router-dom"
// import Glitchify from 'react-glitchify';
// import GlitchClip from 'react-glitch-effect/core/Clip';
import GlitchText from 'theme-ui-glitch-text';
import './mastheader.css'

const MastHeader=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    return(
    <header className="masthead">
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-10 align-self-end">
                <h1 className="text-uppercase text-white-100 font-weight-bold font-black-ops-one" style={{color: "#393e46",opacity: "0.8"}}>
                    <GlitchText
                        text="HAWK-EYE"
                        duration="4000ms"
                        keyframesNum={20}
                        limit={1}
                        colors={['#54e346', '#ff7b54', '#11698e']}
                        position={[-1, 6]}
                        shadow={[-4, 3]}
                        backgroundColor=""
                        >
                        HAWK-EYE
                    </GlitchText>
                </h1>
                       
                    <hr className="divider my-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white-50 font-weight-light mb-5">were Examinations done right.</p>
                    <button 
                        className="btn btn-outline-primary btn-xl loginbutton-l" 
                        onClick={()=>{
                            redirect("/login")
                        }}
                        ><GlitchText
                        text="LOGIN"
                        duration="1000ms"
                        keyframesNum={10}
                        limit={1}
                        colors={['#54e346', '#ff7b54', '#11698e']}
                        position={[-1, 1]}
                        shadow={[-1, 1]}
                        backgroundColor=""
                        >LOGIN
                    </GlitchText></button>
                </div>
            </div>
        </div>
    </header>
    )
}
export default React.memo(MastHeader)