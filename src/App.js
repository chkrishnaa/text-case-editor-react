import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import Manual from "./components/Manual";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [btnText, setBtnText] = useState("Enable Dark Mode");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setBtnText("Enable Light Mode");
      document.body.style.backgroundColor = "rgba(33, 37, 41, 0.9)";
      document.getElementById("myBox").style.backgroundColor =
        "rgba(33, 37, 41, 0.8)";
      document.getElementById("myBox").style.color = "rgb(248, 249, 250)";
      showAlert("Dark mode has been enabled.", "success");
    } else {
      setMode("light");
      setBtnText("Enable Dark Mode");
      document.body.style.backgroundColor = "white";
      document.getElementById("myBox").style.backgroundColor =
        "rgb(248, 249, 250)";
      document.getElementById("myBox").style.color = "rgb(33, 37, 41)";
      showAlert("Light mode has been enabled.", "success");
    }
  };

  return (
    <Router>
      <Navbar
        Title="Text Case Editor"
        mode={mode}
        toggleMode={toggleMode}
        btnText={btnText}
      />
      <Alert alert={alert} />
      <Routes>
        {/* <div className="my-3 mx-3"> */}
        <Route path="/about" element={<About mode={mode} />}></Route>
        <Route
          path="/textform"
          element={
            <Textform
              showAlert={showAlert}
              mode={mode}
              heading="Analyse your Text here :"
            />
          }
        ></Route>
        <Route path="/manual" element={<Manual mode={mode} />}></Route>
        {/* </div> */}
      </Routes>
    </Router>
  );
}

export default App;
