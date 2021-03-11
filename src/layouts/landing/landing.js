import React from 'react'
import './landing.css'

//importing sections
import MasterHeader from './sections/masterHeader/mastheader'
import About from './sections/aboutSection/about'
import Service from './sections/servicess/service'
import Creator from './sections/creator/creator'
import Contact from './sections/contact/contact'
import Footer from './sections/footer/footer'

const Landing =()=>{
    return(
        <div>
            <MasterHeader/>
            {/* <About/> */}
            <Service/>
            <Creator/>
            {/* <Contact/> */}
            <Footer/>
        </div>
    )
}
export default React.memo(Landing)