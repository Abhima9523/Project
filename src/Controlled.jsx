import { useState } from "react"

const Controlled=()=>{
    let [name,setName]=useState('abc')
    let getName=(e)=>{
        setName(e.target.value)
    }
    let formHandle=(e)=>{
        e.preventDefault()
        let nameData=name.target.value

        console.log(name);
    }

    return(
        <div>
            <form action="">
           <input type="text" value={name} onChange={getName} />
               <button onClick={formHandle}>Submit</button>
            </form>
        </div>
    )
}
export default Controlled