import React from 'react';
import {useEffect,useState} from 'react';
import './CSS/profile3.css'
import './CSS/profile.css'
import mails from '../data/emails.json'
import names from '../data/name.json'
import responsesData from '../data/responses.json'
import ProfilePics from '../data/profilePics.json'
import { useLocation,Link ,useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {dict} from './imgLinkData'
import { setUserName} from '../actions/index'
import PhotoUploaderMessages from './photoUploaderMessages';
import PhotoPopup from './PhotoPopup';

function Profile(props){
    const dispatch = useDispatch();
    const [responses, setResponses] = useState(responsesData);
    const [juniorresponses, setjuniorResponses] = useState([]);
    const myState = useSelector((state)=>state.setUserNameMail)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);

    const openPopup = (photoId) => {
        setSelectedPhotoId(photoId);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

   // For showing what is active page
    var navTextElements = document.getElementsByClassName('nav-text');
    if (navTextElements.length > 1) {
    var secondNavTextElement = navTextElements[0];

    var aTag = secondNavTextElement.querySelector('a');

    if (aTag) {
        aTag.style.backgroundColor = '#0b1d26';
    }
    }

    //When redirecting through node the redux variables get lost hence we need to put them in the link.
    let {email,uemail,name} = useParams();

    //If myState is null it will take uemail
    const userMail = myState.mail?myState.mail:uemail
    const userName = myState.name?myState.name:name

    //It is to ensure that every time state get updates.
    window.onload = (event) => {
        dispatch(setUserName(name,uemail))
    };

    // console.log(myState.name)
    // console.log(myState.mail)
    
    useEffect(() => {
        fetch("https://studentsiitgn.onrender.com/Yearbook23/responses")
        .then(response => response.json())
        .then(data => setResponses(data));

        fetch("https://studentsiitgn.onrender.com/Yearbook23/junior-responses")
        .then(response => response.json())
        .then(data =>setjuniorResponses(data));
    }, []);
    //name is variable which is set at app page
    //email is being accessed by the url of link
    

    // to take props from link we can use location,prop(mail) is defined for link on the friend messages page's name 
    const location = useLocation()
    const { mail } = location.state?(location.state):''
    const { source } = location.state?(location.state):''
    const { studentName } = location.state?(location.state):''
    // console.log(userMail)
    // console.log(userName)

    //to scroll at top, checks when name is changed, changing name(props) as state was chnaging and not props hence page was not rendering
    useEffect(() => {
        if(responses ===responsesData)
        {
            window.scrollTo(0, 0)
        }
        props.func(email)  
      }, [email,mail,responses])
    //TO ensure all the details are filled in the form
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        const message = document.getElementById('message').value;
        const name = document.getElementById('name').value;
        const mailAddress = document.getElementById('mailAddress').value;
        console.log('valid')
        // Validate form fields
        if (!name|| !mailAddress|| !message) {
          alert('Please fill in all fields.');
          return; // Stop form submission
        }
        const formData = new FormData();
        formData.append('email', mailAddress);
        formData.append('name', name);
        formData.append('message', message);
       };
    //extracting name from email  
    function findName(email){
		let ind = mails.indexOf(email)
		let name = names[ind]
		return name
	}

    function findPic(email)
    {
        let user = 'user'
        for(let i =0;i<ProfilePics.length;i++)
        {
            if(ProfilePics[i].Your_Email_ID === email)
            {
                return ProfilePics[i].Profile_Pic;
            }
        }
        return user
    }
    function findImg(email)
    {
        for(let i =0;i<ProfilePics.length;i++)
        {
            if(ProfilePics[i].Your_Email_ID === email)
            {
                return ProfilePics[i].Profile_Pic;
            }
        }
    }
    function findUrlImg(email)
    {
        for(let i =0;i<responses.length;i++)
        {
            if(responses[i].Your_Email_ID === email)
            {
                return responses[i].Profile_Pic;
            }
        }
    }
    //Dicitonary to store links and corresponding image name
        function funct(link){
            return dict[link]
        }
            
    return(
        <div>
            <div className='student-profile'>
                <div className='profile-box'>
                    <div className='image-name-bio'>
                        <div className='img-box'>
                        {
                        responses.map(response =>{
                            return(
                                <div>
                                {/* In image we are checking from exactly the request is coming, if it is from profilePics then it will be sent by traditional way. We needed it as we are also allowing now responses through profiles in students section */}
                                {response.Your_Email_ID===(props.name||mail||email) && response.Your_Email_ID !=null ?<img className='student-profile-photo' src={source==='profilePics'?require('../Assests/pictures/Profile_images/'+funct(response.Profile_Pic)):response.Profile_Pic} />:null} 
                                </div>
                        )})
                        }
                        <div className='student-name-bio'>
                        {
                            responses.map(response =>{
                                return(
                                    <div>
                                    {/* Iterate through the responses and when the responses is equal to given email then give the output Here we are checking this three types of props/state, 1st is for name defined at app,2nd is defined in this page only at names of friends and 3rd is defined at url of the link */}
                                    {response.Your_Email_ID===(props.name||mail||email) && response.Your_Email_ID !=null ?<p className='student-profile-name'>{response.Name}</p>:null} 
                                    </div>
                            )})
                        }
                        {/* <p className='student-profile-name'>{source==='profilePics'?findName(props.name||mail||email):studentName}</p> */}
                        {
                            responses.map(response =>{
                                return(
                                    <div>
                                    {/* Iterate through the responses and when the responses is equal to given email then give the output Here we are checking this three types of props/state, 1st is for name defined at app,2nd is defined in this page only at names of friends and 3rd is defined at url of the link */}
                                    {response.Your_Email_ID===(props.name||mail||email) && response.Your_Email_ID !=null ?<p className='student-profile-bio'>{response.Profile_Biography}</p>:null} 
                                    </div>
                            )})
                        }
                        </div>
                        </div>
                        
                    </div>
                    <div className='messages-box'>
                        <h2 className='Messages-heading'>Messages</h2>
                        <div className='student-messages'>
                        {
                            responses.map(response =>{
                                return(
                                    <div className='profile-photo-message'>
                                    {   response.FEmail === (props.name || mail || email) && response.Message ? < img className = 'student-profile-photo-circle'
                                        onClick = {
                                            () => openPopup(response.Email)
                                        }
                                        // First check if email is present.If yes then check its image is present in dictionary if yes then give 
                                        // the image present in folder. if it not in dictionary give image by its url and if he/she has not filled the form then give default user image
                                        // and if the email is not present then give the default image prsent in the folder
                                        src = {
                                            response.Email?  
                                                dict.hasOwnProperty(findImg(response.Email))?
                                                    require('../Assests/pictures/Profile_images/'+funct(findPic(response.Email))):
                                                        findUrlImg(response.Email)||require('../Assests/pictures/Profile_images/'+funct(findPic('user'))):
                                                require('../Assests/pictures/Profile_images/'+funct(findPic('user')))
                                        }
                                        />
                                    :''}
                                    {response.FEmail === (props.name || mail || email) && response.Message && isPopupOpen && selectedPhotoId === response.Email ? < PhotoPopup id = {
                                            response.Email
                                        }
                                        photoUrl = {
                                            dict.hasOwnProperty(findImg(response.Email))?
                                                require('../Assests/pictures/Profile_images/' + funct(findPic(response.Email))):
                                                    findUrlImg(response.Email)
                                        }
                                        onClose = {
                                            closePopup
                                        }
                                        />:''}
                                    {response.FEmail === (props.name || mail || email) && response.Message ? (
                                            <p className="student-friend-Message">
                                            <Link
                                                to="/students"
                                                state={{ mail: response.Email || mail, source: "profilePics" }}
                                            >
                                                <em className="friend-profile-name">
                                                {findName(response.Email) || response.Name || response.Email}
                                                </em>
                                            </Link>
                                            <br className="space" />
                                            {response.Message}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                            )})
                        }
                        {/* The value of friend's mai address, user email address and user name are already filled */}
                        {/* myState.name||userName||name using all of them so that there can one of them which is not empty  */}
                        <form action='https://studentsiitgn.onrender.com/Yearbook23/addresponse' method='post' id='message-form' >
                            <input type='text' name='message' id='message' placeholder="Add A Message"></input>
                            <div className={userName || name ? 'input-fields hidden' : 'input-fields'}>
                                    <input type='text' name='name' id='name' placeholder="Your Name" value={myState.name || userName || name} />
                                    <input type='text' name='mailAddress' id='mailAddress' placeholder="Your Email" value={myState.mail || userMail || uemail} />
                             </div>
                            <input type='text' name='email' id='email' style={{visibility:'hidden'}} value={mail||email}></input>
                            <div className='submit-btn'>
                                <button className="buttonn" type="submit">Submit</button>
                            </div>
                        </form>
                        <h2 className='Messages-heading'>Messages from Juniors</h2>
                        {
                            juniorresponses.map(response =>{
                                return(
                                    <div>
                                    {response.FEmail===(props.name||mail||email) ?<p className='student-Message'>{response.Message}<Link to='/students' state={{mail:response.Email||mail}}><em>-{findName(response.Email)||(response.Name)}</em></Link></p>:''}
                                    </div>
                            )})
                        }
                        <form action='https://studentsiitgn.onrender.com/Yearbook23/addjuniorresponse' method='post' id='message-form'>
                            <input type='text' name='message' id='message' placeholder="Add A Message" ></input>
                            <div className={userName || name ? 'input-fields hidden' : 'input-fields'}>
                                    <input type='text' name='name' id='name' placeholder="Your Name" value={myState.name || userName || name} />
                                    <input type='text' name='mailAddress' id='mailAddress' placeholder="Your Email" value={myState.mail || userMail || uemail} />
                             </div>
                            <input type='text' name='email' id='email' style={{visibility:'hidden'}} value={mail||email}></input>
                            <div className='submit-btn'>
                                <button className="buttonn" type="submit">Submit</button>
                            </div>
                        </form>
                        <h2 className='Messages-heading'>Photo Gallery</h2>
                        <div className='photogallery'>
                        {
                            responses.map(response =>{
                                    return(
                                        <div>
                                        {response.FEmail===(props.name||mail||email) && response.Photo != null ?<a href={response.Photo} target='_blank'><img className='side-photos' src={response.Photo}/></a>:''}
                                        </div>
                                )})
                        }   
                        <PhotoUploaderMessages mail={props.name||mail||email}/>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Profile