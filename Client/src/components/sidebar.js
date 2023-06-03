import React, {useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './CSS/Navbar.css';
import { IconContext } from 'react-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Navbar(props) {
  const [sidebar, setSidebar] = useState(true);
    //If the windowwidth is greater than 768px then sidebar will appear and pushes contents by 340px
    function windowwidth(){
      const cards = document.getElementsByClassName('cards');
      const box = document.getElementsByClassName('profile-box');
      const team = document.getElementsByClassName('team');
      const Memorylane = document.getElementsByClassName('Memorylane');
        if(window.innerWidth>768){
            setSidebar(true)
            if (cards.length > 0) {cards[0].style.paddingLeft = '340px';} //Check if the page is students page as it only contains cards class.
            if (box.length > 0) {                                        //For fixing the width of profile box 
              box[0].style.marginLeft = '370px';
              box[0].style.marginRight = '50px';
            }
            if (team.length > 0) {team[0].style.paddingLeft = '370px';}
            if ( Memorylane.length > 0) { Memorylane[0].style.paddingLeft = '370px';}
        }
        else{
            setSidebar(false)
            if (cards.length > 0) {cards[0].style.paddingLeft = '0px';}
            if (box.length > 0) {
              box[0].style.marginLeft = '0px';
              box[0].style.marginRight = '0px';}
            if (team.length > 0) {team[0].style.paddingLeft = '0px';}
            if ( Memorylane.length > 0) { Memorylane[0].style.paddingLeft = '0px';}
        }
    }
    // Each time on resizing
    useEffect(() => {
        window.addEventListener("resize", windowwidth);
            return () => {
                window.removeEventListener("resize", windowwidth);
            };
    }, []);
    useEffect(() => {
      windowwidth();
    }, []);

  const showSidebar = () => {
    const cards = document.getElementsByClassName('cards');
    const box = document.getElementsByClassName('profile-box');
    const team = document.getElementsByClassName('team');
    const Memorylane = document.getElementsByClassName('Memorylane');
    if(!sidebar && window.innerWidth>768){
      if (cards.length > 0) {cards[0].style.paddingLeft = '340px';}
      if (box.length > 0) {
        box[0].style.marginLeft = '370px';
        box[0].style.marginRight = '50px';
      }
      if (team.length > 0) {team[0].style.paddingLeft = '370px';}
      if ( Memorylane.length > 0) { Memorylane[0].style.paddingLeft = '370px';}
    }
    else{
      if (cards.length > 0) {cards[0].style.paddingLeft = '0px';}
      if (box.length > 0) {
        box[0].style.marginLeft = '0px';
        box[0].style.marginRight = '0px';}
        if (team.length > 0) {team[0].style.paddingLeft = '0px';}
        if ( Memorylane.length > 0) { Memorylane[0].style.paddingLeft = '0px';}
    }
    
    setSidebar(!sidebar)
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <FaIcons.FaBars className='menu-bars' onClick={showSidebar} />
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle menu-bars2'>
            <AiIcons.AiOutlineClose />
            </li>
            <Link to='/AllStudents'><p className='Yearbook-23'>Yearbook'23</p></Link>
            <hr className='hr'/>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
            <div className="social-media-handles">
            <img className='maprc-logo' src={require('../Assests/pictures/MAPRC.png')}></img>
            <p>MAPRC|IIT Gandhinagar</p>
              <span>
                <a href='https://www.facebook.com/IITGNStudentLife/' target='_blank'><FontAwesomeIcon className="fa-brands fb" icon={faFacebookF} /></a>
                <a href='https://www.instagram.com/studentlife_iitgn/' target='_blank'><FontAwesomeIcon className="fa-brands insta" icon={faInstagram} /></a>
                <a href='https://www.linkedin.com/company/media-and-public-relations-committee-iit-gandhinagar/' target='_blank'><FontAwesomeIcon className="fa-brands linkedin" icon={faLinkedin} /></a>
                <a href='https://www.youtube.com/c/STUDENTLIFEIITGN' target='_blank'><FontAwesomeIcon className="fa-brands youtube" icon={faYoutube} /></a>
              </span>
            </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
