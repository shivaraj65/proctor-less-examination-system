import React from 'react'

const About =()=>{
    return(
        <section className="page-section bg-primary" id="about">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-white mt-0">Learn to Love to Learn!</h2>
                        <hr className="divider light my-4" />
                        <h5 className="text-white-50 mb-4">Join us Today for a better Tommorrow.</h5>
                        <h5 className="text-white-50 mb-4">A platform to Compete, Learn and Teach for free!</h5>
                        {/* <hr className="light my-4"/> */}
                        {/* <h3 className="text-white mb-4">DEDICATED TO</h3>
                        <h4 className="text-white-50">Divya Sri</h4>
                        <h5 className="text-white-50 mb-4">A Kind Hearted soul and Caring person. Your Memories will last with me forever. Rest In Peace.</h5> */}
                        {/* <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default React.memo(About);