import React,{useState,useEffect} from 'react';
import Header from './header'
import Sidebar from './sidebar'
import './CSS/team.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Team(){
    useEffect(()=>{
        var navTextElements = document.getElementsByClassName('nav-text');
        if (navTextElements.length > 1) {
        var secondNavTextElement = navTextElements[4];

        var aTag = secondNavTextElement.querySelector('a');

        if (aTag) {
            aTag.style.backgroundColor = '#0b1d26';
        }
    }
    },[])
    const [ name, setName ] = useState("")
    function SetTheName(childData){
		setName(childData);
	}
    return(
        <div>
            <Header func={SetTheName}/>
            <Sidebar/>
            <div className='team'>
                <h1 className='Heading'>Our Team</h1>
                <div className='team-message'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
                <div className='team-cards'>
                    <div className='card'>
                        <img class='team-photo' src={require('../Assests/pictures/team_images/Ayush.jpg')}></img>
                        <div className='content'>
                            <p className='name'>Ayush Kushwah</p>
                            <p className='position'>MAPRC Secreatary</p>
                            <div className="social-icons">
                                <span>
                                    <a target='blank' href='https://www.facebook.com/profile.php?id=100007227152962'><FontAwesomeIcon className="fa-brands fb1" icon={faFacebookF} /></a>
                                    <a target='blank' href='https://www.instagram.com/ayush_socool'><FontAwesomeIcon className="fa-brands insta1" icon={faInstagram} /></a> 
                                    <a target='blank' href='https://www.linkedin.com/in/ayush-singh-kushwah-0717931b9/'><FontAwesomeIcon className="fa-brands linkedin1" icon={faLinkedin} /></a>
                                    <a target='blank' href='https://www.youtube.com/channel/UCAoBCMDA6s-wUOGfKF9c2kQ'><FontAwesomeIcon className="fa-brands youtube1" icon={faYoutube} /></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <img class='team-photo' src={require('../Assests/pictures/team_images/Manish.jpg')}></img>
                        <div className='content'>
                            <p className='name'>Manish jangir</p>
                            <p className='position'>Technical Cordinator</p>
                            <div className="social-icons">
                                <span>
                                    <a target='blank' href='https://www.facebook.com/manish.jangir.16940599?mibextid=ZbWKwL'><FontAwesomeIcon className="fa-brands fb1" icon={faFacebookF} /></a>
                                    <a target='blank' href='https://instagram.com/_mani.jangir?igshid=MzNlNGNkZWQ4Mg=='><FontAwesomeIcon className="fa-brands insta1" icon={faInstagram} /></a> 
                                    <a target='blank' href='https://www.linkedin.com/in/manish-jangir-4a3522202'><FontAwesomeIcon className="fa-brands linkedin1" icon={faLinkedin} /></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <img class='team-photo' src={require('../Assests/pictures/team_images/Shriyash.jpg')}></img>
                        <div className='content'>
                            <p className='name'>Shriyash Mandavekar</p>
                            <p className='position'>Web Developer</p>
                            <div className="social-icons">
                                <span>
                                    <a target='blank' href='https://www.facebook.com/shriyash.mandavekar/'><FontAwesomeIcon className="fa-brands fb1" icon={faFacebookF} /></a>
                                    <a target='blank' href='https://www.instagram.com/shriyashmandavekar/'><FontAwesomeIcon className="fa-brands insta1" icon={faInstagram} /></a> 
                                    <a target='blank' href='https://www.linkedin.com/in/mandavekar-shriyash-838398227/'><FontAwesomeIcon className="fa-brands linkedin1" icon={faLinkedin} /></a>
                                    <a target='blank' href='https://github.com/Shriyash1234'><FontAwesomeIcon className="fa-brands youtube1" icon={faGithub} /></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team;