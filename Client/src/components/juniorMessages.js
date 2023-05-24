import React,{useEffect} from 'react';
import {useState} from 'react';
import './CSS/juniorMessages.css'
import './CSS/profile.css'
import { useLocation,Link} from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'
import responses from '../data/juniorMessages.json'

function JuniorMessages(props){
    useEffect(()=>{
        var navTextElements = document.getElementsByClassName('nav-text');
        if (navTextElements.length > 1) {
        var secondNavTextElement = navTextElements[1];

        var aTag = secondNavTextElement.querySelector('a');

        if (aTag) {
            aTag.style.backgroundColor = '#0b1d26';
        }
    }
    },[])
    

    // useEffect(() => {
    //     fetch("/Yearbook23/responses")
    //     .then(response => response.json())
    //     .then(data => setResponses(data));
        
    // }, []);
    return(
        <div>
        <Header/>
        <Sidebar/>
            <div className='student-profile'>
                <div className='profile-box'>
                    <div className='junior-messages-box'>
                        <h2 className='Messages-heading'>Messages</h2>
                        <div className='student-messages'>
                        {
                            responses.map(response =>{
                                return(
                                    <div className={response.Photo?'message-photo':'only-message'}>
                                        <p className={response.Photo?'student-Message-photo':'student-Message'}>{response.Message}<em>-{response.Name}</em></p>
                                        <img className={response.Photo?'response-photo':'response-photo not-visible'} src={response.Photo}/>
                                    </div>
                            )})
                        }

                        </div>
                        
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default JuniorMessages