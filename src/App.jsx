import { useEffect } from "react";
import { useCallback } from "react";
import { useState , useRef} from "react"

function App() {
  const [length, setLength] = useState('8');
  const [password, setPassword] = useState('');
  const [allowNum, setAllowNum] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass ='';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(allowChar) str+= '~!@#$%^&*(){}'
    if(allowNum)  str+= '0123456789'

    for(var i=1; i<= length;i++){
      let char = Math.floor(Math.random() * str.length)

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, password, allowChar, allowNum]);
 
  const copyPasswordToClip =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,9);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length,allowChar,allowNum.passwordGenerator])
  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        
        <div className="bg-gray-400 w-[50vw] p-3">
        <h1 className="text-3xl text-white  text-center">Password Generator </h1>
          <div className="flex flex-wrap justify-center item-center gap-x-1">
            <input className="w-[400px] rounded m-2" type="text" value={password} readOnly ref={passwordRef}/>
            <button onClick={copyPasswordToClip} className="bg-blue-400 px-2 py-1 rounded m-2 shrink-0">Copy</button>
          </div>
          <div className="flex flex-wrap justify-center item-center gap-2">
            <input onChange={(e)=>{setLength(e.target.value)}} min={6} max={100} className='pointer-cursor bg-blue-400' type="range"  value={length}/>
            <label >length : {length}</label>
            <input type="checkbox" defaultChecked={allowChar} id="numberInput" onChange={()=>{setAllowChar((prev)=> !prev)}}  />
            <label htmlFor="">Character</label>
            <input type="checkbox" defaultChecked={allowNum} id="numberInput" onChange={()=>{setAllowNum((prev)=> !prev)}}  />
            <label htmlFor="">Number</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
