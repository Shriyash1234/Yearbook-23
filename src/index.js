import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar'
import Main from './main'
import Profile from './components/profile'
import Students from './components/students'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/Yearbook-23/students" component={Home} element={<Home />} />
        <Route path="/Yearbook-23" component={Students} element={<Students />}/>
          {/* <Route index component={Students} element={<Students />} /> */}
          <Route path="/main" component={Main} element={<Main />} />
          <Route path="/profile" component={Profile} element={<Profile />} />
          <Route path="/sidebar" component={Sidebar} element={<Sidebar />} />
          
  
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
