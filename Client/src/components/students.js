import React,{useEffect, useState} from 'react';
import './CSS/students.css'
import Sidebar from './sidebar'
import Header from './header'
import Card from './card2'
import profilesPics from '../data/profilePics.json'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PhotoUploaderProfile from './photoUploaderProfile';
function Students(){
    const [name,setName] = useState("")
    const [ profiles, setProfiles ] = useState([])
    const dispatch = useDispatch();
    function SetTheName(childData){
		setName(childData);
	}
    const handleButtonClick = () => {
        const element = document.getElementById('build');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    useEffect(() => {
        document.querySelector('.nav-text a').style.backgroundColor = '#0b1d26';
        fetch("/Yearbook23/profiles")
        .then(response => response.json())
        .then(data =>setProfiles(data));
    }, []);

    return(
        <div>
        <Header func={SetTheName}/>
        <Sidebar/>
        <div className='build' onClick={handleButtonClick}>Build your Profile</div>
        <div className='inactive' onClick={handleButtonClick}>+</div>
            <div className='cards'>
            {
                profilesPics.map(profilesPic =>{
                    return(
                        <div>
                        {/* sending props through links can be accessed by location */}
                        <Link to='/Yearbook23/students' state={{mail: profilesPic["Your_Email_ID"],source:'profilePics'}}>   
                        {/* <Link to={{pathname: "/Yearbook23/students", state: {mail: profilesPic["Your_Email_ID"],source:"profilesPics"}}}> */}
                        <Card pic={profilesPic} source="profilesPics"/>
                        </Link>
                        </div>
                )})
            }
            {
                profiles.map(profile =>{
                    return(
                        <div>
                        <Link to='/Yearbook23/students' state={{mail: profile["Email"],source:'profiles',studentName:profile["Name"]}}>   
                        <Card pic={profile} source="profiles"/>
                        </Link>
                        </div>
                )})
            }
            <PhotoUploaderProfile />
            <div id='build'></div>
            </div>
            
        </div>
    )
}
export default Students