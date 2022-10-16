import React, { useState } from "react";

export default function Textbox(props) {

  const [text, settext] = useState("");

  const touppercase = () => {
    let dummy = text.toUpperCase();
    settext(dummy);
    props.showalert('success','text converted to upper case');
    };

  const tolowercase = () => {
    let dummy = text.toLowerCase();
    settext(dummy);
    props.showalert('success','text converted to lower case');
  };

  const cleartext = () => {
    settext("");
    props.showalert('success','text is cleared');
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    props.showalert('success','text copied to clipboard');
  };

  const removespaces = () => {
    let dummy = text.split(/[ ]+/);
    settext(dummy.join(" "));
    props.showalert('success','extra spaces has been removed');
  };

  const onchange = (event) => {
    settext(event.target.value);
  };
  let mystyle={
    backgroundColor:props.mode==="dark"?'rgb(175 147 147)':"blue",
    border:"2px solid",
  };
  return (
    <>
      <div className="container" style={{ width: "60%",color:props.mode==="dark"?"white":"black"}}>
        <div class="mb-3">
          <h1>{props.title}</h1>
          <textarea
            onChange={onchange}
            class="form-control"
            value={text}
            id="exampleFormControlTextarea1"
            rows="8"
            style={{backgroundColor:props.mode==="dark"?"rgb(175 147 147)":"white",
          color:props.mode==="dark"?"white":"black"
          }}
          ></textarea>
        </div>
        <button
          type="button"
          class="btn btn-primary mx-2 my-1"
          onClick={touppercase}
          style={mystyle}
        >
          uppercase
        </button>
        <button
          type="button"
          class="btn btn-primary mx-2 my-1"
          onClick={tolowercase}
          style={mystyle}
        >
          lowercase
        </button>
        <button
          type="button"
          class="btn btn-primary mx-2 my-1"
          onClick={cleartext}
          style={mystyle}
        >
          clear text
        </button>
        <button type="button" class="btn btn-primary mx-2 my-1" onClick={copy} style={mystyle}>
          copy text
        </button>
        <button
          type="button"
          class="btn btn-primary mx-2 my-1"
          onClick={removespaces}
          style={mystyle}
        >
          remove extra spaces
        </button>
        <h2>Your text summary</h2>
      <p>{text.split(/\s+/).filter((element)=>{ return element.length!==0}).length} words and {text.length} characters</p>
      <p>{text.split(/\s+/).filter((element)=>{ return element.length!==0}).length * 0.08} minutes to read</p>

      <h2>Preview Text</h2>
      {text}
      </div>
    </>
  );
}
