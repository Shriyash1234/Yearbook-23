import React, { useState,useEffect } from "react"
import {Stack,Autocomplete,TextField} from '@mui/material';
import mails from './data/mails.json'
import responses from './data/responses.json'
import axios from "axios"

export default function App() {
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
  const options = mails.map((option) => {
    const firstLetter = option.mail[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <div>
        <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        // getOptionLabel={(option) => option.mail}
        value={name||null} 
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="With categories" />}
        onChange={(event, newValue) => setName(newValue)}
        />
        <h1>{name}</h1>
        {
        responses.map(response =>{
          return(
            <div className='mail'>
			  {response.Your_Email_ID===name?<h1>{response.Profile_Biography}</h1>:''}
              {response.FEmail===name?<div>{response.Message}<h2>{response.Email}</h2></div>:''}
              
            </div>
          )
        })
      }
    </div>
    
    
  );
}

