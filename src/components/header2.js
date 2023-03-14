import axios from "axios"
import React, { useState,useEffect } from "react"
import {Stack,Autocomplete,TextField} from '@mui/material'
import "./CSS/header.css"
import responses from '../data/responses.json'
import mails from '../data/emails.json'
import names from '../data/name.json'
import Redirect, { Navigate,useNavigate} from 'react-router-dom';
// import { BrowserRouter as Router, Switch, 
//     Route, Redirect} from "react-router-dom";
import { Link } from 'react-router-dom';
import Sidebar from './sidebar'
// const mails=["akanksham@iitgn.ac.in","gokul.raman@iitgn.ac.in","payal.v@iitgn.ac.in "]

function Header(props) {
    const [ name, setName ] = useState("")
	let navigate = useNavigate();
	const location = {
		pathname: '/somewhere',
		state: { fromDashboard: true }
	  }
	useEffect(() => {
		axios.get("http://localhost:4000/home").then(function(response) {
	    setName(response.data)
		})
	}, [])

	async function postName(e) {
		e.preventDefault()
		try {
			await axios.post("http://localhost:4000/post_name", {
				name
			})
		} catch (error) {
			console.error(error)
		}
	}
	function findMail(name){
		let ind = names.indexOf(name)
		let mail = mails[ind]
		return mail
	}
	function findName(mail){
		let ind = names.indexOf(mail)
		let name = mails[ind]
		return name
	}
	return (
        <div className="header">
            <Stack spacing={5} width='250px'>
            <Autocomplete
                options={names.sort((a, b) => -b[0].localeCompare(a[0]))}
				// options={names.map((name) => ({ label: name, value: name }))}
                renderInput={(params) => <TextField {...params} label='Search by name'/>}
                groupBy={(name) => name[0]}
                value={name||null}
                // onChange={(event, option) => props.func(findMail(option))} 
                getOptionLabel={(option) => option}
				onChange={(event, option) => {
					
					
					// props.pushState({mail:findMail(option)}, '', '/Yearbook-23/students/')
                    props.func(findMail(option));
					window.location.href = '/Yearbook-23/students/:email';
					
					// <Redirect to='/Yearbook-23/students' state={{mail: findMail(option)}}
					// Navigate('/Yearbook-23/students')
				}}
				// renderOption={(option)=>{
				// 	<React.Fragment>
				// 		<span
				// 		style={{ cursor: "pointer" }}
				// 		onClick={() => {
				// 			window.location.href = '/Yearbook-23/students';
				// 		}}
				// 		>
				// 		</span>
				// 	</React.Fragment>
				// }}
				// getOptionLabel={(newValue) => (
				// 	<Link to='/Yearbook-23/students' state={{mail: findMail(newValue)}}>
				// 	   {newValue}
				// 	</Link>
				// )}
				/>
            </Stack>    
        </div>
	)
}

export default Header