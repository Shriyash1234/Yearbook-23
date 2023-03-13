import React from 'react';
import './index.css';
import Home from './App';
import reportWebVitals from './reportWebVitals';
import Sidebar from './components/sidebar'
import Header from './components/header'

 
function Main(){
    return(
        <div>
            <Sidebar/>
            <Home/>
        </div>
    )
}
export default Main