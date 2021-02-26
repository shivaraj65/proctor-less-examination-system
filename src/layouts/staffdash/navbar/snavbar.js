import React from 'react'

const SNav=()=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav" style={{backgroundImage: "linear-gradient(to top, rgb(182, 255, 210,0.3), #f2e3bd88)",opacity:"0.7"}}>
            <div className="container">
                <a className="navbar-brand  text-primary" href="/">HAWKEYE</a>
                <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        {/* <li className="nav-item text-light">{props.name}</li> */}
                        {/* <li className="nav-item">
                            <h1 className="nav-link text-dark active">Home</h1> 
                        </li> */}
                        <li className="nav-item">
                        <h1 className="nav-link text-dark">USER NAME</h1>
                        {/* dropdown showing user credentials */}
                        </li>
                        <li className="nav-item">
                        <h1 className="nav-link text-dark">Logout</h1>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(SNav)