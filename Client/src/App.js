import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Profile from "./components/profile";

function App() {
  const [name, setName] = useState("");
  function SetTheName(childData) {
    setName(childData);
  }
  return (
    <div className="App">
      <Header func={SetTheName} />
      <Sidebar mail={name} />
      <Profile name={name} func={SetTheName} />
    </div>
  );
}

export default App;
