import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserName} from '../actions/index';
function Login(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [Gmail,SetGmail] = useState();
    const [Gname,SetGname] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dat = { id: 123, name: 'John' };
    return(
        <div>
            <LoginSocialGoogle
                client_id={"413814460306-rmb30pb16r8eo3gemo0r5lnplbemqnu5.apps.googleusercontent.com"}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    setIsAuthenticated(true);
                    SetGmail(data.email)
                    SetGname(data.family_name + data.given_name)
                    // Setting the value of variables in redux 
                    dispatch(setUserName(data.family_name +" "+ data.given_name,data.email))
                    navigate('/AllStudents',{state:{userMail: data.email,userName:data.family_name +" "+ data.given_name}})
                }}
                onReject={(err) => {
                console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
        </div>
    );
}
export default Login