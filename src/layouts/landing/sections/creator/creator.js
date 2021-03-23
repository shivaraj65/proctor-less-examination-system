import React from 'react'
import './creator.css'
import '../../../login/util.css';
// import wolf from '../../../../assets/images/wolf.svg'
const Creator =()=>{
    return(
        <section className="bg-black  page-section" id="creator">
        <div className="container">
            {/* <img className="mb-1 background" src={wolf} alt="" /> */}
            <div className="row justify-content-center">
           
                <div className="col-lg-8 text-center top-content-creator-section">
                    <h2 className="text-danger mt-4">The A-Team of this project</h2>
                    {/* <h6 className="text-white mt-0">by</h6> */}
                    <hr className="divider light my-4" />
                    <img src="https://img.icons8.com/nolan/64/react-native.png" alt="" className="pb-1 rotate"/>
                    <h4 className="text-info mb-2">SHIVARAJ</h4>
                    <p className="text-white mb-2 fs-14">Full Stack Developer</p>
                    <h5 className="text-white-50 mb-4 pb-2 fs-13">SVS College of Engineering</h5>
                    <hr/>
                    <img src="https://img.icons8.com/nolan/64/windows10-personalization.png" alt="" className="pb-1"/>
                    <h4 className="text-info mb-2">MOHAMED FAZIL</h4>
                    <p className="text-white mb-2 fs-14">Lead UI/UX & Front end Developer</p>
                    <h5 className="text-white-50 mb-4 pb-2 fs-13">SVS College of Engineering</h5>
                    <hr/>
                    <img src="https://img.icons8.com/nolan/64/vertical-settings-mixer.png" alt="" className="pb-1"/>
                    <h4 className="text-info mb-2">SIVAKUMAR</h4>
                    <p className="text-white mb-2 fs-14">Lead Graphics Designer & Front end Developer</p>
                    <h5 className="text-white-50 mb-4 pb-2 fs-13">SVS College of Engineering</h5>
                    <hr/>
                    {/* <h6 className="text-white-50 mb-2">Get out of the console.log or printf or system.out ... they were just used for Debugging.</h6> */}
                    <h4 className="text-white text-warning my-3">"Talent is cheap; Dedication is Expensive. It will cost you your life." <span>-Irving Stone</span></h4>
                    {/* <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a> */}
                </div>
            </div>
        </div>
        </section>
    )
}
export default React.memo(Creator)