import { useRef } from "react"

const Uncontroiled=()=>{
    let intput1=useRef()
    let formhandle=(e)=>{
        e.preventDefault()
        console.log(intput1.current.value);
        
    }
    return(
        <div>
            <form action="">
                <label htmlFor="">Name</label>
                <input type="text" ref={intput1} />
                <button onClick={formhandle}>Submit</button>
            </form>
        </div>
    )

}
export default Uncontroiled