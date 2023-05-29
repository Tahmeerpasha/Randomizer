'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  // Fact generator states
  const [fact, setFact] = useState("")
  // Age predictor states
  const [name, setName] = useState("")
  const [age, setAge] = useState({})
  // Excuse generator states
  const [excuse, setExcuse] = useState("")
  const [button, setButton] = useState("")
  useEffect(() => {
    handleUpdate()
    handleChange()
    generateExcuse()
  }, [])
  const handleUpdate = () => {
    axios("https://catfact.ninja/fact").
      then(res => setFact(res.data.fact)).catch(console.log("Network error in fetching cat facts"))
  }
  const handleChange = () => {
    axios(`https://api.agify.io/?name=${name}`).
      then(res => setAge(res.data),
      ).catch(console.log("Network error in fetching age"))
  }
  const generateExcuse = () => {
    axios(`https://excuser-three.vercel.app/v1/excuse/${button}`).
      then(res => setExcuse(res.data[0].excuse),
      ).catch(console.log("Network error in fetching excuse"))
  }
  return (
    <>
      <div className="text-center bg-orange-500 p-4">
        <h1 className='text-center p-5 text-2xl font-extrabold animate-bounce'>FACTS ABOUT CATS</h1>
        <h1 className="m-5 p-5 text-center">{fact}</h1>
        <button onClick={handleUpdate} className="m-2 transition ease-out delay-150 hover:translate-y-1  hover:scale-2 hover:bg-indigo-500 bg-blue-500 rounded-2xl translate-x-2  p-3 justify-center content-center">Update</button>
      </div>
      <div className="text-center bg-white-500 p-4">
        <h1 className='text-center m-2 p-5 text-2xl font-extrabold animate-bounce'>Age Predictor</h1>
        <input type="text" placeholder="Enter a name to predict age" className="w-auto p-2" onChange={e => { setName(e.target.value) }} />
        <button onClick={handleChange} className="m-2 transition ease-out delay-150 hover:translate-y-1  hover:scale-2 hover:bg-indigo-500 bg-blue-500 rounded-2xl translate-x-2  p-3 justify-center content-center">Predict</button>
        {age.age != null ?
          <h1 className="m-5 p-5 text-center text-3xl">The predicted age of {age.name} : {age.age}</h1>
          : <h1 className="m-5 p-5 text-center text-3xl">The entered name is not a valid name</h1>}
      </div >
      <div className="text-center bg-green-500 p-4">
        <h1 className='text-center p-5 text-2xl font-extrabold animate-bounce'>Excuse Generator</h1>
        <button onClick={() => { generateExcuse(), setButton('party') }} className="m-2 transition ease-out delay-150 hover:translate-y-1  hover:scale-2 hover:bg-indigo-500 bg-blue-500 rounded-2xl translate-x-2  p-3 justify-center content-center">Generate party Excuse</button>
        <button onClick={() => { generateExcuse(), setButton('family') }} className="m-2 transition ease-out delay-150 hover:translate-y-1  hover:scale-2 hover:bg-indigo-500 bg-blue-500 rounded-2xl translate-x-2  p-3 justify-center content-center">Generate family Excuse</button>
        <button onClick={() => { generateExcuse(), setButton('office') }} className="m-2 transition ease-out delay-150 hover:translate-y-1  hover:scale-2 hover:bg-indigo-500 bg-blue-500 rounded-2xl translate-x-2  p-3 justify-center content-center">Generate office Excuse</button>
        {button !== "" ?
          <h1 className="m-5 p-5 text-center text-3xl">The Excuse for {button} : {excuse}</h1>
          : <h1 className="m-5 p-5 text-center text-3xl">No excuse for now</h1>
        }      </div>
    </>
  )
}
