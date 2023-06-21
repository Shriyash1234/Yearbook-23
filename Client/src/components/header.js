import axios from "axios"
import React, { useState,useEffect } from "react"
import {Stack,Autocomplete,TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import "./CSS/header.css"
import mails from '../data/emails.json'
import names from '../data/name.json'
import IntialNames from '../data/names.json'
import{ useNavigate} from 'react-router-dom';
import { EmailNamesData } from "./EmailNamesdata";

function Header(props) {
    const [ name, setName ] = useState("")
	let navigate = useNavigate();
	function findMail(name){
		// let ind = names.indexOf(name)
		// let mail = mails[ind]
		// return mail
		for (let key in EmailNamesData) {
			if (EmailNamesData.hasOwnProperty(key) && EmailNamesData[key] === name) {
			  return key;
			}
		  }
		  return null;
	}
	function findSource(name){
		if(IntialNames.includes(name)) return 'profilePics'
		else return 'profiles'
	}
	function findName(mail){
		// let ind = names.indexOf(mail)
		// let name = mails[ind]
		// return name
		return EmailNamesData[mail]
	}
	const style = {
		"& label.Mui-focused": {
		  color: "white"
		},
		"& .MuiOutlinedInput-root": {
		  "&.Mui-focused fieldset": {
			borderColor: "white"
		  }
		},
		 input: { color: 'white' } 
	  }
	return (
        <div className="header">
            <Stack spacing={5} width='250px'>
            <Autocomplete
                options={names.sort((a, b) => -b[0].localeCompare(a[0]))}
				// options={names.map((name) => ({ label: name, value: name }))}
                renderInput={(params) => <TextField {...params} sx={style} label='Search by Name' />}
                groupBy={(name) => name[0]}
                value={name||null}
                // onChange={(event, option) => props.func(findMail(option))} 
                getOptionLabel={(option) => option}
				onChange={(event, option) => {
				    // props.pushState({mail:findMail(option)}, '', '/Yearbook23/students/')
					props.func(findMail(option));
					// window.location.href = '/Yearbook23/students/'+findMail(option);
					navigate('/students',{state:{mail: findMail(option),source:findSource(option)}})
				}}
	
				/>
            </Stack>    
        </div>
	)
}

export default Header