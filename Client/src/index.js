import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./components/home"
import Students from './components/students'
import Professor from './components/professor';
import Team from './components/team';
import Memorylane from './components/memorylane'
import store from './store';
import JuniorMessages from './components/juniorMessages';
import Confessions from './components/confessions';
import PhotoUploader from './components/photoUploader';
import PhotoGallery from './components/photoGallery';
import { Provider } from 'react-redux';
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/:anything" element={<Students />}/>
        <Route path="/AllStudents" element={<Students />}/>
        <Route path="/students" element={<Home />} />
        <Route path="/students/:email" element={<Home />} />
        <Route path="/students/:email/:uemail/:name" element={<Home />} />
        <Route path="/juniorMessages" element={<JuniorMessages />}/>
        <Route path="/Confessions" element={<Confessions />}/>
        <Route path="/Memorylane" element={<PhotoGallery />}/>
        <Route path="/photouploader" element={<PhotoUploader />}/>
        <Route path="/professor" element={<Professor />} />
        <Route path="/team" element={<Team />} />
        <Route path="/memorylane" element={<Memorylane />} />
      </Routes>
    </HashRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
