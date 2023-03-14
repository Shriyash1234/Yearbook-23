import React, { useState,useEffect } from "react"
import "./App.css"
import Sidebar from './components/sidebar'
import Header from './components/header'
import Profile2 from './components/profile2'

function App() {
	const [ name, setName ] = useState("")
	function SetTheName(childData){
		setName(childData);
	}
	return (
		<div className="App">
		<Header func={SetTheName}/>
		<Sidebar mail={name}/>
		<Profile2 name={name} func={SetTheName}/>
		</div>
	)
}

export default App