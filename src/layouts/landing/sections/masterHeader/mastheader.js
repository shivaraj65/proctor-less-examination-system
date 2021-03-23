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
                        text="&lt;meriTTrack&gt;"
                        duration="4000ms"
                        keyframesNum={20}
                        limit={1}
                        colors={['#54e346', '#ff7b54', '#11698e']}
                        position={[-2, 3]}
                        shadow={[-4, 3]}
                        backgroundColor=""
                        >
                        &lt;meriTTrack&gt;
                    </GlitchText>
                </h1>
                       
                    <hr className="divider mt-4 mb-5 pb-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white-50 font-weight-light mb-5">where Examinations done right.</p>
                    <button 
                        className="btn btn-outline-light btn-xl loginbutton" 
                        onClick={()=>{
                            redirect("/login")
                        }}
                        ><GlitchText
                        text="LOGIN"
                        duration="1000ms"
                        keyframesNum={10}
                        limit={1}
                        colors={['#54e346', '#54e346', '#54e346']}
                        position={[-2, 0]}
                        shadow={[0, 2]}
                        backgroundColor=""
                        >LOGIN
                    </GlitchText></button>
                     {/* dummy btn for testing */}
                     <button 
                        className="btn btn-info btn-xl loginbutton mt-2 px-3" 
                        onClick={()=>{
                            redirect("/register")
                        }}
                        >testing signup
                    </button>
                </div>
            </div>
        </div>
    </header>
    )
}
export default React.memo(MastHeader)