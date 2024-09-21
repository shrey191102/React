import { useState,useCallback ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [allownum, setallownum] = useState(false)
  const [allowchar, setallowchar] = useState(false)
  const [password, setpassword] = useState("")

  const passwordref=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(allownum) str+="1234567890"
    if(allowchar) str+="!@#$%^&*"
    for (let i = 1; i <= length; i++){
      let char =Math.floor(Math.random() * str.length +1)
      pass +=str.charAt(char)
    }
    setpassword(pass)
  },[length,allowchar,allownum,setpassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,allowchar,allownum])

  const copyPassword=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-600 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordref}
        />
         <button
         onClick={copyPassword}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100} 
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'><input 
        type="checkbox"
        defaultChecked={allownum}
        id="numberInput"
        onChange={()=>{
          setallownum((prev)=> !prev); 
        }}
         />
         <label htmlFor="numberInput">Numbers</label>
         </div>
         <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={allowchar}
              id="characterInput"
              onChange={() => {
                  setallowchar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
        </div>
  )
}

export default App
