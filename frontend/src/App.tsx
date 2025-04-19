import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  
  const increment = () => {
    setCount((prevCount) =>  prevCount +1 )
  }


  const decrement = () => {
    setCount((prevCount) =>  prevCount -1  )
  }


  return (
    <>

<button onClick={decrement}>- </button>
    <h1 className="text-3xl font-bold underline">{count}</h1>
     <button onClick={increment}> + </button>


    </>
  )
}

export default App
