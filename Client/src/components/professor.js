import React,{useState} from 'react';
import Header from './header'
import Sidebar from './sidebar'
import './CSS/professor.css'
import Professors from '../data/professorData.json'

function Professor(){
    const [ name, setName ] = useState("")
    function SetTheName(childData){
		setName(childData);
	}
    return(
        <div className='professors'>
            <Header func={SetTheName}/>
            <Sidebar/>

            {
                Professors.map(professor=>{
                    return(
                        <div className='prof-block'>
                            <img className='prof-img' src={require('../Assests/Professors-images/'+professor.Photo)}/>
                            <div className='prof-message'><p>{professor.Message}</p><i>{professor.Professor}</i></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Professor;