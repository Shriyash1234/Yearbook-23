import React, { useState, useEffect } from 'react';
import video from '../Assests/Videos/bgVideo.mp4'
import './CSS/home.css'
import * as MdIcons from 'react-icons/md';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import Login from './login';
function Home(){
    const [loading, setLoading] = useState(false);
        useEffect(() => {
            setLoading(true);
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }, []);
    function LoginScreen(){
        var overlay = document.querySelector(".blur-overlay");
        overlay.style.display = "flex";
        document.getElementsByClassName("Home-Heading")[0].style.display="none"
        document.getElementsByClassName("social-handles")[0].style.display="none"
        document.getElementsByClassName("footer")[0].style.display="none"
        document.getElementsByClassName("but-block")[0].style.display="none"
        document.getElementsByClassName("login-window")[0].style.opacity="1"
	}
    return(
        
        <div className="Home" id="Home">
        {loading ? (
            <div className="loader-container">
      	        <div className="spinner"></div>
            </div>
            ):(
            <div className="main-content">
                <video autoPlay muted loop id="myVideo">
                    <source src={video} type="video/mp4"/>
                </video>
            <div class="blur-overlay"></div>
            <div className='Home-Heading'>
                Yearbook | Class Of 2023 
            </div>
            <div className='social-handles'>
                <p>Follow us</p>
                <span>
                <a href='https://www.facebook.com/IITGNStudentLife/' target='_blank'><FontAwesomeIcon className="fa-brands fb" icon={faFacebookF} /></a>
                <a href='https://www.instagram.com/studentlife_iitgn/' target='_blank'><FontAwesomeIcon className="fa-brands insta" icon={faInstagram} /></a>
                <a href='https://www.linkedin.com/company/media-and-public-relations-committee-iit-gandhinagar/' target='_blank'><FontAwesomeIcon className="fa-brands linkedin" icon={faLinkedin} /></a>
                <a href='https://www.youtube.com/c/STUDENTLIFEIITGN' target='_blank'><FontAwesomeIcon className="fa-brands youtube" icon={faYoutube} /></a>
              </span>
            </div>
            <div className='login-window'>
                <p className='Yearbook23'>Yearbook of Class 2023</p>
                <p className='login'>Login with IITGN credentials to access this website</p>
                <div className='login-button'>
                    <Login/>
                </div>
            </div>
            <a>
                <div className='but-block'>
                    <div className='but' onClick={LoginScreen}>
                            <MdIcons.MdOutlineAccountCircle />&nbsp;Login
                    </div>
                </div>
            </a>
            <div className='footer'>
                <div className='MAPRC-block'>
                    <img src={require('../Assests/pictures/MAPRC.png')}></img>
                    <div className='Website-MAPRC'>
                        <p className='Website'>This Website is Managed by</p>
                        <p className='MAPRC'>MAPRC|IIT Gandhinagar</p>
                    </div>
                </div>
                <div className='Yearbooks'>
                    <p>Previous Years</p>
                    <a href='https://students.iitgn.ac.in/yearbook/2022' target='_blank'><p>Year book of Class 2022</p></a>  
                    <a href='https://students.iitgn.ac.in/yearbook/2021' target='_blank'><p>Year book of Class 2021</p></a>  
                </div>
            </div>
            </div>
            )}
        </div>
    )
}
export default Home;