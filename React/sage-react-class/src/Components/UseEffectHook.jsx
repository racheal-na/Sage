import { useEffect,useState } from "react";

function UseEffectHook(){
    const [counter,setCounter] =useState(0);
    useEffect(()=>{
        if(counter<8)
        console.log("useEffect");
        setTimeout(()=>setCounter(counter+1),1000)
    },[counter])
    return(
        <>
        <p>useEffectHook</p>
        <p style={{fontSize: "40px",padding:"10px",color:"blue"}}>{counter}</p>
        </>
    );
}

export default UseEffectHook;