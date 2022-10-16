import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar'
import Textbox from './components/Textbox'
import About from './components/About'
import Alert from './components/Alert'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null)

  const showalert= (type,msg) => {
    setalert({
      type:type,
      msg:msg
    });
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }
  const changemode = () => {
    if(mode==="light")
    {
      setmode("dark");
      document.body.style.backgroundColor="#625151";
      showalert('success','dark mode has been enabled');
    }
    else{
      setmode("light");
      document.body.style.backgroundColor="white";
      showalert('success','light mode has been enabled');

    }
  }
  return (
    <>
    <Router>
     <Navbar title="Textutils" changemode={changemode} mode={mode}/>
     <Alert alert={alert}/>
     <Routes>
          <Route exact path="/" element={<Textbox showalert={showalert} title="Enter text to Analyze" mode={mode}/>}/>
          <Route path="/about" element={<About mode={mode}/>}/>
          </Routes>
        </Router>
    </>
  );
}

export default App;
