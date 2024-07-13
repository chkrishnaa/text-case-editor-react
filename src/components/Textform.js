import React from "react";
import { useState } from "react";

export default function Textform(props) {
  const myStyle = {
    width: "140px",
  };

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let inputText;

  const countFunction = (inputText) => {
    let wordCount, minutes, seconds;
    if (inputText.trim() === "") {
      wordCount = 0;
    } else {
      wordCount = inputText.trim().split(/\s+/).length;
    }
    minutes = wordCount * 0.008;
    seconds = minutes * 60;

    setWordCount(wordCount);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  const upperCase = () => {
    setText(text.toUpperCase());
    props.showAlert("Text converted to Upper Case successfully.", "success");
  };
  const lowerCase = () => {
    setText(text.toLowerCase());
    props.showAlert("Text converted to Lower Case successfully.", "success");
  };
  const dashedText = () => {
    setText(text.replaceAll(" ", "-"));
    setWordCount(1);
    setMinutes(0.008);
    setSeconds(0.48);
    props.showAlert(
      "Text having spaces are replaced with dashes(-) successfully.",
      "success"
    );
  };
  const titleCase = () => {
    inputText = text
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    setText(inputText);
    props.showAlert("Text converted to Title Case successfully.", "success");
  };
  const inverseCase = () => {
    inputText = text
      .toUpperCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toLowerCase() + word.slice(1);
      })
      .join(" ");
    setText(inputText);
    props.showAlert("Text converted to Inverse Case successfully.", "success");
  };
  const alternateCaseCapital = () => {
    inputText = "";
    for (let i = 0; i < text.length; i++) {
      if (i % 2 === 0) inputText += text[i].toUpperCase();
      else inputText += text[i].toLowerCase();
    }
    setText(inputText);
    props.showAlert(
      "Text converted to Alternate Case having Capital letter at a beginning.",
      "success"
    );
  };
  const alternateCaseSmall = () => {
    inputText = "";
    for (let i = 0; i < text.length; i++) {
      if (i % 2 !== 0) inputText += text[i].toUpperCase();
      else inputText += text[i].toLowerCase();
    }
    setText(inputText);
    props.showAlert(
      "Text converted to Alternate Case having Small letter at a beginning.",
      "success"
    );
  };

  const copyText = () => {
    inputText = document.getElementById("myBox");
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = inputText.value;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
      document.execCommand("copy");
      props.showAlert("Text copied to Clipboard successfully.", "success");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      props.showAlert("Failed to copy text.", "error");
    }
    document.body.removeChild(tempTextarea);
  };
  const clearText = () => {
    setText("");
    setWordCount(0);
    setMinutes(0);
    setSeconds(0);
    props.showAlert("Text cleared successfully.", "success");
  };

  const removeExtraSpaces = () => {
    inputText = text.split(/[ ]+/);
    setText(inputText.join(" "));
    props.showAlert(
      "Text having extra spaces are removed successfully.",
      "success"
    );
  };
  const handleForChange = (e) => {
    inputText = e.target.value;
    setText(inputText);
    countFunction(inputText);
  };
  return (
    <>
      <div className={`my-3 px-3 py-3 ${props.mode}`}>
        <h1>{props.heading}</h1>
        <div className="mb-3 my-3">
          <textarea
            className={`form-control size my-3`}
            id="myBox"
            rows="10"
            value={text}
            onChange={handleForChange}
          ></textarea>

          <div
            className={`d-flex flex-wrap justify-content-around border border-${
              props.mode === "light" ? "secondary" : "light"
            } rounded p-2`}
          >
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={upperCase}
            >
              Upper Case
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={lowerCase}
            >
              Lower Case
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={dashedText}
            >
              Dashed Text
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={titleCase}
            >
              Title Case
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={inverseCase}
            >
              Inverse Case
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={alternateCaseCapital}
            >
              Alternate Case(Capital)
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={alternateCaseSmall}
            >
              Alternate Case(Small)
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={copyText}
              id="Copy"
              value={text}
            >
              Copy Text
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={clearText}
            >
              Clear Text
            </button>
            <button
              disabled={text.length === 0}
              className="btn btn-primary my-1 mx-1"
              style={myStyle}
              onClick={removeExtraSpaces}
            >
              Remove Extra Spaces
            </button>
          </div>
        </div>
      </div>
      <div className={`my-3 px-3 py-3 ${props.mode}`} id="accordionExample">
        <h2>Your text summary :-</h2>
        <p>
          Their are {wordCount} words and {text.length} characters in the text.
        </p>
        <p>
          Time to read : {minutes} Minutes or {seconds} Seconds.
        </p>
      </div>
      <div className={`my-3 px-3 py-3 ${props.mode}`} id="accordionExample">
        <h2>Preview :-</h2>
        <p>{text.length > 0 ? text : "Nothing to Preview."}</p>
      </div>
    </>
  );
}
