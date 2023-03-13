import axios from "axios"
import React, { useState,useEffect } from "react"
import {Stack,Autocomplete,TextField} from '@mui/material'
import "./CSS/header.css"
import responses from '../data/responses.json'
import mails from '../data/emails.json'
import names from '../data/name.json'
import Sidebar from './sidebar'
// const mails=["akanksham@iitgn.ac.in","gokul.raman@iitgn.ac.in","payal.v@iitgn.ac.in "]

function Header(props) {
    const [ name, setName ] = useState("")
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
                renderInput={(params) => <TextField {...params} label='Search by name'/>}
                groupBy={(name) => name[0]}
                value={name||null}
                onChange={(event, newValue) => props.func(findMail(newValue))}
                getOptionLabel={(newValue) => newValue}/>
            </Stack>    
        </div>
	)
}

export default Header