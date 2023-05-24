import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        <Route index path="/yearbook/2023" element={<Main />} />
        <Route path="/yearbook/2023/AllStudents" element={<Students />}/>
        <Route path="/yearbook/2023/students" element={<Home />} />
        <Route path="/yearbook/2023/students/:email" element={<Home />} />
        <Route path="/yearbook/2023/students/:email/:uemail/:name" element={<Home />} />
        <Route path="/yearbook/2023/juniorMessages" element={<JuniorMessages />}/>
        <Route path="/yearbook/2023/Confessions" element={<Confessions />}/>
        <Route path="/yearbook/2023/Memorylane" element={<PhotoGallery />}/>
        <Route path="/yearbook/2023/photouploader" element={<PhotoUploader />}/>
        <Route path="/yearbook/2023/professor" element={<Professor />} />
        <Route path="/yearbook/2023/team" element={<Team />} />
        <Route path="/yearbook/2023/memorylane" element={<Memorylane />} />
      </Routes>
    </BrowserRouter>
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
