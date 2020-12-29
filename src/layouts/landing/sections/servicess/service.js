import React from 'react'

const Service =()=>{
    return(
        <section className="page-section" id="services">
            <div className="container">
                <h2 className="text-center mt-0">At Your Service</h2>
                <hr className="divider my-4" />
                <div className="row">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <i className="fas fa-4x fa-gem text-primary mb-4"></i>
                            <h3 className="h4 mb-2">Free for All</h3>
                            <p className="text-muted mb-0">All the services are provided absolutely free! </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <i className="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                            <h3 className="h4 mb-2">Anti Cheat Mechanism</h3>
                            <p className="text-muted mb-0">Entire Session are monitored carefully to detect any Malpractice.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <i className="fas fa-4x fa-globe text-primary mb-4"></i>
                            <h3 className="h4 mb-2">24/7 Support</h3>
                            <p className="text-muted mb-0">Our Developer team is Available  round the clock to clear your Queries.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <i className="fas fa-4x fa-heart text-primary mb-4"></i>
                            <h3 className="h4 mb-2">Made with Love</h3>
                            <p className="text-muted mb-0">Is it really open source if it's not made with love?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default React.memo(Service)