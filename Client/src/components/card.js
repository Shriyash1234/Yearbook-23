import React,{useEffect} from "react"
import mails from '../data/emails.json'
import names from '../data/name.json'
import './CSS/card.css'
import {dict} from './imgLinkData'
import NameBioData from '../data/NameBioData'
import { EmailNamesData } from "./EmailNamesdata"

export default function ActionAreaCard(props) {
  function specialProfile(){
    var profiles = document.getElementsByClassName("student-id"); 
    for (var i = 0; i < profiles.length; i++) {
      var profile = profiles[i];
      var heading = profile.getElementsByClassName("student-name")[0];

      // Check the content of the heading
      var content = heading.innerText;
      // Add a CSS class based on the content
      var sepcialProfiles = [ "Gaurav Sharma","Chetan Kishore","Deepak Patel","Abhishek Janagal","Akash Kumar","Mohit Kumar","Shubh Lavti","Akhilesh Chauhan","Manvendra Singh Songara","Ajay Karwasara"]
      if(sepcialProfiles.includes(content)){
        profile.classList.add("profile-color-1");
        var leaf = profile.getElementsByClassName("leaf")[0];
        leaf.classList.add("isVisible");
      }
    }
  }

  useEffect(()=>{
    specialProfile();
  },[])
  function findName(mail){
		// let ind = mails.indexOf(mail)
		// let name = names[ind]
		// return name
    return EmailNamesData[mail];
	}
  function findBio(mail){
		// let ind = mails.indexOf(mail)
    let name = EmailNamesData[mail];
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
        <img className='leaf' src={require('../Assests/pictures/Cannabis_leaf.png')}></img>
    </div>
  );
}
