import React from "react"
import mails from '../data/emails.json'
import names from '../data/name.json'
import './CSS/card.css'
import {dict} from './imgLinkData'
import NameBioData from '../data/NameBioData'

export default function ActionAreaCard(props) {
  function findName(mail){
		let ind = mails.indexOf(mail)
		let name = names[ind]
		return name
	}
  function findBio(mail){
		let ind = mails.indexOf(mail)
    let name = names[ind]
    let bio="";
    for(let i=0;i<161;i++)
    {
      if(NameBioData[i]["Name"] === name)
      {
        bio = NameBioData[i]["Profile_Biography"]
      }
    }
		return bio
	}
    function funct(link){
    return dict[link]

  }
  return (
    <div className='student-id'>
        <div className='photo'>
            <img className='student-image' src={props.source === 'profilesPics' ? require('../Assests/pictures/Profile_images/'+funct(props.pic["Profile_Pic"])) : props.pic["Profile_Pic"]} />
            
        </div>
        <h2 className='student-name'>{props.source === 'profilesPics' ? findName(props.pic["Your_Email_ID"]) : props.pic["Name"]}</h2>
        <h2 className='student-bio'>{props.source === 'profilesPics' ? findBio(props.pic["Your_Email_ID"]) : props.pic["Profile_Biography"]}</h2>
        
    </div>
  );
}
