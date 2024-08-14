import { useRef } from "react"
const Reference=()=>{
    let demoRef=useRef()
    let changeColor=()=>
    {
        demoRef.current.style.backgroundColor="red"
    }
    return(
        <div>
            <h1 ref={demoRef}>Reference</h1>
            <button onClick={changeColor}> click</button>
        </div>
    )
}
export default Reference