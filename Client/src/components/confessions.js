import React from 'react';
import {useState,useEffect} from 'react';
import './CSS/juniorMessages.css'
import './CSS/profile.css'
import { useLocation,Link} from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'

function Confessions(props){
    const [confessions, setConfessions] = useState([]);
    useEffect(() => {
        var navTextElements = document.getElementsByClassName('nav-text');
        if (navTextElements.length > 1) {
        var secondNavTextElement = navTextElements[3];

        var aTag = secondNavTextElement.querySelector('a');

        if (aTag) {
            aTag.style.backgroundColor = '#0b1d26';
        }
    }
        fetch("https://studentsiitgn.onrender.com/Yearbook23/confession-responses")
        .then(response => response.json())
        .then(data =>setConfessions(data));
        
    }, []);
    return(
        <div>
        <Header/>
        <Sidebar/>
            <div className='student-profile'>
                <div className='profile-box'>
                    <div className='junior-messages-box'>
                        <h2 className='Messages-heading'>Confessions</h2>
                        <div className='student-messages'>
                        {
                            confessions.map(confession =>{
                                return(
                                        <p className='student-Message'>{confession.Message}</p>
                                )})
                        }
                        <form action='https://studentsiitgn.onrender.com/Yearbook23/addConfession' method='post' id='message-form'>
                            <input type='text' name='message' id='message' placeholder="Add A Message"></input>
                            <div className='submit-btn'>
                                <button className="buttonn" type="submit">Submit</button>
                            </div>
                        </form>
                        </div>
                        
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Confessions