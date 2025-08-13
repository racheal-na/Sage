import { useEffect,useRef,useState } from "react";
function Card(){
    const[counter,setCounter]=useState(0)
    const previousCounter = useRef(0)
    useEffect(function (){
        console.log("from card")
        
    })
    return(
        <div style={{width:"150px",boxShadow:"3px 3px 4px 4px red",display: "inline-block",padding:"5px", justifySelf:"center"}}>
            <div style={{widt: "100%",height: "80px",backgroundColor:"gray"}}></div>
            <h1 style={{margin: "5px 5px"}}>useState{counter}</h1>
             <h1 style={{margin: "5px 5px"}}>useRef{previousCounter.current}</h1>
             <button onClick={()=>{
                previousCounter.current= counter
                setCounter(counter+1)
                console.log("previousCounter:",previousCounter.current)
                console.log("counter",counter)
             }}>add</button>
             <p style={{margin: "5px 5px"}}>this is rendering hooks law this is rendering hooks law</p>
        </div>
    );
} 
export default Card;