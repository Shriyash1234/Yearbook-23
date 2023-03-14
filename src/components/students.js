import React,{useState} from 'react';
import './CSS/students.css'
import Sidebar from './sidebar'
import Header from './header'
import Card from './card'
import profilesPics from '../data/profilePics.json'
import { Link } from 'react-router-dom';
function Students(){
    const [ name, setName ] = useState("")
    function SetTheName(childData){
		setName(childData);
	}
    return(
        <div>
        <Header func={SetTheName}/>
        <Sidebar/>
            <div className='cards'>
            {
                profilesPics.map(profilesPic =>{
                    return(
                        <div>
                        <Link to='/Yearbook-23/students' state={{mail: profilesPic["Your_Email_ID"]}}>   {/* sending props through links can be accessed by location */}
                        <Card pic={profilesPic}/>
                        </Link>
                        </div>
                )})
            }
            </div>
        </div>
    )
}
export default Students