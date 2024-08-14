import { useState, useCallback, useEffect } from "react";
import './App.css'

function App() {
  const [length, setLength] = useState();
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}:<>?";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }
  , [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(()=> {
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="fixed flex flex-wrap justify-center top-1/3 inset-x-2 mx-2 ">
      <div className=" w-fit shadow-lg mx-auto rounded-lg px-3 py-4 bg-gray-700">
        <h1 className="text-white text-center my-3 text-2xl ">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
          onClick={copyPassword}
          className="outline-none bg-blue-700 text-white uppercase px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center text-orange-400 gap-x-1">
            <input
              type="range"
              max={100}
              min={5}
              value={length}
              className=" cursor-pointer"
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
            <label className="text-xl">Length : {length}</label>
            <div className="flex items-center mx-6 gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className="text-xl" htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className="text-xl" htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
